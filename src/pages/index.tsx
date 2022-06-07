import React from "react";
import { auth } from "../utility/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Container } from "@mui/material";
import { Loader } from "../components/Loader";
import { Header } from "../components/Header";
import { AppMenu } from "../components/AppMenu";
import { Copyright } from "../components/Copyright";
import { Hero } from "../components/LandingPageHero";
import { LandingCaroussel } from "../components/LandingCaroussel";

const Home = () => {
  const [user, userLoading] = useAuthState(auth);

  return (
    <>
      {!user && userLoading && <Loader />}

      {!user && !userLoading && (
        <Container component="main" maxWidth="xl" sx={{ padding: 4 }}>
          <Header>Bem-Vindo ao Manager Report!</Header>
          {/* Criar fluxograma de registro do usuário */}
          <Hero />
          <LandingCaroussel />
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
