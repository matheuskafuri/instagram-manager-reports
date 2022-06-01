import React, { FormEvent } from "react";
import { Box, Container, Typography, Avatar, Button } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useAuthContext } from "../context/auth";
import { Copyright } from "./components/Copyright";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";

const Login = ({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { signInWithFacebook } = useAuthContext();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithFacebook();
  };
  const userName = username;
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 4,
          padding: 6,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Olá {userName} <br />
          Instagram Manager Report 🚀
        </Typography>
        <Typography component="p" sx={{ mt: 4 }}>
          Conecte sua conta business abaixo 👇
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Conectar Conta do Facebook
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = parseCookies(ctx);

  if (!username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { username } };
};

export default Login;
