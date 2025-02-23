import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Back Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
