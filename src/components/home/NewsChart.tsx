import React from "react";
import { LineChart } from "./LineChart";
import { News } from "../pages/Home";

interface NewsChartProps {
  items: News[];
}

export const NewsChart = ({ items }: NewsChartProps) => {
  const chartData = items.map((item) => {
    return {
      id: item.objectID,
      votes: item.points,
    };
  });
  return <LineChart data={chartData} />;
};
