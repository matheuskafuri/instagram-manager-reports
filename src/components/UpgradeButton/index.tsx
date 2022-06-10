import { Button } from "@mui/material";
import React from "react";
import theme from "../../styles/theme/lightThemeOptions";

const UpgradeButton = () => {
  return (
    <Button
      href="/pricing"
      variant="contained"
      sx={{ my: 1, mx: 1.5, bgcolor: theme.palette.secondary.main }}
    >
      Upgrade to premium
    </Button>
  );
};

export { UpgradeButton };
