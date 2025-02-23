import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Button } from "@mui/material";
import { makeBooking } from "../api/bookingService";
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
          alert("payment id" + response.razorpay_payment_id);
          alert("order id " + response.razorpay_order_id);
          alert(response.razorpay_signature);
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
