import { Box } from "@mui/material";
import { AddAccountForm } from "./components/AddAccountForm";
import { SiteNavBar } from "./components/SiteNavBar";

function AddAccount() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
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
      </Box>
    </Box>
  );
}

export default AddAccount;
