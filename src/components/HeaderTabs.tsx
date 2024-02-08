import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Tab, Tabs, Box, Button, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const HeaderTabs: React.FC = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const cartCounter = useSelector((state: RootState) => state.cart.counter);
  const navigate = useNavigate();
  return (
    <div className="tabs">
      {isLoggedIn ? (
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Home" className="tab" onClick={() => navigate("/")} />
          <Tab
            label="WishList"
            className="tab"
            onClick={() => navigate("/wishlist")}
          />
          <Tab
            label={
              <Badge badgeContent={cartCounter} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={() => navigate("/carts")}
            className="tab"
          />
          <Tab
            label={
              <Box display="flex" justifyContent="center" alignItems="center">
                <AccountCircleIcon />
              </Box>
            }
            onClick={() => navigate("/users/userDetails")}
            className="tab"
          />
        </Tabs>
      ) : (
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label={<Link to="/">Home</Link>} className="tab" />
          <Tab
            label={
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login
              </Button>
            }
            className="tab"
          />
          <Tab
            label={
              <Button variant="outlined" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            }
            className="tab"
          />
        </Tabs>
      )}
    </div>
  );
};

export default HeaderTabs;
