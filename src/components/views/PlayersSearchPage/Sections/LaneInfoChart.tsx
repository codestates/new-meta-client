import React, { ReactElement, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import Chart from "react-apexcharts";

interface Props {
  userData: LaneInfo;
}
interface LaneInfo {
  TOP: number;
  JUNGLE: number;
  MID: number;
  AD_CARRY: number;
  SUPPORT: number;
}

function LaneInfoChart(props: Props): ReactElement {
  const { userData } = props;

  const data = {
    series: [
      userData.TOP,
      userData.JUNGLE,
      userData.MID,
      userData.AD_CARRY,
      userData.SUPPORT,
    ],

    chart: {
      width: 200,
      height: 500,
      type: "pie",
    },

    options: {
      labels: ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"],
      colors: ["#0EC7B5", "#7044ed", "#00b6a4", "#21efdb", "#815de6"],
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          customScale: 0.88,
        },
      },
      legend: {
        labels: {
          colors: "#f7f8fa",
        },
      },

      responsive: [
        {
          breakpoint: 250,
        },
      ],
    },
  };

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="pie"
        width={400}
      />
    </>
  );
}

export default LaneInfoChart;
