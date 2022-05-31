import React from "react";
import { useRouter } from "next/router";
import theme from "../../../styles/theme/lightThemeOptions";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { SiteNavBar } from "../SiteNavBar";

const tiers = [
  {
    title: "Dashboard",
    subtitle: "Veja seus reports",
    description: "Acesse seus reports e gerencie seus insights.",
    buttonText: "Ir para o Dashboard",
    buttonLink: "/dashboard",
    buttonVariant: "contained",
    buttonColor: "royalblue",
    backgroundColor: "#fff",
  },
  {
    title: "Adicionar Contas",
    subtitle: "Adicione mais contas ao seu Dashboard",
    description: "Adicione mais contas ao seu Dashboard.",
    buttonText: "Adicionar Contas",
    buttonLink: "/",
    buttonVariant: "contained",
    buttonColor: "#e91e63",
    backgroundColor: "#fff",
  },
];

const AppMenu = () => {
  const router = useRouter();
  return (
    <>
      <SiteNavBar />
      <Container
        maxWidth="md"
        component="div"
        sx={{
          marginTop: "2.5rem",
        }}
      >
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              md={6} //with 3 cards, this is should be 4
            >
              <Card
                sx={{
                  backgroundColor: tier.backgroundColor,
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[5],
                  padding: theme.spacing(2),
                  color: theme.palette.text.primary,
                }}
              >
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{
                    align: "center",
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    fontWeight="semiBold"
                  >
                    {tier.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={() => router.push(`/${tier.buttonLink}`)}
                    sx={{ backgroundColor: tier.buttonColor }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export { AppMenu };
