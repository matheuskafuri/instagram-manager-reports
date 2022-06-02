import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Insights } from "../../../types/insights";
import Title from "../Title";

type AccumulatedChartProps = {
  data: Insights;
  title?: string;
};
const AccumulatedChart = ({ data, title }: AccumulatedChartProps) => {
  const theme = useTheme();

  let chartData: any[] = [];
  if (data.values) {
    data.values.forEach((item: any, index) => {
      chartData.push({
        time: item.end_time,
        amount: item.value + (index > 0 ? chartData[index - 1].amount : 0),
      });
    });
  }

  console.log(chartData);

  return (
    <>
      <Title>{title ? title : data.title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
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
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export { AccumulatedChart };
