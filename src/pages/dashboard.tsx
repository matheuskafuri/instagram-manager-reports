/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { Insights } from "../types/insights";
import { InsightTable } from "./components/InsightTable";
import { PrimarySearchAppBar } from "./components/PrimarySearchAppBar";
import { TemporaryDrawer } from "./components/Drawer";
import { InsightsSummary } from "./components/InsigthsSummary";

import { Box } from "@mui/material";

import "../styles/Home.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { Copyright } from "./components/Copyright";
import { GoBackButton } from "./components/GoBackButton";
import { Loader } from "./components/Loader";
import theme from "../styles/theme/lightThemeOptions";

function Dashboard({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insights>();

  useEffect(() => {
    if (accessToken) {
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <>
      {loading && <Loader />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        <GoBackButton sx={{ alignSelf: "flex-start" }} />
        <Box sx={{ flexGrow: 1 }}>
          <TemporaryDrawer handleInsightSelection={setSelectedInsight} />
          <PrimarySearchAppBar accessToken={accessToken} />
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
      </Box>
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
