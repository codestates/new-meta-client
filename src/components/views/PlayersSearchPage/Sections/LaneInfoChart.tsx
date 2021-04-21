import React, { ReactElement } from "react";
import Chart from "react-apexcharts";
import { LaneInfo } from "../interface";
import iconJUNGLE from "../../../../assets/image/position/icon-jng.png";
import iconMID from "../../../../assets/image/position/icon-mid.png";
import iconTOP from "../../../../assets/image/position/icon-top.png";
import iconADC from "../../../../assets/image/position/icon-adc.png";
import iconSUPPORT from "../../../../assets/image/position/icon-spt.png";

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
      type: "pie",
    },

    options: {
      labels: ["TOP", "JUNGLE", "MID", "ADC", "SPT"],
      colors: ["#ffb822", "#249EFA", "#1dc9b7", "#fd397a", "#5578eb"],
      stroke: {
        show: false,
      },
      title: {
        style: {
          color: "#FFF",
          fontSize: "15px",
          align: "center",
        },
      },
      chart: {
        background: "transparent",
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            labels: {
              show: true,
              value: { color: "#FFF" },
              total: {
                show: false,
                label: "",
                // showAlways: true,
              },
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
          breakpoint: 150,
        },
      ],
    },
  };

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="donut"
        width={250}
        height={250}
      />
    </>
  );
}

export default LaneInfoChart;
