import React, { useCallback, useEffect, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";

import { useSearchContext } from "../context/search";
import { Insights } from "../types/insights";
import { GoBackButton } from "../components/GoBackButton";
import { Box } from "@mui/material";

import api from "../services/api";
import { FollowersReport } from "../components/FollowersReport";
import { Header } from "../components/Header";
import { SecondarySearchAppBar } from "../components/SecondarySearchAppBar";
import { Copyright } from "../components/Copyright";
import theme from "../styles/theme/lightThemeOptions";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase.config";
import { useAccountsContext } from "../context/accounts";

const dateFormatter = (date: string) => {
  return Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

const FollowerCount = ({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [followerCount, setFollowerCount] = useState<Insights>();
  const { search } = useSearchContext();
  const { loadUserAccounts, accounts } = useAccountsContext();
  const [user] = useAuthState(auth);

  const followerCountReport = useCallback(
    async (search: string) => {
      const finalDateAsUnixTimestamp = new Date().getTime() / 1000;
      const initialDateUnixTimestamp = finalDateAsUnixTimestamp - 86400 * 30;

      const since = initialDateUnixTimestamp.toFixed(0);
      const until = finalDateAsUnixTimestamp.toFixed(0);

      try {
        const response = await api.get(
          `${search}/insights?metric=follower_count&period=day&since=${since}&until=${until}&access_token=${accessToken}`
        );
        const data = response.data.data;
        const insights = {
          name: data[0].name,
          period: data[0].period,
          title: data[0].title,
          description: data[0].description,
          values: data[0].values.map((value: any) => {
            return {
              value: value.value,
              end_time: dateFormatter(value.end_time),
            };
          }),
        };
        setFollowerCount(insights);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar seguidores");
      }
    },
    [accessToken]
  );

  useEffect(() => {
    if (search) {
      followerCountReport(search);
    }
    loadUserAccounts();
  }, [followerCountReport, search]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{ flexGrow: 1, padding: 4, display: "flex", alignItems: "center" }}
      >
        <GoBackButton sx={{ color: theme.palette.primary.main }} />
        <Header>Análise de Seguidores dos últimos 30 dias</Header>
      </Box>
      <SecondarySearchAppBar
        handleNewSearch={followerCountReport}
        userAccounts={accounts}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          mt: 2,
        }}
      >
        {followerCount ? <FollowersReport insight={followerCount} /> : null}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: { accessToken } };
};

export default FollowerCount;
