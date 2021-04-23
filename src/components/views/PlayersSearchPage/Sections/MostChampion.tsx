/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { ReactElement, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import API from "../../../../api";
import { PlayerMatchInfo } from "../interface";
// const squareImg =
//   "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/{getChampionName(key)}.png";

interface Props {
  userData: PlayerMatchInfo[];
  idx: number;
}
interface ChampionEl {
  id: string;
  key: string;
}

interface ChampionStat {
  champion: number;
  wins: number;
  losses: number;
}

function MostChampion(props: Props): ReactElement {
  const { userData, idx } = props;

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
  const resultArray: ChampionStat[] = [];

  function getChampionStatArray() {
    for (let i = 0; i < ChampionKey.length; i++) {
      resultArray.push({
        champion: 0,
        wins: 0,
        losses: 0,
      });
    }

    for (let i = 0; i < ChampionKey.length; i++) {
      resultArray[i].champion = ChampionKey[i];
    }
    return resultArray;
  }
  const ChampionStatArray = getChampionStatArray();

  for (const el of userData) {
    if (el.stats.win) {
      ChampionStatArray.filter((ele) => {
        return ele.champion === el.champion;
      })[0].wins += 1;
    }
    ChampionStatArray.filter((ele) => {
      return ele.champion === el.champion;
    })[0].losses += 1;
  }

  ChampionStatArray.sort((a, b) => {
    return a.wins + a.losses > b.wins + b.losses ? -1 : 1;
  });

  const champImgURL = `https://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/${getChampionName(
    ChampionStatArray[idx].champion
  )}.png`;
  const matches = ChampionStatArray[idx].wins + ChampionStatArray[idx].losses;
  const rate = ((ChampionStatArray[idx].wins / matches) * 100).toFixed(0);

  return (
    <div className="mostChamp">
      <img
        src={champImgURL}
        width="49"
        height="49"
        alt=""
        className="mostChamp-img"
      />
      <div className="rate-detail">
        <div className="champ-win-lose">
          <div className="all">{matches}전</div>{" "}
          <span className="win"> {ChampionStatArray[idx].wins}</span>승{" "}
          <span className="lose">{ChampionStatArray[idx].losses}</span>패
        </div>
        <div className="champ-rate">
          <span className="champ-rate-num">{rate}</span>%
        </div>
      </div>
    </div>
  );
}

export default MostChampion;
