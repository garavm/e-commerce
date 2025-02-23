// all the routes over here 
const BASE_URL = import.meta.env.VITE_BASE_URL;
const RAZORPAY_URL = import.meta.env.VITE_RAZORPAY_URL;
const urlConfig = {
  AUTH: BASE_URL + "/api/auth",
  PRODUCT: BASE_URL + "/api/product",
  BOOKING: BASE_URL + "/api/booking",
  RAZORPAY_CHECKOUT: RAZORPAY_URL + "/v1/checkout.js",
};


export default urlConfig;



