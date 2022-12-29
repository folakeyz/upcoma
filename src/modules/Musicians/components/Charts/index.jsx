import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Chart = ({ analytics = [] }) => {
  const al = analytics.map((x) => x.song.name);
  console.log(al, "names");
  console.log(analytics, "n");
  let dataAxis = analytics.map((x) => x.song.name);
  let data = analytics.map((x) => x.stream);
  const option = {
    title: {
      text: "Total Song Stream This Month",
      subtext: "This chart shows the total streams of your songs this month",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    // dataZoom: [
    //   {
    //     type: "inside",
    //   },
    // ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };
  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default Chart;
