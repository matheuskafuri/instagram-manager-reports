import React from "react";

import { Container, Stack, LinearProgress } from "@mui/material";
import AutoModeTwoToneIcon from "@mui/icons-material/AutoModeTwoTone";
import { lightBlue, deepOrange } from "@mui/material/colors";

const Loader = () => {
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

export { Loader };
