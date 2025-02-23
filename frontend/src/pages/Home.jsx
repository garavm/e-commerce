import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  IconButton,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductList from "../components/ProductList";
import basicOps from "../utility/basicOps";
import { usePaginationContext } from "../contexts/PaginationContext";
import axios from "axios";
import urlConfig from "../../urlConfig";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setsortDir] = useState(0);
  const [currCategory, setCurrCategory] = useState("All categories");

  const { pageSize, pageNum, setPageNum } = usePaginationContext();

  useEffect(() => {
    (async function () {
      try {
        const resp = await axios.get(urlConfig.ALL_PRODUCT_URL);
        const productArr = resp.data.message;
        const productMappedArr = productArr.map((product) => ({
          ...product,
          id: product["_id"],
          images: product.productImages,
          title: product.name,
        }));
        setProducts(productMappedArr);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const object = basicOps(
    products,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize
  );
  const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
  const totalPages = object.totalPages;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          🛍️ Explore Products
        </Typography>
        <TextField
          label="Search products..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPageNum(1);
          }}
          sx={{ width: "250px" }}
        />
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              setsortDir(1);
              setPageNum(1);
            }}
          >
            <ArrowCircleUpIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setsortDir(-1);
              setPageNum(1);
            }}
          >
            <ArrowCircleDownIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Products List */}
      <Grid container spacing={3}>
        <ProductList productList={filteredSortedgroupByArr} />
      </Grid>

      {/* Pagination */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardArrowLeftIcon />}
          disabled={pageNum === 1}
          onClick={() => setPageNum((prev) => Math.max(1, prev - 1))}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Page {pageNum} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ChevronRightIcon />}
          disabled={pageNum === totalPages}
          onClick={() => setPageNum((prev) => Math.min(totalPages, prev + 1))}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
