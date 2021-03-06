import React from "react";

import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Container, Grid, Paper, useMediaQuery } from "@mui/material";
import { Insights } from "../../types/insights";
import { translation } from "../../utility/translation";
import { AccumulatedChart } from "../AccumulatedChart";
import { AreaModelChart } from "../Chart/AreaChart";
import { AccountTitle } from "../AccountTitle";

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
    valueGetter: (params: GridValueGetterParams) => params.row.day,
  },
  {
    field: "values",
    headerName: "Valores",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => params.row.value,
  },
];

type FollowersReport = {
  insight: Insights;
};
const FollowersReport = ({ insight }: FollowersReport) => {
  const chartOneData = insight;
  const isMobile = useMediaQuery("(max-width: 700px)");

  let tableData: any[] = [];
  if (insight.values) {
    insight.values.forEach((item: any) => {
      tableData.push({
        title: insight.title,
        day: item.end_time,
        value: item.value,
      });
    });
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <AccountTitle />
      <Grid
        container
        sx={{
          display: {
            md: "flex",
            lg: "flex",
            xl: "flex",
            xxl: "flex",
          },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
            borderRadius: "10px",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            alignItems: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          overflow={isMobile ? "auto" : "none"}
        >
          <AreaModelChart
            title="Novos Seguidores por Dia"
            data={chartOneData}
          />
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
            borderRadius: "10px",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            mt: 2,
            alignItems: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          overflow={isMobile ? "auto" : "none"}
        >
          <AccumulatedChart
            title="Novos Seguidores nos últimos 30 dias"
            data={chartOneData}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 440,
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <DataGrid
              columns={columns}
              rows={tableData}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.day}
              components={{ Toolbar: GridToolbar }}
              localeText={translation.ptBR}
              disableSelectionOnClick
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export { FollowersReport };
