import React from "react";
import { auth } from "../utility/firebase.config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { Typography, Button } from "@mui/material";
import { Loader } from "./components/Loader";
import { useAuthContext } from "../context/auth";

const Home = () => {
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  const { signOut, signInWithFacebook } = useAuthContext();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!user && userLoading && <Loader />}

      {!user && !userLoading && (
        <div>
          <Typography variant="h3">Welcome to the Manager Report!</Typography>
          {/* Criar fluxograma de registro do usuário */}
          <Button
            sx={{
              width: "100%",
              height: "100%",
              color: "with",
              backgroundColor: "royalblue",
              mt: 3,
            }}
            variant="contained"
            onClick={() => signInWithFacebook()}
          >
            Entrar
          </Button>
        </div>
      )}

      {user && !userLoading && (
        <div>
          <Typography variant="h5">
            Welcome back, {user.displayName}!
          </Typography>
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
              backgroundColor: "darkgoldenrod",
              mt: 3,
            }}
            variant="contained"
            onClick={() => router.push("/")}
          >
            Adicionar uma conta do Instagram
          </Button>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              color: "with",
              backgroundColor: "darkkhaki",
              mt: 3,
            }}
            variant="contained"
            onClick={() => router.push("/pricing")}
          >
            Upgrade to Premium
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
        </div>
      )}
    </div>
  );
};

export default Home;
