import { Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Typography
      variant="h1"
      style={{ fontSize: "32px", fontWeight: "bold" }}
      align="center"
      color="primary"
    >
      Dashboard
    </Typography>
  );
};

export { Header };
