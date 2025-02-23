const express = require("express");
const mongoose = require("mongoose");
const BookingRouter = express.Router();
const { protectRouteMiddleWare } = require("../controller/AuthController");
const {
  initialBookingController,
  verifyPaymentController,
  getAllBookings,
} = require("../controller/BookingController");

// ✅ Razorpay webhook verification (without authentication)
BookingRouter.post(
  "/verify",
  express.raw({ type: "application/json" }),
  verifyPaymentController
);


// ✅ Protect all booking routes except Razorpay webhook verification
BookingRouter.use(protectRouteMiddleWare);

// ✅ Validate `productId` before reaching the controller
BookingRouter.post(
  "/:productId",
  (req, res, next) => {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    next();
  },
  initialBookingController
);

// ✅ Get all bookings (Protected route)
BookingRouter.get("/", getAllBookings);

module.exports = BookingRouter;
