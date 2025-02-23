const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookedAt: {
    type: Date,
    default: Date.now
  },
  priceAtThatTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "failed", "success"],
    default: "pending",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "newProductModel",
  },
  payment_order_id: {
    type: String,
    default: null,
  },
});

// ✅ Adding Index for Faster Queries
bookingSchema.index({ user: 1, product: 1 });

const BookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = BookingModel;
