const mongoose = require("mongoose");
const crypto = require("crypto");
const BookingModel = require("../model/BookingModel");

const Razorpay = require("razorpay");
const UserModel = require("../model/UserModel");
const { PUBLIC_KEY, PRIVATE_KEY } = process.env;
const razorpayInstance = new Razorpay({
  key_id: PUBLIC_KEY,
  key_secret: PRIVATE_KEY,
});

const initialBookingController = async (req, res) => {
  const userId = req.userId;
  const { priceAtThatTime } = req.body;
  const { productId } = req.params;
  const status = "pending";

  // ✅ Validate productId before using it
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid product ID format",
    });
  }

  // ✅ Ensure `priceAtThatTime` is provided and valid
  if (!priceAtThatTime || isNaN(priceAtThatTime)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid or missing priceAtThatTime",
    });
  }

  try {
    /************** Create a booking document ************/
    const bookingObject = await BookingModel.create({
      user: userId,
      product: new mongoose.Types.ObjectId(productId), // ✅ Convert to ObjectId
      priceAtThatTime,
      status,
    });

    // ✅ Find user and add booking to their record
    const userObject = await UserModel.findById(userId);
    if (!userObject) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }

    userObject.bookings.push(bookingObject._id);
    await userObject.save();

    /**************** Initiating the payment *************/
    const amount = bookingObject.priceAtThatTime;
    const currency = "INR";
    const options = {
      amount: amount * 100, // ✅ Ensure correct amount format (convert to paise)
      currency,
      receipt: bookingObject._id.toString(),
      payment_capture: 1, // Auto-capture
    };

    // ✅ Secure Razorpay order creation with error handling
    let orderObject;
    try {
      orderObject = await razorpayInstance.orders.create(options);
    } catch (razorpayError) {
      return res.status(500).json({
        status: "failure",
        message: "Failed to create Razorpay order",
        error: razorpayError.message,
      });
    }

    // ✅ Store payment order ID in booking
    bookingObject.payment_order_id = orderObject.id;
    await bookingObject.save();

    // ✅ Send order details to frontend
    res.status(200).json({
      status: "success",
      message: {
        id: orderObject.id,
        currency: orderObject.currency,
        amount: orderObject.amount,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await BookingModel.find()
      .populate({ path: "user", select: "name email" })
      .populate({ path: "product", select: "name  brand productImages" });
    res.status(200).json({
      status: "success",
      message: allBookings,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

const verifyPaymentController = async function (req, res) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      return res.status(500).json({ message: "Webhook secret is missing" });
    }

    // ✅ Ensure `req.body` exists before using it
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Invalid webhook payload" });
    }

    // ✅ Generate SHA256 HMAC Signature
    const shasum = crypto.createHmac("sha256", WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body)); // ✅ Ensured `req.body` is not undefined
    const freshSignature = shasum.digest("hex");

    // ✅ Check if Razorpay signature exists
    const razorPaySign = req.headers["x-razorpay-signature"];
    if (!razorPaySign) {
      return res.status(400).json({ message: "Missing Razorpay signature" });
    }

    // ✅ Secure comparison of signatures
    if (
      !crypto.timingSafeEqual(
        Buffer.from(freshSignature),
        Buffer.from(razorPaySign)
      )
    ) {
      return res
        .status(403)
        .json({ message: "Invalid signature, possible tampering" });
    }

    // ✅ Extract Order ID from Webhook Payload
    const orderId = req.body.razorpay_payment_id;
    if (!orderId) {
      return res
        .status(400)
        .json({ message: "Order ID not found in webhook payload" });
    }

    // ✅ Find Booking and Update Payment Status
    const bookingObject = await BookingModel.findOne({
      payment_order_id: orderId,
    });
    if (!bookingObject) {
      return res
        .status(404)
        .json({ message: "Booking not found for this order ID" });
    }

    bookingObject.status = "success";
    bookingObject.set("payment_order_id", undefined);
    await bookingObject.save();

    return res
      .status(200)
      .json({ message: "Payment verified and booking updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports = { verifyPaymentController };


module.exports = {
  initialBookingController,
  getAllBookings,
  verifyPaymentController,
};
