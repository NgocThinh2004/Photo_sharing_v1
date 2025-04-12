import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";


import "./styles.css";

function TopBar({contextText}) {
  
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ position: "relative" }}>
        <Typography variant="h6" color="inherit">
          Nguyễn Ngọc Thịnh
        </Typography>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
