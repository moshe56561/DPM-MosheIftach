import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  email: string;
}

const Header: React.FC<HeaderProps> = ({ email }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome, {email}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
