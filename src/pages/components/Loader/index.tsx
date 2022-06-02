import React from "react";

import { Container, Stack, LinearProgress } from "@mui/material";
import AutoModeTwoToneIcon from "@mui/icons-material/AutoModeTwoTone";
import theme from "../../../styles/theme/lightThemeOptions";

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
          color: theme.palette.primary.light,
          width: 120,
          height: 120,
          m: 2,
        }}
      />
      <Stack
        sx={{
          width: "100%",
          color: theme.palette.secondary.main,
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
