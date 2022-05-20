/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { NextPage } from "next";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Insights } from "../types/insights";
import { translation } from "../utility/translation";
import { Chart } from "./components/Chart";
import FacebookLoginButton from "./components/FacebookLoginButton";
import { PrimarySearchAppBar } from "./components/PrimarySearchAppBar";
import { Header } from "./components/Header";

import "../styles/Home.module.css";

const sum = (values: number[]) => {
  return values.reduce((acc, value) => acc + value, 0);
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Métrica",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => params.row.title,
  },
  {
    field: "period",
    headerName: "Periodo",
    width: 280,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.values[0].end_time} - ${
        params.row.values[params.row.values.length - 1].end_time
      }`,
  },
  {
    field: "values",
    headerName: "Valores",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => {
      let newValue: number[] = [];
      params.row.values.forEach((item: any) => newValue.push(item.value));
      return sum(newValue);
    },
  },
];

const Home: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState<Insights[]>([]);
  const [chartData, setChartData] = useState<Insights>({} as Insights);

  if (!login) {
    return (
      <Box sx={{ maxWidth: "300px" }}>
        <FacebookLoginButton handleLoginState={setLogin} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />
      <PrimarySearchAppBar handleSetData={setData} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          mt: 2,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 440,
                }}
              >
                <DataGrid
                  columns={columns}
                  rows={data}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  getRowId={(row) => row.name}
                  components={{ Toolbar: GridToolbar }}
                  onCellDoubleClick={(data) => {
                    setChartData(data.row);
                  }}
                  localeText={translation.ptBR}
                  disableSelectionOnClick
                />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              lg={9}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 440,
                borderRadius: "5px",
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                mt: 2,
                alignItems: "center",
              }}
            >
              <Chart data={chartData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
