import axios from "axios";
import urlConfig from "../../urlConfig";

axios.defaults.withCredentials = true;


export const makeBooking = async (productId, bookingData = { priceAtThatTime: 0 }) => {
  try {
    await loadCheckoutScript()
    const response = await axios.post(
      `${urlConfig.BOOKING}/${productId}`,
      bookingData
    );
    return response.data.message;
  } catch (error) {
    console.error("Booking failed:", error);
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axios.get(urlConfig.BOOKING);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

export const verifyPayment = async (bookingData) => {
  try {
    const response = await axios.post(
      `${urlConfig.BOOKING}/verify-payment`,
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

export const loadCheckoutScript = () => {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = urlConfig.RAZORPAY_CHECKOUT;
    script.onload = function () {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
};
