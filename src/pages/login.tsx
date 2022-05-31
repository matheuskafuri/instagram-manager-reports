import React, { FormEvent } from "react";
import {
  Box,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Avatar,
  Button,
  Input,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useAuthContext } from "../context/auth";
import { Copyright } from "./components/Copyright";

const Login = () => {
  const { signInWithFacebook } = useAuthContext();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithFacebook();
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Bem vindo ao <br />
          Instagram Manager Report 🚀
        </Typography>
        <Typography component="p" sx={{ mt: 4 }}>
          Link sua conta business abaixo 👇
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Login;
