/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import React, { useState, useEffect, useRef, ReactElement } from "react";

interface Props {
  laneInfo: LaneInfo;
  leagueInfo: LeagueInfo;
  kdaInfo: KDAEventData[];
}

interface LeagueInfo {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface LaneInfo {
  TOP: number;
  JUNGLE: number;
  MID: number;
  AD_CARRY: number;
  SUPPORT: number;
}

interface KDAEventData {
  matchKills: number;
  matchAssists: number;
  matchDeaths: number;
  matchDragonKills: number;
  matchHeraldKills: number;
  matchKillForLevel3: number;
  matchAssistForLevel3: number;
  matchDeathForLevel3: number;
  matchKillForLevel2: number;
  matchAssistForLevel2: number;
  matchDeathForLevel2: number;
}

function TagComponent(props: Props): ReactElement {
  const { laneInfo, leagueInfo, kdaInfo } = props;
  /* const [position, setPosition] = useState("");
  useEffect(() => {
    if (laneInfo) {
      let max = 0;
      const array = [
        {
          position: "TOP",
          count: laneInfo.TOP,
        },
        {
          position: "JUNGLE",
          count: laneInfo.JUNGLE,
        },
        {
          position: "MID",
          count: laneInfo.MID,
        },
        {
          position: "AD_CARRY",
          count: laneInfo.AD_CARRY,
        },
        {
          position: "SUPPORT",
          count: laneInfo.SUPPORT,
        },
      ];
      setPosition(
        array.reduce((acc: string, a) => {
          if (a.count > max) {
            acc = a.position;
            max = a.count;
          }
          return acc;
        }, "")
      );
    }
  }, [laneInfo]); */

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

  if (hotStreak.current) {
    if (leagueInfo.hotStreak) {
      hotStreak.current.classList.add("active");
      hotStreak.current.textContent = "연승 중";
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

  let deathCount = 0;
  for (const el of kdaInfo) {
    if (el.matchDeathForLevel3 > 0) {
      deathCount += 1;
    }
  }
  console.log(deathCount, "3렙 데스");

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
      if (el.matchDeathForLevel2 > 1) {
        count += 1;
      }
    }
    if (count > 5) {
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
    if (count > 5) {
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
        data-ballon="3렙 싸움은 못 참지!"
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
      <div className="tag" ref={earlyStrong} data-ballon="초반에 강함"></div>
      <div className="tag" ref={earlyWeak} data-ballon="초반에 약함"></div>
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
