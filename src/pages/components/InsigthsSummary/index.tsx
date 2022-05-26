import { Container, Grid, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import { useInsightsContext } from "../../../context/insights";
import { Insights } from "../../../types/insights";
import { translation } from "../../../utility/translation";
import { AuxiliarPanel } from "../AuxiliarPanel";
import { Chart } from "../Chart";
import { AreaModelChart } from "../Chart/AreaChart";

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

const InsightsSummary = () => {
  const { insights } = useInsightsContext();
  const [chartData, setChartData] = useState<Insights>({} as Insights);

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
              rows={insights ? insights : []}
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
        <Grid item xs={12} md={4} lg={3} sx={{ flexGrow: 1 }}>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              ml: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <AuxiliarPanel data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export { InsightsSummary };
