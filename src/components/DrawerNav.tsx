import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const DrawerNav: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton href="/">
            <ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton href="/">
            <ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton href="/aboutUs">
            <ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemIcon>
          </ListItemButton>
          {isLoggedIn ? (
            <>
              <ListItemButton href="/carts">
                <ListItemIcon>
                  <ListItemText primary="Cart" />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton href="/users/userDetails">
                <ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton href="/login">
                <ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton href="/signup">
                <ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
