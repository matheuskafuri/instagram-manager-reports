import React from "react";
import { auth } from "../utility/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Container } from "@mui/material";
import { Loader } from "./components/Loader";
import { Header } from "./components/Header";
import { FacebookButton } from "./components/SocialLoginButton";
import { AppMenu } from "./components/AppMenu";
import { Copyright } from "./components/Copyright";

const Home = () => {
  const [user, userLoading] = useAuthState(auth);

  return (
    <>
      {!user && userLoading && <Loader />}

      {!user && !userLoading && (
        <Container component="main" maxWidth="sm" sx={{ padding: 4 }}>
          <Header>Bem-Vindo ao Manager Report!</Header>
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
            <Header>Bem-vindo de volta, {user.displayName}!</Header>
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
