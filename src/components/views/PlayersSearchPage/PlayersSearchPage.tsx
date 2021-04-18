/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  ReactComponentElement,
  ReactElement,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import lanerData from "./lanerData.json";
import junglerData from "./junglerData.json";
import LaneInfoChart from "./Sections/LaneInfoChart";
import HeatMapChart from "./Sections/HeatMapChart";
import TimelineChart from "./Sections/TimelineChart";
import WinRateChart from "./Sections/WinRateChart";
import TagComponent from "./Sections/TagComponent";
import API from "../../../api";

interface SummonerAllData {
  summonerInfo: {
    id: string;
    accountId: string;
    name: string;
  };
  leagueInfo?: LeagueInfo;
  laneInfo?: LaneInfo;
  recentMatches?: MatchInfo[];
  recentChampionStats?: PlayerMatchInfo[];
  kdaTimelineData?: KDAEventData[];
  expTimelineData?: FrameExpData[][];
}
interface MatchInfo {
  platformId: string;
  gameId: number;
  champion: number;
  queue: number;
  season: number;
  timestamp: number;
  role: string;
  lane: string;
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
interface FrameExpData {
  timestamp: number;
  participantFrames: ParticipantFrames;
}

interface ParticipantFrames {
  [index: string]: any;
  participantId: number;
  position: Position;
  currentGold: number;
  totalGold: number;
  level: number;
  xp: number;
  minionsKilled: number;
  jungleMinionsKilled: number;
  dominionScore: number;
  teamScore: number;
}

interface Position {
  x: number;
  y: number;
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

// let inputUser1: HTMLInputElement | null;
// let inputUser2: HTMLInputElement | null;

function PlayersSearchPage(): ReactElement {
  const [SearchType, setSearchType] = useState("solo");
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [user1MainPosition, setUser1MainPosition] = useState("");
  const [user2MainPosition, setUser2MainPosition] = useState("");

  useEffect(() => {
    if (User1data.laneInfo) {
      let max = 0;
      const array = [
        {
          position: "TOP",
          count: User1data.laneInfo.TOP,
        },
        {
          position: "JUNGLE",
          count: User1data.laneInfo.JUNGLE,
        },
        {
          position: "MID",
          count: User1data.laneInfo.MID,
        },
        {
          position: "AD_CARRY",
          count: User1data.laneInfo.AD_CARRY,
        },
        {
          position: "SUPPORT",
          count: User1data.laneInfo.SUPPORT,
        },
      ];
      setUser1MainPosition(
        array.reduce((acc: string, a) => {
          if (a.count > max) {
            acc = a.position;
            max = a.count;
          }
          return acc;
        }, "")
      );
      console.log("user1의 메인 포지션", user1MainPosition);
    }

    if (User2data.laneInfo) {
      let max = 0;
      const array = [
        {
          position: "TOP",
          count: User2data.laneInfo.TOP,
        },
        {
          position: "JUNGLE",
          count: User2data.laneInfo.JUNGLE,
        },
        {
          position: "MID",
          count: User2data.laneInfo.MID,
        },
        {
          position: "AD_CARRY",
          count: User2data.laneInfo.AD_CARRY,
        },
        {
          position: "SUPPORT",
          count: User2data.laneInfo.SUPPORT,
        },
      ];
      setUser2MainPosition(
        array.reduce((acc: string, a) => {
          if (a.count > max) {
            acc = a.position;
            max = a.count;
          }
          return acc;
        }, "")
      );
      console.log("user2의 메인 포지션", user2MainPosition);
    }
  }, []);

  /* 입력한 소환사의 메인 포지션 확인하기 */

  const [User1data, setUser1data] = useState<SummonerAllData>(
    // {
    // summonerInfo: {
    //   id: "",
    //   accountId: "",
    //   name: "",
    // },
    // }
    lanerData
  );
  const [User2data, setUser2data] = useState<SummonerAllData>(
    junglerData
  ); /* 타입 설정 어떻게 하는 지 */

  const onInputUserName1Handler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(e.target.value);
    setUserName1(e.target.value);
  };

  const onInputUserName2Handler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserName2(e.target.value);
  };

  const clickTabs = (type: string) => {
    setSearchType(type);
  };

