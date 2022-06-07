import { Box } from "@mui/material";
import theme from "../styles/theme/lightThemeOptions";
import { AccountsList } from "../components/AccountsList";
import { AddAccountForm } from "../components/AddAccountForm";
import { SiteNavBar } from "../components/SiteNavBar";

function AddAccount() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <SiteNavBar />
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        <AddAccountForm />
        <AccountsList />
      </Box>
    </Box>
  );
}

export default AddAccount;
