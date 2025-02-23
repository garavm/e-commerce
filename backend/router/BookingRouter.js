const express = require("express");
const BookingRouter = express.Router();
const { protectRouteMiddleWare } = require("../controller/AuthController");
const { initialBookingController, verifyPaymentController, getAllBookings } = require("../controller/BookingController");


BookingRouter.use(protectRouteMiddleWare);

BookingRouter.post("/:productId",
    initialBookingController)
BookingRouter.post("/verify", verifyPaymentController)
BookingRouter.get("/", getAllBookings);

module.exports = BookingRouter;
