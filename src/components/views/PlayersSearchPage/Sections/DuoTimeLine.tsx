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
        type: "line",
        name: `${User2Name}'s Minions Killed`,
        data: [
          user2Result[2],
          user2Result[5],
          user2Result[8],
          user2Result[11],
          user2Result[14],
        ],
      },
      {
        type: "column",
        name: `${User2Name}'s Total Gold`,
        data: [
          user2ExpData[2].totalGold,
          user2ExpData[5].totalGold,
          user2ExpData[8].totalGold,
          user2ExpData[11].totalGold,
          user2ExpData[14].totalGold,
        ],
      },
      {
        type: "line",
        name: `${User1Name}'s Minions Killed`,
        data: [
          user1Result[2],
          user1Result[5],
          user1Result[8],
          user1Result[11],
          user1Result[14],
        ],
      },

      {
        type: "column",
        name: `${User1Name}'s Total Gold`,
        data: [
          user1ExpData[2].totalGold,
          user1ExpData[5].totalGold,
          user1ExpData[8].totalGold,
          user1ExpData[11].totalGold,
          user1ExpData[14].totalGold,
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
      fontColor: "#FFF",
      show: false,
      labels: {
        colors: ["#FFF"],
      },
    },
    options: {
      tooltip: {
        theme: "dark",
      },
      legend: {
        show: true,
        fontSize: "14px",
        fontFamily: "Noto Sans KR",
        fontWeight: "300",
        labels: { colors: "#FFF" },
      },
      chart: {
        height: 350,
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

      colors: ["#00b6a4", "#00b6a4", "#7044ed", "#7044ed"],
      dataLabels: {
        enabled: true,
        fontSize: "15px",
        fontFamily: "Noto Sans KR",
        enabledOnSeries: [0, 2],
      },

      /* stroke: {
        curve: "smooth",
      }, */
      title: {
        text: "Average 15 Minutes' CS Exp & Total Gold for 20 Matches",
        style: {
          color: "#FFF",
          fontSize: "20px",
          fontFamily: "Noto Sans",
          fontWeight: "300",
        },
      },
      grid: {
        borderColor: "#e7e7e7",
      },
      markers: {
        size: 8,
      },
      xaxis: {
        categories: ["3m", "6m", "9m", "12m", "15m"],

        title: {
          text: "Timeline",
          style: {
            color: "#FFF",
            fontSize: "15px",
          },
          labels: {
            style: {
              colors: "#FFF",
            },
          },
        },
      },
      yaxis: [
        {
          show: true,
          seriesName: "Minions / Jungle Minions",
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#FFF",
            },
          },
          max: 110,

          title: {
            text: "Minions / Jungle Minions",
            style: {
              color: "#FFF",
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        {
          seriesName: "Total Gold",
          opposite: true,
          show: true,

          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#FFF",
            },
          },
          max: 8000,

          title: {
            text: "Total Gold",
            style: {
              color: "#FFF",
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      ],

      responsive: [
        {
          breakpoint: 300,
        },
      ],
    },
  };

  return (
    <>
      <ReactApexChart
        options={graphData.options}
        series={graphData.series}
        type="line"
        width={800}
        height={500}
        className="duoTimeline"
      />
    </>
  );
}

export default DuoTimeLine;
