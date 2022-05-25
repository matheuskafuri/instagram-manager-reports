import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <Typography
      variant="h1"
      style={{ fontSize: "32px", fontWeight: "bold" }}
      align="center"
      color="primary"
    >
      {children}
    </Typography>
  );
};

export { Header };
