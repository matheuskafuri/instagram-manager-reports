import React, { useState } from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme/lightThemeOptions";
import {
  Box,
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
import StarIcon from "@mui/icons-material/Star";
import { Loader } from "../Loader";

const tiers = [
  {
    title: "Dashboard",
    subtitle: "Veja seus reports",
    description: [
      "Acesse seus reports e gerencie seus insights.",
      "Exporte suas tabelas de dados para o Excel.",
    ],
    buttonText: "Ir para o Dashboard",
    buttonLink: "/dashboard",
    buttonVariant: "contained",
    buttonColor: "royalblue",
    backgroundColor: "theme.palette.background.paper",
  },
  {
    title: "Adicionar Contas",
    subtitle: "Adicione mais contas ao seu Dashboard",
    description: [
      "Adicione mais contas ao seu Dashboard.",
      "Gere relatórios para todas as suas contas.",
    ],
    buttonText: "Adicionar Contas",
    buttonLink: "/add-accounts",
    buttonVariant: "contained",
    buttonColor: "#e91e63",
    backgroundColor: "theme.palette.background.paper",
  },
];

const AppMenu = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (endpoint: string) => {
    setLoading(true);
    router.push(endpoint);
  };
  return (
    <>
      <SiteNavBar />
      <Container
        maxWidth="lg"
        component="div"
        sx={{
          marginTop: "2.5rem",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
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
                    {tier.description.map((line) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: 2,
                        }}
                        key={line}
                      >
                        <StarIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />

                        <Typography
                          variant="subtitle1"
                          align="center"
                          fontWeight="semiBold"
                        >
                          {line}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant as "outlined" | "contained"}
                      onClick={() => handleNavigation(`${tier.buttonLink}`)}
                      sx={{ backgroundColor: tier.buttonColor }}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export { AppMenu };
