import React from "react";
import { auth } from "../utility/firebase.config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Typography,
  Button,
  Box,
  Container,
  Card,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Loader } from "./components/Loader";
import { useAuthContext } from "../context/auth";
import { Header } from "./components/Header";
import { FacebookButton } from "./components/SocialLoginButton";
import theme from "../styles/theme/lightThemeOptions";
import { AppMenu } from "./components/AppMenu";
import { Copyright } from "./components/Copyright";

const Home = () => {
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);

  return (
    <>
      {!user && userLoading && <Loader />}

      {!user && !userLoading && (
        <Container component="main" maxWidth="sm" sx={{ padding: 4 }}>
          <Header>Welcome to the Manager Report!</Header>
          {/* Criar fluxograma de registro do usuário */}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FacebookButton />
          </Box>
        </Container>
      )}

      {user && !userLoading && (
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Box sx={{ marginTop: 2, display: "flex", alignItems: "flex-start" }}>
            <Header>Welcome back, {user.displayName}!</Header>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <AppMenu />
          </Box>
        </Container>
      )}
      <Copyright />
    </>
  );
};

export default Home;
