/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import React, { ReactElement, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { FrameExpData, LaneInfo } from "../interface";

interface Props {
  User1data: FrameExpData[][];
  User1LaneInfo: LaneInfo;
  User1Name: string;
  User2data: FrameExpData[][];
  User2Name: string;
  User2LaneInfo: LaneInfo;
}

interface AverageExpData {
  timestamp: number;
  totalGold: number;
  jungleMinionsKilled: number;
  minionsKilled: number;
}
function DuoTimeLine(props: Props): ReactElement {
  const {
    User1data,
    User2data,
    User1Name,
    User2Name,
    User1LaneInfo,
    User2LaneInfo,
  } = props;

  useEffect(() => {
    return () => {};
  }, [User1data, User2data]);

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

  function getAverageExp(array: FrameExpData[][]) {
    const result: AverageExpData[] = [];

    for (let i = 0; i < 15; i++) {
      result[i] = {
        timestamp: 0,
        totalGold: 0,
        jungleMinionsKilled: 0,
        minionsKilled: 0,
      };
    }

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (result[j]) {
          result[j].timestamp = 60000 * (j + 1);
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
  const user1ExpData = getAverageExp(User1data);
  const user2ExpData = getAverageExp(User2data);
  console.log(user1ExpData);
  console.log(user2ExpData);
  const user1Main = getMainPosition(User1LaneInfo);
  const user2Main = getMainPosition(User2LaneInfo);

  /* 정글러- 라이너일 경우 : 데이터- 정글미니언, 미니언 */

  function getUserAvgData(array: AverageExpData[], object: LaneInfo) {
    const csArray: number[] = [];
    const mainPosition = getMainPosition(object);

    if (mainPosition === "JUNGLE") {
      for (const el of array) {
        csArray.push(el.jungleMinionsKilled);
      }
    } else {
      for (const el of array) {
        csArray.push(el.minionsKilled);
      }
    }
    return csArray;
  }

  const user1Result = getUserAvgData(user1ExpData, User1LaneInfo);
  const user2Result = getUserAvgData(user2ExpData, User2LaneInfo);

  /* 라이너 - 라이너일 경우 : 데이터- 미니언 */
  const graphData = {
    // colors: ["#FFF"],
    series: [
      {
        name: User1Name,
        data: [
          user1Result[2],
          user1Result[5],
          user1Result[8],
          user1Result[11],
          user1Result[14],
        ],
      },
      {
        name: User2Name,
        data: [
          user2Result[2],
          user2Result[5],
          user2Result[8],
          user2Result[11],
          user2Result[14],
        ],
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
      fontSize: "18px",

      labels: {
        colors: ["#FFF"],
      },
    },
    options: {
      tooltip: {
        theme: "dark",
      },
      chart: {
        height: 350,
        // type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },

      colors: ["#21efdb", "#f86d7d"],
      dataLabels: {
        enabled: true,
      },
      /* stroke: {
        curve: "smooth",
      }, */
      title: {
        text: "Average 15 Minutes Exp Timeline",
        style: {
          color: "#FFF",
          fontSize: "20px",
          fontFamily: "Noto Sans",
        },
      },
      grid: {
        borderColor: "#e7e7e7",
        /*  row: {
          colors: "#dDD", // takes an array which will be repeated on columns
          opacity: 0,
        }, */
      },
      markers: {
        size: 8,
      },
      xaxis: {
        categories: ["3m", "6m", "9m", "12m", "15m"],
        colors: ["#FFF"],
        title: {
          text: "Timeline",
          style: {
            color: "#FFF",
            fontSize: "15px",
          },
        },
      },
      yaxis: {
        min: 5,
        max: 110,
      },

      responsive: [
        {
          breakpoint: 300,
        },
      ],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={graphData.options}
        series={graphData.series}
        type="line"
        width={800}
      />
    </div>
  );
}

export default DuoTimeLine;
