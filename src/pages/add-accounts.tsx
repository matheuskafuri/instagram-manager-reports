import { Box } from "@mui/material";
import { AddAccountForm } from "./components/AddAccountForm";
import { AppHeader } from "./components/AppHeader";

function AddAccount() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <AppHeader />
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          margin: 'auto',
          marginTop: "1rem",

        }}
      >
      <AddAccountForm/>
      </Box>
    </Box>
  )
}


export default AddAccount;