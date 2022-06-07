/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { Insights } from "../types/insights";
import { InsightTable } from "../components/InsightTable";
import { PrimarySearchAppBar } from "../components/PrimarySearchAppBar";
import { TemporaryDrawer } from "../components/Drawer";
import { InsightsSummary } from "../components/InsigthsSummary";

import { Box, Container } from "@mui/material";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { Copyright } from "../components/Copyright";
import { Loader } from "../components/Loader";
import { useAccountsContext } from "../context/accounts";

function Dashboard({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { loadUserAccounts, accounts } = useAccountsContext();

  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insights>();

  useEffect(() => {
    if (accessToken) {
      loadUserAccounts();
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Container
        maxWidth="xl"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <TemporaryDrawer handleInsightSelection={setSelectedInsight} />
          <PrimarySearchAppBar
            accessToken={accessToken}
            userAccounts={accounts}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            mt: 2,
          }}
        >
          {selectedInsight ? (
            <InsightTable insight={selectedInsight} />
          ) : (
            <InsightsSummary />
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { accessToken } };
};

export default Dashboard;
