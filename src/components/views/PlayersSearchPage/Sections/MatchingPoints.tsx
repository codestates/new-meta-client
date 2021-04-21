/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { resultKeyNameFromField } from "@apollo/client/utilities";
import React, { ReactElement, useState, useEffect } from "react";
import { SummonerAllData } from "../interface";

interface Props {
  User1data: SummonerAllData;

  User2data: SummonerAllData;
}

function MatchingPoints(props: Props): ReactElement {
  const { User1data, User2data } = props;
  const [ResultPoint, setResultPoint] = useState(0);

  const findPosition = (data: SummonerAllData) => {
    let result = "";
    if (data.laneInfo) {
      let max = 0;
      const array = [
        {
          position: "TOP",
          count: data.laneInfo.TOP,
        },
        {
          position: "JUNGLE",
          count: data.laneInfo.JUNGLE,
        },
        {
          position: "MID",
          count: data.laneInfo.MID,
        },
        {
          position: "AD_CARRY",
          count: data.laneInfo.AD_CARRY,
        },
        {
          position: "SUPPORT",
          count: data.laneInfo.SUPPORT,
        },
      ];
      result = array.reduce((acc: string, a) => {
        if (a.count > max) {
          acc = a.position;
          max = a.count;
        }
        return acc;
      }, "");
    }
    return result;
  };

  const getSummonerPoints = (data: SummonerAllData): number => {
    let resultPoint = 0;

    if (findPosition(data) === "JUNGLE") {
      let gankingPositive = 0; // 6게임 이상 시 3점
      let gankingPassive = 0; // 6게임 이상 시 2점
      let gankingNegative = 0; // 6게임 이상 시 1점
      let prefer3LevGank = 0; // 6게임 이상 시 1점
      let prefer2LevGank = 0; // 6게임 이상 시 1점
      for (const el of data.kdaTimelineData!) {
        if (el.matchAssists + el.matchKills > 5) {
          gankingPositive += 1;
        }
        if (el.matchKills + el.matchAssists < 4) {
          gankingPassive += 1;
        }
        if (el.matchKills + el.matchAssists < 2) {
          gankingNegative += 1;
        }
        if (el.matchAssistForLevel3 + el.matchKillForLevel3 > 0) {
          prefer3LevGank += 1;
        }
        if (el.matchAssistForLevel2 + el.matchKillForLevel2 > 0) {
          prefer2LevGank += 1;
        }
      }
      if (gankingPositive > 5) {
        resultPoint += 3;
      }
      if (gankingPassive > 5) {
        resultPoint += 2;
      }
      if (gankingNegative > 5) {
        resultPoint += 1;
      }
      if (prefer3LevGank > 5) {
        resultPoint += 1;
      }
      if (prefer2LevGank > 5) {
        resultPoint += 1;
      }
    } else {
      let laneStrong = 0; //
      let laneNormal = 0;
      let laneWeak = 0;
      let earlyStrong = 0; // 2+3렙 킬 어시스트가 4회 이상
      for (const el of data.kdaTimelineData!) {
        if (el.matchAssists + el.matchKills > 4) {
          laneStrong += 1;
        }
        if (el.matchKills + el.matchAssists + el.matchDeaths < 4) {
          laneNormal += 1;
        }
        if (el.matchDeaths > 2 && el.matchKills < 3 && el.matchAssists < 3) {
          laneWeak += 1;
        }
        if (
          el.matchAssistForLevel3 +
            el.matchKillForLevel3 +
            el.matchAssistForLevel2 +
            el.matchKillForLevel2 >
          0
        ) {
          earlyStrong += 1;
        }
      }
      if (laneStrong > 5) {
        resultPoint += 3;
      }
      if (laneNormal > 5) {
        resultPoint += 2;
      }
      if (laneWeak > 5) {
        resultPoint += 1;
      }
      if (earlyStrong > 5) {
        resultPoint += 1;
      }
    }
    return resultPoint;
  };

  const points = getSummonerPoints(User1data) + getSummonerPoints(User2data);
  let resultPoint = 0;

  if (points === 8) {
    resultPoint = 100;
  } else if (points === 7) {
    resultPoint = 92;
  } else if (points === 6) {
    resultPoint = 80;
  } else if (points === 5) {
    resultPoint = 72;
  } else if (points === 4) {
    resultPoint = 64;
  } else if (points === 3) {
    resultPoint = 52;
  }

  return (
    <div>
      <div className="match-success-name">
        {User1data.summonerInfo!.name}님과 {User2data.summonerInfo!.name}님의
        매칭 점수는
      </div>
      <div className="match-success-points">{resultPoint}점입니다.</div>
    </div>
  );
}

export default MatchingPoints;
