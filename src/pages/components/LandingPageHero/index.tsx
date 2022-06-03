import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import myteam from "../../../assets/images/myteam.jpeg";
import Image from "next/image";
import { FacebookButton } from "../SocialLoginButton";
import theme from "../../../styles/theme/lightThemeOptions";

const padding = window.innerWidth;

const Hero = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "600px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1300px",
          padding: window.innerWidth > 600 ? "2px" : "1rem",
        }}
      >
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            fontWeight={700}
            fontSize={window.innerWidth > 600 ? "32px" : "28px"}
            sx={{ paddingBottom: "1rem", color: theme.palette.primary.main }}
          >
            Vamos escalar seu negócio
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: "0.4", paddingBottom: "2rem" }}
          >
            Ajudamos você a criar e gerenciar os dados mais relevantes para o
            seu cliente. <br />
            Gere relatórios de insights, análise de dados e muito mais. <br />
            Exporte os dados consolidados ou até mesmo diários de cada insight.{" "}
            <br />
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ opacity: "0.8", paddingBottom: "0.5rem" }}
          >
            Comece grátis agora mesmo 👇
          </Typography>
          <FacebookButton />
        </Grid>
        <Grid item xs={12} md={5}>
          <Image
            src={myteam}
            alt="My Team"
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { Hero };
