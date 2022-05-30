import * as React from "react";
import StarIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  GlobalStyles,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { Copyright } from "../Copyright";
import { SiteNavBar } from "../SiteNavBar";
import { createCheckoutSession } from "../../../../stripe/createCheckoutSession";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "1 conta do instagram",
      "Acesso limitado aos insights",
      "Sem acesso à central de ajuda",
      "Sem suporte por E-mail",
    ],
    buttonText: "Comece grátis",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Mais Popular",
    price: "50",
    description: [
      "até 15 contas do instagram",
      "Acesso ilimitado aos insights",
      "Acesso à central de ajuda",
      "Suporte prioritário por E-mail",
    ],
    buttonText: "Comece agora",
    buttonVariant: "contained",
  },
  // {
  //   title: "Enterprise",
  //   price: "Entre em contato",
  //   description: [
  //     "Sem limite de contas do instagram",
  //     "Acesso ilimitado aos insights",
  //     "Acesso à central de ajuda one-on-one",
  //     "Suporte prioritário por E-mail",
  //   ],
  //   buttonText: "Entre em contato",
  //   buttonVariant: "outlined",
  // },
];

type PricingProps = {
  userUid: string;
};

const Pricing = ({ userUid }: PricingProps) => {
  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Planos
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Escolha o melhor plano para você!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={6} //with 3 cards, this is should be 4
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant={tier.title === "Enterprise" ? "h5" : "h3"}
                      color="text.primary"
                    >
                      R${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mês
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={() => createCheckoutSession(userUid)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
};

export { Pricing };
