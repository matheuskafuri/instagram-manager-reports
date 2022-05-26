import React from "react";
import { Typography, Link } from "@mui/material";
import Title from "../Title";
import { Insights } from "../../../types/insights";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type AuxiliarPanelProps = {
  title?: string;
  data: Insights;
};

const AuxiliarPanel = ({ title, data }: AuxiliarPanelProps) => {
  const panelDataTotalValue = data.values
    .map((item: any) => item.value)
    .reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );

  const panelDataTotalValueFormatted = new Intl.NumberFormat(
    "pt-BR",
    {}
  ).format(panelDataTotalValue);
  const panelDataInitialDate = data.values[0].end_time;
  const panelDataFinalDate = data.values[data.values.length - 1].end_time;
  const description = data.description;

  return (
    <>
      <Title>{title ? title : data.title}</Title>
      <Typography component="p" variant="h4">
        Total: {panelDataTotalValueFormatted}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        De {panelDataInitialDate} Até {panelDataFinalDate}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {description}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </>
  );
};

export { AuxiliarPanel };
