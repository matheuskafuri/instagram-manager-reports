/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { Insights } from "../types/insights";
import { InsightTable } from "./components/InsightTable";
import { PrimarySearchAppBar } from "./components/PrimarySearchAppBar";
import { TemporaryDrawer } from "./components/Drawer";
import { InsightsSummary } from "./components/InsigthsSummary";

import { Box, Button } from "@mui/material";

import "../styles/Home.module.css";
import { useAuthContext } from "../context/auth";
import { useRouter } from "next/router";

function Dashboard() {
  const [selectedInsight, setSelectedInsight] = useState<Insights>();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TemporaryDrawer handleInsightSelection={setSelectedInsight} />
        <PrimarySearchAppBar />
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
    </Box>
  );
}

export default Dashboard;
