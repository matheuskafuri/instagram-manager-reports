/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";

import { Insights } from "../types/insights";
import { InsightTable } from "./components/InsightTable";
import { PrimarySearchAppBar } from "./components/PrimarySearchAppBar";
import { TemporaryDrawer } from "./components/Drawer";
import { InsightsSummary } from "./components/InsigthsSummary";

import { Box, Container } from "@mui/material";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { Copyright } from "./components/Copyright";
import { Loader } from "./components/Loader";
import fireBaseApi from "../services/fireBaseApi";
import { toast } from "react-toastify";
import { Account } from "./components/AddAccountForm";
import { auth } from "../utility/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insights>();
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);

  const LoadUserAccounts = useCallback(async () => {
    try {
      const data = {
        userId: user?.uid,
      };
      const accounts = await fireBaseApi.post("/load-accounts", data);
      setUserAccounts(accounts.data);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao adicionar contas");
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      LoadUserAccounts();
      setLoading(false);
    }
  }, [LoadUserAccounts, accessToken]);

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
            userAccounts={userAccounts}
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
