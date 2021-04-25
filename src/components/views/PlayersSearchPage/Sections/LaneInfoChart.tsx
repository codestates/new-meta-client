/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { LaneInfo } from "../interface";

interface Props {
  userData: LaneInfo;
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
      type: "donut",
    },

    options: {
      labels: ["TOP", "JUNGLE", "MID", "ADC", "SPT"],
      colors: ["#ffb822", "#249EFA", "#1dc9b7", "#fd397a", "#5578eb"],
      stroke: {
        show: false,
      },
      title: {
        text: "",
      },

      chart: {
        background: "transparent",
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "15px",
          fontColor: "black",
          fontFamily: "Noto-Sans KR",
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: "200px",
              height: "200px",
              type: "donut",
            },
          },
        },
        {
          breakpoint: 375,
          options: {
            chart: {
              width: "90px",
              height: "90px",
              type: "donut",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="donut"
        height={250}
        className="LaneInfo-chart"
      />
    </>
  );
}

export default LaneInfoChart;
