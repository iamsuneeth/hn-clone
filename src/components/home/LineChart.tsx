/** @jsx jsx */
import { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { max } from "d3-array";
import { line as d3Line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";

interface Props {
  data: { id: string; votes: number }[];
}

const margin = 40;

const defaultColors = {
  guide: "#ccc",
  domain: "#555",
  line: "#2196f3",
};

const chartStyles = css`
  .tick {
    text {
      fill: ${colors.textColor};
    }
  }

  .y-axis {
    .tick {
      line {
        stroke: ${defaultColors.guide};
      }
      &:last-child {
        line {
          stroke: none;
        }
      }
      &:first-of-type {
        line {
          stroke: ${defaultColors.domain};
        }
      }
    }
    .domain {
      stroke: ${defaultColors.domain};
    }
  }
`;

export const LineChart = ({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const {
      height: wHeight,
      width: wWidth,
    } = svgRef.current!.getBoundingClientRect();
    const height = wHeight - 2 * margin;
    const width = wWidth - 2 * margin;
    const svg = select(svgRef.current);

    const eql = Math.ceil(width / data.length);
    const x = scaleOrdinal(data.map((_, index) => margin + 10 + index * eql)),
      y = scaleLinear().rangeRound([height, margin]);

    const line = d3Line<{ id: string; votes: number }>()
      .x((d) => x(d.id) as number)
      .y((d) => y(d.votes));

    x.domain(
      data.map(function (d) {
        return d.id;
      })
    );

    y.domain([
      0,
      max(data, function (d) {
        return d.votes;
      }),
    ] as any);

    const xAxis = axisBottom(x);
    const yAxis = axisLeft(y);

    const xAxisRender = svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis as any);

    xAxisRender.selectAll(".tick line").attr("stroke", "transparent");
    xAxisRender
      .selectAll(".tick text")
      .attr("y", 0)
      .attr("x", -10)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end");

    svg
      .select(".y-axis")
      .style("transform", `translateX(${margin}px)`)
      .call(yAxis.tickSize(-width) as any);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => line(value))
      .attr("fill", "none")
      .attr("stroke", defaultColors.line);

    svg
      .selectAll(".data-circle")
      .data(data)
      .join("circle")
      .attr("r", 5)
      .attr("class", "data-circle")
      .attr("cx", (value) => x(value.id) as any)
      .attr("cy", (value) => y(value.votes))
      .attr("fill", defaultColors.line);
  }, [data]);

  return (
    <svg ref={svgRef} width="100%" height="400px" css={chartStyles}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};
