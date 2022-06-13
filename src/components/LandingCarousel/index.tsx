import React from "react";

import impressions from "../../../public/assets/images/impressions_example.png";
import reach from "../../../public/assets/images/reach_example.png";
import followersPerDay from "../../../public/assets/images/new_followers_chart_example.png";
import monthFollowers from "../../../public/assets/images/30_days_new_followers_chart_example.png";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import theme from "../../styles/theme/lightThemeOptions";

const LandingCarousel = () => {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Typography
        variant="h4"
        fontWeight={700}
        fontSize={isMobile ? "32px" : "28px"}
        sx={{
          paddingBottom: "1rem",
          color: theme.palette.primary.main,
          mb: 4,
          padding: "1.5rem",
        }}
      >
        Mostre para o seu cliente que o seu trabalho está gerando resultados
        incríveis.
      </Typography>
      <Grid
        width="100%"
        maxHeight="100%"
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
        }}
        overflow="auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 2fr))"
        gap="1rem"
        p={2}
      >
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "12px",
          }}
        >
          <Image
            src={impressions}
            alt="My Team"
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <Image
            src={reach}
            alt="My Team"
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Grid>
      <Grid
        width="100%"
        maxHeight="100%"
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
        }}
        overflow="auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="1rem"
        p={2}
      >
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "12px",
          }}
        >
          <Image
            src={followersPerDay}
            alt="My Team"
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "12px",
          }}
        >
          <Image
            src={monthFollowers}
            alt="My Team"
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Grid>

      <Typography
        variant="h4"
        sx={{ opacity: "0.5", paddingBottom: "2rem" }}
        color={theme.palette.text.primary}
        textAlign="right"
        mt={4}
      >
        E muito mais...
      </Typography>
    </div>
  );
};

export { LandingCarousel };
