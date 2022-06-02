import { Link, Typography } from "@mui/material";
import React from "react";

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://nitec.com.br/">
        Nitec
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export { Copyright };
