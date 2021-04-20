/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import API from "../../../../api";
// const squareImg =
//   "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/{getChampionName(key)}.png";

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
  }, []);

  function getChampionName(key: number) {
    /* 챔피언 ID로 영문 이름 얻기  */
    const champion = Champions.filter((el: ChampionEl) => {
      return Number(el.key) === key;
    });
    return champion[0].id;
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

  // for (const el of userData) {
  //   if (el.stats.win) {
  //   }
  // }

  return (
    <div>
      <img
        src="http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Aatrox.png"
        alt=""
        width="49"
      />
      <img
        src="http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Yuumi.png"
        alt=""
        width="49"
      />
      <img
        src="http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Bard.png"
        alt=""
        width="49"
      />
    </div>
  );
}

export default MostChampion;
