import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Button } from "@mui/material";
import { makeBooking, verifyPayment } from "../api/bookingService";
import useAuth from "../hooks/useAuth";
import { useCallback } from "react";


function Cart() {
  const productList = useSelector((store) => store.cart.cartProducts);
  const { user } = useAuth()
  

  const handleBuyNow = useCallback(async () => {
    try {
      const productId = productList[0]._id;
      const price = productList[0].price;
      // Step 1: Create a booking
      const bookingResponse = await makeBooking(productId, {
        priceAtThatTime: price,
      });

      const { id, currency, amount } = bookingResponse;
      // 🔹 Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_PUBLIC_KEY, // ✅ Using Vite env variable
        amount: amount.toString(),
        currency,
        order_id: id,
        name: "Payment",
        description: "Thanks for your payment",
        handler: async function (response) {
          console.log(`Payment ID: ${response.razorpay_payment_id}`);
          console.log(`Order ID: ${response.razorpay_order_id}`);
          console.log(`Signature: ${response.razorpay_signature}`);
          alert("Payment successful!");
          // ✅ Step 1: Send Payment Verification Request to Backend
          try {
            const verifyData = await verifyPayment(response);
            if (verifyData.status === "success") {
              // ✅ Step 2: Redirect User to Success Page or Show Confirmation
              alert("Payment Verified! Your booking is confirmed.");
              window.location.href = "/order-success"; // Redirect to success page
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Something went wrong. Please try again.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // eslint-disable-next-line no-undef
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert(error.message);
    }
  }, [productList, user.email, user.name]);


  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          🛒 Your Shopping Cart
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Add or remove products from your cart.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ProductList productList={productList} />
      </Box>
      {productList.length > 0 &&
      <Button variant="contained" color="secondary" onClick={handleBuyNow}>
        Buy Now
      </Button>}
    </Container>
  );
}

export default Cart;
