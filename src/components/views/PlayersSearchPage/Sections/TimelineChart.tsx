/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import React, { ReactElement, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import API from "../../../../api";
import { LaneInfo, FrameExpData, ParticipantFrames } from "../interface";

interface Props {
  userData: FrameExpData[][];
  userPosition: LaneInfo;
}
interface AverageExpData {
  timestamp: number;
  currentGold: number;
  totalGold: number;
  jungleMinionsKilled: number;
  minionsKilled: number;
}

function TimelineChart(props: Props): ReactElement {
  const { userData, userPosition } = props;

  function getMainPosition(object: LaneInfo): string {
    const max = Object.values(object).reduce((acc, cur) => {
      return acc > cur ? acc : cur;
    });

    const array = ["TOP", "JUNGLE", "MID", "AD_CARRY", "SUPPORT"];
    let mainPosition = "";
    for (const el of array) {
      if (object[el] === max) {
        mainPosition = el;
      }
    }
    return mainPosition;
  }

  const MainPosition = getMainPosition(userPosition);

  function getLanerAverageExp(array: FrameExpData[][]) {
    const result: AverageExpData[] = [];

    for (let i = 0; i < 15; i++) {
      result[i] = {
        timestamp: 0,
        currentGold: 0,
        totalGold: 0,
        jungleMinionsKilled: 0,
        minionsKilled: 0,
      };
    }

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (result[j]) {
          result[j].timestamp = 60000 * (j + 1);
          result[j].currentGold += Math.round(
            array[i][j].participantFrames.currentGold / array.length
          );
          result[j].totalGold += Math.round(
            array[i][j].participantFrames.totalGold / array.length
          );
          result[j].minionsKilled += Math.round(
            array[i][j].participantFrames.minionsKilled / array.length
          );
          result[j].jungleMinionsKilled += Math.round(
            array[i][j].participantFrames.jungleMinionsKilled / array.length
          );
        } else {
          result[j] = {
            timestamp: 60000 * (j + 1),
            currentGold: array[0][0].participantFrames.currentGold,
            totalGold: array[0][0].participantFrames.totalGold,
            minionsKilled: array[0][0].participantFrames.minionsKilled,
            jungleMinionsKilled:
              array[0][0].participantFrames.jungleMinionsKilled,
          };
        }
      }
    }
    return result;
  }

  const AvgData = getLanerAverageExp(userData);
  let timelineData = [];
  if (MainPosition === "JUNGLE") {
    timelineData = [
      {
        name: "Total Gold",
        type: "column",
        data: [
          AvgData[2].totalGold,
          AvgData[5].totalGold,
          AvgData[8].totalGold,
          AvgData[11].totalGold,
          AvgData[14].totalGold,
        ],
      },
      {
        name: "Total CS",
        type: "line",
        data: [
          AvgData[2].jungleMinionsKilled,
          AvgData[5].jungleMinionsKilled,
          AvgData[8].jungleMinionsKilled,
          AvgData[11].jungleMinionsKilled,
          AvgData[14].jungleMinionsKilled,
        ],
      },
    ];
  } else {
    timelineData = [
      {
        name: "Total Gold",
        type: "column",
        data: [
          AvgData[2].totalGold,
          AvgData[5].totalGold,
          AvgData[8].totalGold,
          AvgData[11].totalGold,
          AvgData[14].totalGold,
        ],
      },
      {
        name: "Total CS",
        type: "line",
        data: [
          AvgData[2].minionsKilled,
          AvgData[5].minionsKilled,
          AvgData[8].minionsKilled,
          AvgData[11].minionsKilled,
          AvgData[14].minionsKilled,
        ],
      },
    ];
  }

  const data = {
    series: timelineData,

    options: {
      responsive: [
        {
          breakpoint: 550,
          options: {
            chart: {
              width: "300px",
              height: "200px",
              type: "bar",
            },
            grid: {
              show: false,
              offsetX: -25,
              offsetY: -5,
            },
            yaxis: [
              { show: true, labels: { show: false } },
              {
                show: true,
                opposite: true,
                labels: { show: false },
              },
            ],
          },
        },
      ],
      colors: ["#815de6", "#00b6a4"],
      tooltip: {
        theme: "dark",
      },
      chart: {
        height: 300,
        // type: "line",
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      legend: {
        labels: {
          colors: "#FFF",
          useSeriesColors: false,
        },
      },
      stroke: {
        width: [0, 4],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: ["3m", "6m", "9m", "12m", "15m"],

      xaxis: {
        labels: {
          style: {
            colors: "#FFF",
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "Total Gold",
            style: {
              color: "#FFF",
            },
          },
          min: 500,
          max: 8000,
          labels: {
            style: {
              colors: "#FFF",
            },
          },
        },

        {
          opposite: true,
          title: {
            text: "Total CS",
            color: "#FFF",
            style: {
              color: "#FFF",
            },
          },
          labels: {
            style: {
              colors: "#FFF",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="line"
          width={500}
          className="timeline-chart"
        />
      </div>
    </>
  );
}

export default TimelineChart;
