import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";

function Cart() {
  const productList = useSelector((store) => store.cart.cartProducts);

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
    </Container>
  );
}

export default Cart;
