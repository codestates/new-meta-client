/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import React, { useState, useEffect, useRef, ReactElement } from "react";
import {
  LaneInfo,
  LeagueInfo,
  KDAEventData,
  PlayerMatchInfo,
} from "../interface";

interface Props {
  laneInfo: LaneInfo;
  leagueInfo: LeagueInfo;
  kdaInfo: KDAEventData[];
  recentChampionStats: PlayerMatchInfo[];
}

function TagComponent(props: Props): ReactElement {
  const { laneInfo, leagueInfo, kdaInfo, recentChampionStats } = props;

  /* 태그- 컴포넌트로 만들어야함 */
  const hotStreak = useRef<HTMLDivElement>(null);
  const lev2Strong = useRef<HTMLDivElement>(null);
  const lev3Strong = useRef<HTMLDivElement>(null);
  const lev2Weak = useRef<HTMLDivElement>(null);
  const lev3Weak = useRef<HTMLDivElement>(null);
  const carryMachine = useRef<HTMLDivElement>(null);
  const heraldLover = useRef<HTMLDivElement>(null);
  const dragonKiller = useRef<HTMLDivElement>(null);
  const linePhaseStrong = useRef<HTMLDivElement>(null);
  const linePhaseWeak = useRef<HTMLDivElement>(null);
  const earlyStrong = useRef<HTMLDivElement>(null);
  const earlyWeak = useRef<HTMLDivElement>(null);

  /* 연승중 */
  function streakCount(array: PlayerMatchInfo[]) {
    let count = 0;
    for (const el of array) {
      if (el.stats.win) {
        count += 1;
      } else {
        break;
      }
    }
    return count;
  }

  if (hotStreak.current) {
    if (leagueInfo.hotStreak === true) {
      const streaks = streakCount(recentChampionStats);
      if (streaks > 2) {
        hotStreak.current.classList.add("active");
        hotStreak.current.textContent = `${streaks}연승 중`;
      }
    }
  }

  /* 승률 60% 이상일 경우 */

  if (carryMachine.current) {
    if (
      leagueInfo.wins / (leagueInfo.wins + leagueInfo.losses) > 0.55 &&
      leagueInfo.wins + leagueInfo.losses > 200
    ) {
      carryMachine.current.classList.add("active");
      carryMachine.current.textContent = "캐.리.머.신";
    }
  }
  /*  matchKillForLevel2 + matchAssistForLevel2 가 1이상인 경기가 10경기 이상인 경우  */

  if (lev2Strong.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchKillForLevel2 + el.matchAssistForLevel2 > 0) {
        count += 1;
      }
    }
    if (count > 5) {
      lev2Strong.current.classList.add("active");
      lev2Strong.current.textContent = "2렙 싸움꾼";
    }
  }
  /*  matchKillForLevel3 + matchAssistForLevel3 가 1이상인 경기가 5경기 이상인 경우  */
  if (lev3Strong.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchKillForLevel3 + el.matchAssistForLevel3 > 0) {
        count += 1;
      }
    }
    if (count > 5) {
      lev3Strong.current.classList.add("active");
      lev3Strong.current.textContent = "3렙 싸움꾼";
      console.log("3렙 싸움꾼");
    }
  }

  /* "matchHeraldKills": 1이 5번 이상 나온 경우  => 전령 매니아 */

  if (heraldLover.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchHeraldKills > 0) {
        count += 1;
      }
    }
    if (count > 5) {
      heraldLover.current.classList.add("active");
      heraldLover.current.textContent = "전령은 잘 챙기는 편이야";
      console.log("전령은 잘 챙기는 편이야", count);
    }
  }

  if (dragonKiller.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDragonKills > 0) {
        count += 1;
      }
    }
    if (count > 5) {
      dragonKiller.current.classList.add("active");
      dragonKiller.current.textContent = "용은 잘 챙기는 편이야";
      // dragonKiller.current.attributes.add("data-tag");
    }
  }

  if (lev2Weak.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 5) {
      lev2Weak.current.classList.add("active");
      lev2Weak.current.textContent = "2렙에 약해요";
    }
  }

  if (lev3Weak.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 5) {
      lev3Weak.current.classList.add("active");
      lev3Weak.current.textContent = "2렙에 약해요";
    }
  }

  if (earlyStrong.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (
        el.matchKillForLevel2 +
          el.matchAssistForLevel2 +
          el.matchKillForLevel3 +
          el.matchAssistForLevel3 >
        0
      ) {
        count += 1;
      }
    }
    if (count > 9) {
      earlyStrong.current.classList.add("active");
      earlyStrong.current.textContent = "초반에 강해요";
    }
  }

  if (earlyWeak.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 8) {
      earlyWeak.current.classList.add("active");
      earlyWeak.current.textContent = "초반에 약해요";
    }
  }

  if (linePhaseStrong.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 5) {
      linePhaseStrong.current.classList.add("active");
      linePhaseStrong.current.textContent = "라인전 강해요";
    }
  }

  if (linePhaseWeak.current) {
    let count = 0;
    for (const el of kdaInfo) {
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 5) {
      linePhaseWeak.current.classList.add("active");
      linePhaseWeak.current.textContent = "라인전 약해요";
    }
  }

  return (
    <>
      <div
        className="tag"
        ref={hotStreak}
        data-ballon="기분 좋게 연승중!"
      ></div>
      <div
        className="tag"
        ref={lev2Strong}
        data-ballon="2렙 싸움은 못 참지!"
      ></div>
      <div
        className="tag"
        ref={lev3Strong}
        data-ballon="최근 20전 기준 6번 이상 3렙 단계에서 킬관여를 했어요!"
      ></div>
      <div
        className="tag"
        ref={carryMachine}
        data-ballon="200전 이상 게임하는 동안 승률 55%를 유지하고 있어요!"
      ></div>
      <div
        className="tag"
        ref={heraldLover}
        data-ballon="최근 20전 기준 6번 이상 첫 전령을 챙겼어요!"
      ></div>
      <div
        className="tag"
        ref={dragonKiller}
        data-ballon="최근 20전 기준 6번 이상 라인전 단계에서 첫 드래곤을 챙겼어요!"
      ></div>
      <div className="tag" ref={lev2Weak} data-ballon="2렙갱에 약해요!"></div>
      <div className="tag" ref={lev3Weak} data-ballon="3렙갱에 약해요!"></div>
      <div
        className="tag"
        ref={earlyStrong}
        data-ballon="3렙까지 킬관여 확률 50% 이상!(20전 기준)"
      ></div>
      <div
        className="tag"
        ref={earlyWeak}
        data-ballon="3렙까지 죽을 확률 45% 이상(20전 기준)"
      ></div>
      <div
        className="tag"
        ref={linePhaseStrong}
        data-ballon="라인전 강함"
      ></div>
      <div className="tag" ref={linePhaseWeak} data-ballon="라인전 약함"></div>
    </>
  );
}

export default TagComponent;
