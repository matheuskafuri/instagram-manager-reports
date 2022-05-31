import React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../../styles/theme/lightThemeOptions";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color={theme.palette.primary.main}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}
