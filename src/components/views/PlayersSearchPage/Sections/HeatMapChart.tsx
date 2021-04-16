import React, { ReactElement, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

interface Props {
  userData: PlayerMatchInfo[];
}
interface PlayerMatchInfo {
  gameId: number;
  champion: number;
  stats: {
    participantId: number;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
  };
}

function HeatMapChart(props: Props): ReactElement {
  const { userData } = props;

  const data = {
    series: [
      {
        name: "",
        data: [
          {
            x: "",
            y: (
              (userData[0].stats.kills + userData[0].stats.assists) /
              userData[0].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[1].stats.kills + userData[1].stats.assists) /
              userData[1].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[2].stats.kills + userData[2].stats.assists) /
              userData[2].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[3].stats.kills + userData[3].stats.assists) /
              userData[3].stats.deaths
            ).toFixed(2),
          },
        ],
      },
      {
        name: "",
        data: [
          {
            x: "",
            y: (
              (userData[4].stats.kills + userData[4].stats.assists) /
              userData[4].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[5].stats.kills + userData[5].stats.assists) /
              userData[5].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[6].stats.kills + userData[6].stats.assists) /
              userData[6].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[7].stats.kills + userData[7].stats.assists) /
              userData[7].stats.deaths
            ).toFixed(2),
          },
        ],
      },
      {
        name: "",
        data: [
          {
            x: "",
            y: (
              (userData[8].stats.kills + userData[8].stats.assists) /
              userData[8].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[9].stats.kills + userData[9].stats.assists) /
              userData[9].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y:
              (userData[10].stats.kills + userData[10].stats.assists) /
              userData[10].stats.deaths,
          },
          {
            x: "",
            y: (
              (userData[11].stats.kills + userData[11].stats.assists) /
              userData[11].stats.deaths
            ).toFixed(2),
          },
        ],
      },
      {
        name: "",
        data: [
          {
            x: "",
            y: (
              (userData[12].stats.kills + userData[12].stats.assists) /
              userData[12].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[13].stats.kills + userData[13].stats.assists) /
              userData[13].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[14].stats.kills + userData[14].stats.assists) /
              userData[14].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[15].stats.kills + userData[15].stats.assists) /
              userData[15].stats.deaths
            ).toFixed(2),
          },
        ],
      },
      {
        name: "",
        data: [
          {
            x: "",
            y: (
              (userData[16].stats.kills + userData[16].stats.assists) /
              userData[16].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[17].stats.kills + userData[17].stats.assists) /
              userData[17].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[18].stats.kills + userData[18].stats.assists) /
              userData[18].stats.deaths
            ).toFixed(2),
          },
          {
            x: "",
            y: (
              (userData[19].stats.kills + userData[19].stats.assists) /
              0
            ).toFixed(2),
          },
        ],
      },
    ],
    options: {
      tooltip: { enabled: false },
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {},
      },
      colors: ["#f86d7d", "#e2e4e9"],
      title: {
        text: "KDA for 20 Matches",
        style: {
          fontSize: "14px",
          color: "#f7f8fa",
          align: "center",
        },
      },
      legend: {
        labels: {
          colors: "#f7f8fa",
          useSeriesColors: false,
        },
      },
      responsive: [
        {
          breakpoint: 250,
          options: {},
        },
      ],

      plotOptions: {
        heatmap: {
          max: Infinity,
          min: 0,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            radius: 5,
            ranges: [
              {
                from: 0,
                to: 1,
                color: "#5a5b62",
                name: "KDA 1.0 이하",
                foreColor: "#e2e4e9",
              },
              {
                from: 1,
                to: 3.0,
                color: "#21efdb",
                name: "KDA 1.00 이상",
              },
              {
                from: 3.0,
                to: 4.0,
                color: "#0ec7b5",
                name: "KDA 3.0 이상",
              },
              {
                from: 4.0,
                to: 10,
                color: "#7044ed",
                name: "KDA 4.00 이상",
              },
              {
                from: 7,
                to: 100,
                color: "#f86d7d",
                name: "KDA 7.00 이상",
              },
            ],
          },
        },
      },
    },
  };
  return (
    <>
      <Chart
        type="heatmap"
        options={data.options}
        series={data.series}
        height={250}
        width={350}
      />
    </>
  );
}

export default HeatMapChart;
