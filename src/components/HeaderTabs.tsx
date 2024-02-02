import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Tab, Tabs, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
const HeaderTabs: React.FC = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="tabs">
      {isLoggedIn ? (
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label={<Link to="/">Home</Link>} className="tab" />
          <Tab label={<Link to="/wishlist">WishList</Link>} className="tab" />
          <Tab
            label={
              <Link to="/carts">
                <ShoppingCartIcon />
              </Link>
            }
            className="tab"
          />
          <Tab
            label={
              <Link to="/users/userDetails">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <AccountCircleIcon />
                </Box>
              </Link>
            }
            className="tab"
          />
        </Tabs>
      ) : (
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label={<Link to="/">Home</Link>} className="tab" />
          <Tab
            label={
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            }
            className="tab"
          />
          <Tab
            label={
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            }
            className="tab"
          />
        </Tabs>
      )}
    </div>
  );
};

export default HeaderTabs;
