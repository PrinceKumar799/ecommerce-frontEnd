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

const DrawerNav: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
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
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
