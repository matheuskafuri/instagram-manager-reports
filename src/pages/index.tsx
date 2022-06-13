import React from "react";

import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Copyright } from "../components/Copyright";
import { Hero } from "../components/LandingPageHero";
import { LandingCarousel } from "../components/LandingCarousel";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Home = () => {
  return (
    <>
      <Container component="main" maxWidth="xl" sx={{ padding: 4 }}>
        <Header>Bem-Vindo ao Manager Report!</Header>
        <Hero />
        <LandingCarousel />
      </Container>

      <Copyright />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = parseCookies(ctx);

  if (accessToken) {
    return {
      redirect: {
        destination: "/menu",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Home;
