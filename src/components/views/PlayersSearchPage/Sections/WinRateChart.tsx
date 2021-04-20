import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  ReactComponentElement,
} from "react";
import Chart from "react-apexcharts";

interface Props {
  userData: LeagueInfo;
}
interface LeagueInfo {
  leagueId?: string;
  queueType?: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran?: boolean;
  inactive?: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

function WinRateChart(props: Props): ReactElement {
  const { userData } = props;
  const winRate = (
    (userData.wins / (userData.wins + userData.losses)) *
    100
  ).toFixed(2);

  const data = {
    series: [winRate],
    type: "radialBar",
    height: 250,
    width: 250,

    options: {
      colors: ["#0ec7b5"],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              offsetY: 30,
              color: "#e2e4e9",
              align: "center",
              formatter() {
                const matchcounts = userData.wins + userData.losses;
                return `${matchcounts} matches`;
              },
              fontSize: "13px",
            },
            value: {
              color: "#e2e4e9",
              offsetY: -15,
              fontSize: "22px",
            },
          },
        },
      },
    },
  };

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        width={250}
        height={250}
      />
    </>
  );
}

export default WinRateChart;
