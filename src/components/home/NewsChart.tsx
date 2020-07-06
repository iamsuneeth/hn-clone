/** @jsx jsx */
import { LineChart } from "./LineChart";
import { News } from "../pages/Home";
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";

interface NewsChartProps {
  items: News[];
}

const newsChartStyle = css`
  background-color: ${colors.background};
`;

export const NewsChart = ({ items }: NewsChartProps) => {
  const chartData = items.map((item) => {
    return {
      label: item.objectID,
      value: item.points,
    };
  });
  return (
    <div css={newsChartStyle}>
      <LineChart data={chartData} xLabel="ID" yLabel="Votes" />
    </div>
  );
};
