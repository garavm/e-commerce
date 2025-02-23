const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validCategories = ["Admin", "user", "Seller"];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingModel",
    },
  ],
  token: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  role: {
    type: String,
    default: "user",
    enum: validCategories, // Ensures only allowed roles
  },
});

// ✅ Pre-save Hook: Hash Password + Validate Role
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password !== this.confirmPassword) {
    return next(new Error("Password and confirmPassword do not match"));
  }

  this.set("confirmPassword", undefined); // Remove confirmPassword
  this.password = await bcrypt.hash(this.password, 10);

  // Role validation
  if (this.role && !validCategories.includes(this.role)) {
    return next(new Error("Invalid role"));
  }

  next();
});

const UserModel = mongoose.model("userModel", userSchema);
module.exports = UserModel;
