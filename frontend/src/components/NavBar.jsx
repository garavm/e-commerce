import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const quantity = useSelector((store) => store.cart.cartQuantity);
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1976d2", padding: "8px 0" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Logo / Home */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          MyStore
        </Typography>

        {/* Center - Navigation Links */}
        <div>
          <Button component={Link} to="/" sx={{ color: "white", mx: 1 }}>
            Home
          </Button>
          {user ? (
            <>
              <Button sx={{ color: "white" }} onClick={handleMenuOpen}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                My Account
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/user" onClick={handleMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} to="/login" sx={{ color: "white", mx: 1 }}>
              Login
            </Button>
          )}
        </div>

        {/* Right Side - Cart */}
        <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
          <Badge badgeContent={quantity} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
