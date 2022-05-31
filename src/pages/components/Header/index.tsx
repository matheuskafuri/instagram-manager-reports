import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import theme from "../../../styles/theme/lightThemeOptions";

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <Typography
      variant="h1"
      style={{ fontSize: "32px", fontWeight: "bold" }}
      align="center"
      color={theme.palette.primary.main}
    >
      {children}
    </Typography>
  );
};

export { Header };
