import React from "react";
import { Box, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuthContext } from "../../../context/auth";

const FacebookButton = () => {
  const { signInWithFacebook } = useAuthContext();
  return (
    <Box display="inline-block" margin="1rem">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1877F2",
          textTransform: "unset",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "royalblue",
          },
        }}
        onClick={() => signInWithFacebook()}
      >
        <FacebookIcon sx={{ mr: 2 }} />
        Entre com Facebook
      </Button>
    </Box>
  );
};

export { FacebookButton };
