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
import { AreaModelChart } from "../Chart/AreaChart";
import { AuxiliarPanel } from "../AuxiliarPanel";

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

type InsightTable = {
  insight: Insights;
};
const InsightTable = ({ insight }: InsightTable) => {
  const chartData = insight;
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
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
        <Grid
          item
          xs={12}
          md={9}
          lg={8}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
            borderRadius: "10px",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            mt: 2,
            alignItems: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          overflow={isMobile ? "auto" : "none"}
        >
          <AreaModelChart data={chartData} />
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ flexGrow: 1 }}>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              ml: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AuxiliarPanel data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export { InsightTable };