  const clickSoloSearch = async () => {
    // if (inputUser1) {
    if (userName1) {
      console.log("검색시작", userName1);
      await axios
        .post(API.summonerInfo, {
          summonerName: encodeURI(userName1),
        })
        .then((res) => {
          console.log("실행했다!");
          setUser1data(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("소환사명을 입력하지 않으셨어요!");
    }
  };

  const clickDuoSearch = async () => {
    if (userName1 && userName2) {
      console.log("@@@@@@@");
      if (userName1 === userName2) {
        console.log("동일한 소환사명을 입력하실 수 없어요!");
      } else {
        console.log("실행했니?");
        await axios
          .post(API.summonerInfo, { summonerName: userName1 })
          .then((res) => {
            console.log(res.data);
            setUser1data(res.data);
            console.log("실행했다?");
          });

        await axios
          .post(API.summonerInfo, { summonerName: userName2 })
          .then((res) => {
            console.log(res.data);
            setUser2data(res.data);
            console.log("실행했다?");
          });
      }
      if (!userName1 || !userName2) {
        console.log("소환사명을 입력해주세요");
      }
    }
  };

  return (
    <>
      <div className="players-search-page">
        <div className="players-search-bar">
          <div className="tabs">
            <button
              onClick={() => {
                clickTabs("solo");
              }}
              aria-hidden
              className="tab solo-tab active"
              type="button"
            >
              SOLO
            </button>
            <button
              onClick={() => {
                clickTabs("duo");
              }}
              aria-hidden
              type="button"
              className="tab duo-tab"
            >
              DUO
            </button>
          </div>
          {SearchType === "solo" ? (
            <div className="match-search-bar solo-wrap">
              <input
                onChange={onInputUserName1Handler}
                className="players-input"
                type="text"
              ></input>
              <button
                type="button"
                onClick={() => {
                  clickSoloSearch();
                }}
                className="search-btn"
              >
                Search
              </button>
            </div>
          ) : (
            <div className="match-search-bar duo-wrap">
              <input
                onChange={onInputUserName1Handler}
                className="players-input"
                type="text"
              ></input>
              <button
                type="button"
                className="search-btn"
                onClick={clickDuoSearch}
              >
                Search
              </button>
              <input
                onChange={onInputUserName2Handler}
                className="players-input"
                type="text"
              ></input>
            </div>
          )}
        </div>
        <div className="user-data-view">
          {User1data.summonerInfo.accountId &&
          !User2data.summonerInfo.accountId ? (
            <>
              <div className="summonerInfo">
                <div className="summoner-name">
                  <div>{User1data.leagueInfo!.summonerName}</div>
                </div>

                <div className="summoner-lank-info">
                  <div className="summoner-tier">
                    {User1data.leagueInfo!.tier} {User1data.leagueInfo!.rank}
                  </div>
                  <div className="summoner-tier">
                    {User1data.leagueInfo!.leaguePoints} LP
                  </div>
                </div>
                <div className="summoner-tags">
                  <TagComponent
                    laneInfo={User1data.laneInfo!}
                    leagueInfo={User1data.leagueInfo!}
                    kdaInfo={User1data.kdaTimelineData!}
                  />
                </div>
              </div>
              <div className="summoner-graph">
                <div className="graph-section">
                  <div className="graph">
                    <WinRateChart userData={User1data.leagueInfo!} />
                  </div>
                  <div className="graph">
                    <LaneInfoChart userData={User1data.laneInfo!} />
                  </div>
                </div>

                <div className="graph-section">
                  <div className="graph">
                    <TimelineChart userData={User1data.expTimelineData!} />
                  </div>
                  <div className="graph">
                    <HeatMapChart userData={User1data.recentChampionStats!} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="duo-search-result">
              {User2data.summonerInfo.accountId ? (
                <div className="duo-match-thumbnail">
                  <div className="match-success-point">
                    {User1data.summonerInfo.name}님과{" "}
                    {User2data.summonerInfo.name}님의 매칭 점수는 88점입니다.
                  </div>
                  <div className="two-summoner-info">
                    <div className="summonerInfo">
                      <div className="summoner-name">
                        <div>{User1data.leagueInfo!.summonerName}</div>
                      </div>
                      <div className="summoner-lank-info">
                        <div className="summoner-tier">
                          {User1data.leagueInfo!.tier}{" "}
                          {User1data.leagueInfo!.rank}
                        </div>
                        <div className="summoner-tier">
                          {User1data.leagueInfo!.leaguePoints} LP
                        </div>
                        <div className="summoner-tags">
                          <TagComponent
                            laneInfo={User1data.laneInfo!}
                            leagueInfo={User1data.leagueInfo!}
                            kdaInfo={User1data.kdaTimelineData!}
                          />
                        </div>
                        <div className="summoner-graph">
                          <div className="graph-section">
                            <div className="graph">
                              <WinRateChart userData={User1data.leagueInfo!} />
                            </div>
                            <div className="graph">
                              <LaneInfoChart userData={User1data.laneInfo!} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="summonerInfo">
                      <div className="summoner-name">
                        <div>{User2data.leagueInfo!.summonerName}</div>
                      </div>
                      <div className="summoner-lank-info">
                        <div className="summoner-tier">
                          {User2data.leagueInfo!.tier}
                          {User2data.leagueInfo!.rank}
                        </div>
                        <div className="summoner-tier">
                          {User2data.leagueInfo!.leaguePoints} LP
                        </div>
                        <div className="summoner-tags">
                          <TagComponent
                            laneInfo={User2data.laneInfo!}
                            leagueInfo={User2data.leagueInfo!}
                            kdaInfo={User2data.kdaTimelineData!}
                          />
                        </div>
                        <div className="summoner-graph">
                          <div className="graph-section">
                            <div className="graph">
                              <WinRateChart userData={User2data.leagueInfo!} />
                            </div>
                            <div className="graph">
                              <LaneInfoChart userData={User2data.laneInfo!} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>검색 안한 초기상태</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withRouter(PlayersSearchPage);
