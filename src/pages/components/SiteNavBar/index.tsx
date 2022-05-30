import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

const SiteNavBar = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Manager Report
        </Typography>
        <nav>
          <Link
            variant="button"
            color="inherit"
            href="#"
            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
          >
            Funcionalidades
          </Link>
          <Link
            variant="button"
            color="inherit"
            href="#"
            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
          >
            Empresa
          </Link>
          <Link
            variant="button"
            color="inherit"
            href="#"
            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
          >
            Suporte
          </Link>
        </nav>
        <Button
          href="#"
          variant="contained"
          sx={{ my: 1, mx: 1.5, bgcolor: deepOrange[500] }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { SiteNavBar };
