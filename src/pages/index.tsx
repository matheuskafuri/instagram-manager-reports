/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useState } from "react";
import "../styles/Home.module.css";
import { Insights } from "../types/insights";
import { translation } from "../utility/translation";
import { Chart } from "./components/Chart";
import FacebookLoginButton from "./components/FacebookLoginButton";
import { PrimarySearchAppBar } from "./components/PrimarySearchAppBar";

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

  return (
    <Box>
      <Typography
        variant="h1"
        style={{ fontSize: "32px", fontWeight: "bold" }}
        align="center"
        color="primary"
      >
        Dashboard
      </Typography>
      <Box style={{ width: "100%" }}>
        {!login && <FacebookLoginButton handleLoginState={setLogin} />}
        {login && <PrimarySearchAppBar handleSetData={setData} />}
      </Box>
      <Box
        sx={{
          height: 400,
          maxWidth: "1180px",
          margin: "0 auto",
          mt: "32px",
        }}
      >
        {login && (
          <>
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
              sx={{ mb: "32px" }}
            />
            <Chart data={chartData} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
