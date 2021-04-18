/* eslint-disable no-plusplus */
import React, { ReactElement, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import API from "../../../../api";

interface Props {
  userData: FrameExpData[][];
}

interface FrameExpData {
  timestamp: number;
  participantFrames: ParticipantFrames;
}
interface ParticipantFrames {
  [index: string]: any;
  participantId: number;
  position: {
    x: number;
    y: number;
  };
  currentGold: number;
  totalGold: number;
  level: number;
  xp: number;
  minionsKilled: number;
  jungleMinionsKilled: number;
  dominionScore: number;
  teamScore: number;
}

/* interface ChampionEl {
  key: string;
  id: string;
} */

interface AverageExpData {
  timestamp: number;
  currentGold: number;
  totalGold: number;
  jungleMinionsKilled: number;
  minionsKilled: number;
}

function TimelineChart(props: Props): ReactElement {
  const { userData } = props;
  const [Champions, setChampions] = useState<any>([]);

  useEffect(() => {
    const cache = sessionStorage.getItem("Champions");
    const run = async () => {
      const result = await axios.get(API.allChampionInfo);
      sessionStorage.setItem(
        "Champions",
        JSON.stringify(Object.values(result.data.data))
      );
      setChampions(Object.values(result.data.data));
    };
    if (!cache) {
      run();
    } else {
      setChampions(JSON.parse(cache));
    }
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  function getAverageExp(array: FrameExpData[][]) {
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
      for (let j = 0; j < 15; j++) {
        if (result[j]) {
          result[j].timestamp = 60000 * (j + 1);
          result[j].currentGold += Math.round(
            array[i][j].participantFrames.currentGold / 20
          );
          result[j].totalGold += Math.round(
            array[i][j].participantFrames.totalGold / 20
          );
          result[j].minionsKilled += Math.round(
            array[i][j].participantFrames.minionsKilled / 20
          );
          result[j].jungleMinionsKilled += Math.round(
            array[i][j].participantFrames.jungleMinionsKilled / 20
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
  const AvgData = getAverageExp(userData);

  /*  const getChampionName(key: number):string => {
    Champions.filter((el:ChampionEl) => {
      return Number(el.key) === key
    })
    return Champions[0].id
  } */

  const data = {
    series: [
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
    ],
    options: {
      chart: {
        height: 350,
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
      title: {
        text: "15 Minutes Exp",
        style: {
          color: "#FFF",
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: ["3m", "6m", "9m", "12m", "15m"],
      xaxis: {
        // type: "datetime",
      },
      yaxis: [
        {
          title: {
            text: "Total Gold",
            style: {
              color: "#FFF",
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
          height={350}
        />
      </div>
    </>
  );
}

export default TimelineChart;
