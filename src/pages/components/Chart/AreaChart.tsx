import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

import { Insights } from "../../../types/insights";
import Title from "../Title";

type AreaModelChartProps = {
  data: Insights;
  title?: string;
};
const AreaModelChart = ({ data, title }: AreaModelChartProps) => {
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
      <AreaChart
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          stroke={theme.palette.text.primary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.primary}
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
        <Tooltip />
        <Area
          isAnimationActive={true}
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </AreaChart>
    </>
  );
};

export { AreaModelChart };
