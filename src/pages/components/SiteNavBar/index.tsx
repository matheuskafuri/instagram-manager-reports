import React from "react";
import { auth } from "../../../utility/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../../../../stripe/usePremiumStatus";
import { useAuthContext } from "../../../context/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import theme from "../../../styles/theme/lightThemeOptions";

const SiteNavBar = () => {
  const { signOut, user } = useAuthContext();
  const [firebaseUser] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(firebaseUser!);
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
      }}
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
            Suporte
          </Link>
          <Link
            variant="button"
            color="inherit"
            sx={{
              my: 1,
              mx: 1.5,
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => signOut()}
          >
            Sair
          </Link>
        </nav>
        {!isUserPremium && (
          <Button
            href="/pricing"
            variant="contained"
            sx={{ my: 1, mx: 1.5, bgcolor: theme.palette.secondary.main }}
          >
            Upgrade to premium
          </Button>
        )}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar alt={user?.name} src={user?.picture} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { SiteNavBar };
