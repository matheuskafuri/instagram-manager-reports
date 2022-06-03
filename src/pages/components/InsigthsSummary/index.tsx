import React from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useInsightsContext } from "../../../context/insights";
import { translation } from "../../../utility/translation";
import { AreaModelChart } from "../Chart/AreaChart";
import theme from "../../../styles/theme/lightThemeOptions";

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
              rows={insights ? insights : []}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.name}
              components={{ Toolbar: GridToolbar }}
              localeText={translation.ptBR}
              disableSelectionOnClick
            />
          </Paper>
        </Grid>
        <div style={{ width: "100%", whiteSpace: "nowrap" }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              my: 2,
              p: 1,
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: theme.palette.primary.main,
            }}
            overflow="auto"
          >
            {insights &&
              insights.length > 0 &&
              insights.map((insight) => (
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
                    alignItems: "center",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    mx: 2,
                  }}
                  key={insight.name}
                >
                  <AreaModelChart data={insight} />
                </Grid>
              ))}
          </Box>
        </div>
      </Grid>
    </Container>
  );
};

export { InsightsSummary };
