import React, { ReactElement } from "react";
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
      type: "pie",
    },

    options: {
      labels: ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"],
      colors: ["#ffb822", "#249EFA", "#1dc9b7", "#fd397a", "#5578eb"],
      stroke: {
        show: false,
      },
      chart: {
        background: "transparent",
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
      tooltip: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontColor: "black",
          fontFamily: "Noto-Sans KR",
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
        width={350}
        height={300}
      />
    </>
  );
}

export default LaneInfoChart;
