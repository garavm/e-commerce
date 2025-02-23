import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const User = () => {
  const { user, logout } = useAuth();
  const { name, email } = user || {};

  const handleLogout = () => {
   logout();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card
        sx={{ maxWidth: 400, padding: 3, boxShadow: 3, textAlign: "center" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {user ? "My Profile" : "Login Required"}
          </Typography>

          {user ? (
            <>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Email:</strong> {email}
              </Typography>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default User;
