import React, { useEffect, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";

import { useSearchContext } from "../context/search";
import { useAuthContext } from "../context/auth";
import { Insights } from "../types/insights";
import { GoBackButton } from "./components/GoBackButton";
import { Box } from "@mui/material";

import api from "../services/api";
import { useRouter } from "next/router";
import { FollowersReport } from "./components/FollowersReport";
import { Header } from "./components/Header";
import { SecondarySearchAppBar } from "./components/SecondarySearchAppBar";

const dateFormatter = (date: string) => {
  return Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

const FollowerCount = ({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [followerCount, setFollowerCount] = useState<Insights>();
  const { search } = useSearchContext();
  const { user } = useAuthContext();
  const router = useRouter();

  const followerCountReport = async (search: string) => {
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
      console.log(insights);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!search) {
      alert(
        "Por favor, insira um código de conta válido no campo de pesquisa."
      );
      router.push("/");
    }
    followerCountReport(search);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{ flexGrow: 1, padding: 4, display: "flex", alignItems: "center" }}
      >
        <GoBackButton />
        <Header>Análise de Seguidores dos últimos 30 dias</Header>
      </Box>
      <SecondarySearchAppBar />
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
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { accessToken } };
};

export default FollowerCount;
