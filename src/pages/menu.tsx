import React from "react";
import { auth } from "../utility/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Container } from "@mui/material";
import { Header } from "../components/Header";
import { AppMenu } from "../components/AppMenu";
import { Copyright } from "../components/Copyright";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { Loader } from "../components/Loader";

const Menu = () => {
  const [user, userLoading] = useAuthState(auth);
  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Box sx={{ marginTop: 2, display: "flex", alignItems: "flex-start" }}>
            <Header>Bem-vindo de volta, {user?.displayName}!</Header>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { accessToken } };
};

export default Menu;
