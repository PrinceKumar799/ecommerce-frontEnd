import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body2" component="div">
          &copy; {new Date().getFullYear()} Smile Shop. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
