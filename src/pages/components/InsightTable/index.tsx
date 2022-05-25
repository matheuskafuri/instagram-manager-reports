import React from "react";

import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Container, Grid, Paper } from "@mui/material";
import { Insights } from "../../../types/insights";
import { translation } from "../../../utility/translation";
import { Chart } from "../Chart";
import { AreaModelChart } from "../Chart/AreaChart";

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
            borderRadius: "5px",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            mt: 2,
            alignItems: "center",
          }}
        >
          <AreaModelChart data={chartData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export { InsightTable };
