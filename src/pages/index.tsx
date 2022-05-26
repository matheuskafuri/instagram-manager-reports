import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/auth";

import { Stack, LinearProgress, Container } from "@mui/material";
import { deepOrange, lightBlue } from "@mui/material/colors";
import AutoModeTwoToneIcon from "@mui/icons-material/AutoModeTwoTone";

const Home = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    if (user) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <AutoModeTwoToneIcon
        sx={{
          color: lightBlue[800],
          width: 120,
          height: 120,
          m: 2,
        }}
      />
      <Stack
        sx={{
          width: "100%",
          color: deepOrange[500],
        }}
        spacing={2}
      >
        <LinearProgress color="primary" />
        <LinearProgress color="inherit" />
        <LinearProgress color="primary" />
        <LinearProgress color="inherit" />
      </Stack>
    </Container>
  );
};

export default Home;
