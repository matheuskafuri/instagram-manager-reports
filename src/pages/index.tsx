import React, { useEffect, useState } from "react";
import { auth } from "../utility/firebase.config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";
import usePremiumStatus from "../../stripe/usePremiumStatus";

import { Typography, Button } from "@mui/material";
import { Loader } from "./components/Loader";
import { Pricing } from "./components/PricingComponent";
import { useAuthContext } from "../context/auth";

const Home = () => {
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user!);
  const { signOut } = useAuthContext();

  const handleGoPricing = () => {
    router.push("/pricing");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!user && userLoading && <Loader />}

      {!user && !userLoading && (
        <div>
          <Typography variant="h3">Welcome to the Manager Report!</Typography>
          {/* Criar fluxograma de registro do usuário */}
        </div>
      )}

      {user && !userLoading && (
        <div>
          <Typography variant="h5">
            Welcome back, {user.displayName}!
          </Typography>
          {!isUserPremium ? (
            <Pricing userUid={user.uid} />
          ) : (
            <>
              <Button
                sx={{
                  width: "100%",
                  height: "100%",
                  color: "with",
                }}
                variant="contained"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                sx={{
                  width: "100%",
                  height: "100%",
                  color: "with",
                  backgroundColor: "rosybrown",
                  mt: 3,
                }}
                variant="contained"
                onClick={() => signOut()}
              >
                Sair
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
