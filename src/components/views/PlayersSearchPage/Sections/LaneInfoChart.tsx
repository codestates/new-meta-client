import React, { ReactElement } from "react";
import Chart from "react-apexcharts";
import iconJUNGLE from "../../../../assets/image/position/icon-jng.png";
import iconMID from "../../../../assets/image/position/icon-mid.png";
import iconTOP from "../../../../assets/image/position/icon-top.png";
import iconADC from "../../../../assets/image/position/icon-adc.png";
import iconSUPPORT from "../../../../assets/image/position/icon-spt.png";

interface Props {
  userData: LaneInfo;
  position: string;
}
interface LaneInfo {
  TOP: number;
  JUNGLE: number;
  MID: number;
  AD_CARRY: number;
  SUPPORT: number;
}

function LaneInfoChart(props: Props): ReactElement {
  const { userData, position } = props;
  console.log(position);

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
        text: "RankGame Position",

        style: {
          color: "#FFF",
          fontSize: "15px",
          align: "top",
        },
      },
      chart: {
        background: "transparent",
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            labels: {
              show: true,
              value: { color: "#FFF" },

              // custom: () => {
              //   return (
              //     "<div>" +
              //     '<img width="100" height="100" src={iconJUNGLE} alt="" />' +
              //     "</div>"
              //   );
              // },
            },
          },
        },
      },
      legend: {
        show: false,

        labels: {
          colors: "#f7f8fa",
        },
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
        width={300}
        height={300}
      />
    </>
  );
}

export default LaneInfoChart;
