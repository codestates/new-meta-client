/* eslint-disable no-dupe-args */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  ReactComponentElement,
} from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import API from "../../../../api";
import { LeagueInfo, PlayerMatchInfo } from "../interface";

interface Props {
  userData: PlayerMatchInfo[];
  userName: string;
}
interface ChampionEl {
  id: string;
  key: string;
}

function HeatMapChart(props: Props): ReactElement {
  const { userData, userName } = props;
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
  }, []);

  function getChampionName(key: number): string {
    /* 챔피언 ID로 영문 이름 얻기  */
    let resultName = "";
    if (Champions.length > 0) {
      const result = Champions.filter((el: ChampionEl) => {
        return Number(el.key) === key;
      });
      resultName = result[0].id;
    }
    return resultName;
  }

  function getChampionKey(arr: PlayerMatchInfo[]): number[] {
    const Array: number[] = [];
    for (const el of arr) {
      if (!Array.includes(el.champion)) {
        Array.push(el.champion);
      }
    }

    return Array;
  }

  const ChampionKey = getChampionKey(userData);

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
            y: (
              (userData[10].stats.kills + userData[10].stats.assists) /
              userData[10].stats.deaths
            ).toFixed(2),
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
    ],

    options: {
      tooltip: {
        enabled: false,
        theme: "dark",
      },
      chart: {
        background: "transparent",
        toolbar: {
          show: false,
        },
        height: "600",
      },
      dataLabels: {
        enabled: true,
        style: {},
      },
      colors: ["#f86d7d", "#e2e4e9"],

      legend: {
        labels: {
          colors: "#f7f8fa",
          useSeriesColors: false,
          style: {
            align: "bottom",
          },
        },
      },
      responsive: [
        {
          breakpoint: 375,
          options: {},
        },
      ],

      plotOptions: {
        heatmap: {
          enableShade: false,
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
                color: "#E06161",
                name: "KDA 1.0 이하",
                foreColor: "#e2e4e9",
              },
              {
                from: 1,
                to: 3.0,
                color: "#E38585",
                name: "KDA 1.00 이상",
              },
              {
                from: 3.0,
                to: 4.0,
                color: "#21efdb",
                name: "KDA 3.0 이상",
              },
              {
                from: 4.0,
                to: 10,
                color: "#0ec7b5",
                name: "KDA 4.00 이상",
              },
              {
                from: 7,
                to: 20,
                color: "#00b6a4",
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
        width={400}
        height={300}
        className="heatmap"
      />
    </>
  );
}

export default HeatMapChart;
