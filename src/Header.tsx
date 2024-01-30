import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import logo from "./assets/logo.png";

import "./components/Header.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DrawerNav from "./components/DrawerNav";
const Header = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="sticky" color="inherit" className="header">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "80px",
          alignContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Company Logo"
          style={{ marginRight: "10px", height: "100%", borderRadius: "20%" }}
        />

        {isMediumScreen ? (
          <DrawerNav />
        ) : (
          <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
            <Tab label={<Link to="/">Home</Link>} />
            <Tab label={<Link to="/">Products</Link>} />
            <Tab label={<Link to="/aboutUs">About Us</Link>} />
          </Tabs>
        )}

        <div>
          <IconButton color="inherit" onClick={() => navigate("/carts")}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
