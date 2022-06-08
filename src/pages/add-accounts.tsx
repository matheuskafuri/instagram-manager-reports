import { Box } from "@mui/material";
import theme from "../styles/theme/lightThemeOptions";
import { AccountsList } from "../components/AccountsList";
import { AddAccountForm } from "../components/AddAccountForm";
import { SiteNavBar } from "../components/SiteNavBar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = parseCookies(ctx);

  if (!username) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { username } };
};

export default AddAccount;
