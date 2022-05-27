import React, { useEffect } from "react";
import { auth } from "../utility/firebase.config";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";
import usePremiumStatus from "../../stripe/usePremiumStatus";

import {
  Stack,
  LinearProgress,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { deepOrange, lightBlue } from "@mui/material/colors";
import AutoModeTwoToneIcon from "@mui/icons-material/AutoModeTwoTone";

const Home = () => {
  // const { user } = useAuthContext();
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user!);

  const handleGoDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoLogin = () => {
    router.push("/login");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!user && userLoading && (
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
      )}
      {!user && !userLoading && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleGoLogin()}
        >
          Sign Up
        </Button>
      )}
      {user && !userLoading && (
        <Container>
          <Typography variant="h4">Welcome {user.displayName}</Typography>
          {!isUserPremium ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => createCheckoutSession(user.uid)}
            >
              Upgrade to Premium
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleGoDashboard()}
            >
              Go to Dashboard
            </Button>
          )}
        </Container>
      )}
    </div>
  );
};

export default Home;
