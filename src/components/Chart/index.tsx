import React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, Label } from "recharts";

import { Insights } from "../../types/insights";
import Title from "../Title";

type ChartProps = {
  data: Insights;
  title?: string;
};
const Chart = ({ data, title }: ChartProps) => {
  const theme = useTheme();

  let chartData: any[] = [];
  if (data.values) {
    data.values.forEach((item: any, index) => {
      chartData.push({
        time: item.end_time,
        amount: item.value,
      });
    });
  }
  return (
    <>
      <Title>{title ? title : data.title}</Title>
      <LineChart
        data={chartData}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
        height={300}
        width={600}
      >
        <XAxis
          dataKey="time"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: "middle",
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            {data.title}
          </Label>
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </LineChart>
    </>
  );
};

export { Chart };
