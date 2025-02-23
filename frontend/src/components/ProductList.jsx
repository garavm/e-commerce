import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/slices/cartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid2,
  Badge,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

function ProductList({ productList }) {
  const cartProducts = useSelector((store) => store.cart.cartProducts);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  return (
    <>
      {productList === null ? (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          Loading...
        </Typography>
      ) : (
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          {productList.map((product) => (
            <Grid2 item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.images[0] ||
                    "https://cdn.shopify.com/s/images/admin/no-image-large.gif"
                  }
                  alt={product.title}
                  sx={{ objectFit: "contain", padding: "10px" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    $ {product.price}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <Badge
                      badgeContent={
                        <PrintCount
                          cartProducts={cartProducts}
                          id={product.id}
                        />
                      }
                      color="secondary"
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleAddProduct(product)}
                    >
                      <AddBoxIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}

function PrintCount({ cartProducts, id }) {
  let quantity = cartProducts.find((item) => item.id === id)?.indQuantity || 0;
  return <Typography variant="body2">{quantity}</Typography>;
}

export default ProductList;
