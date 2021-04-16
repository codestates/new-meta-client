/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  ReactComponentElement,
  ReactElement,
  RefObject,
  useRef,
  useState,
} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import tempData from "./tempData.json";
import LaneInfoChart from "./Sections/LaneInfoChart";
import HeatMapChart from "./Sections/HeatMapChart";
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

function PlayersSearchPage(): ReactElement {
  const [SearchType, setSearchType] = useState("solo");

  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [User1data, setUser1data] = useState<SummonerAllData>(
    /*  {
    summonerInfo: {
      id: "",
      accountId: "",
      name: "",
    },
  } */ tempData
  );
  const [User2data, setUser2data] = useState<SummonerAllData>({
    summonerInfo: {
      id: "",
      accountId: "",
      name: "",
    },
  }); /* 타입 설정 어떻게 하는 지 */

  const inputUser1 = useRef<HTMLInputElement>(null);
  const inputUser2 = useRef<HTMLInputElement>(null);
  const tab = useRef<HTMLButtonElement>(null);
  const clickTabs = (type: string) => {
    tab.current?.classList.add("active");
    setSearchType(type);
  };

  const dataPage = useRef<HTMLDivElement>(null);

  const clickSoloSearch = () => {
    if (inputUser1.current) {
      if (inputUser1.current.value) {
        //   axios
        //     .post(API.summonerInfo, { summonerName: inputUser1.current.value })
        //     .then((res) => {
        //       setUser1data(res.data);
        //     })
        //     .catch((err) => console.log(err));
        // }
        setUser1data(tempData);
        console.log("실행됐니?");
      } else {
        console.log("소환사명을 입력하지 않으셨어요!");
      }
    }
  };

  const clickDuoSearch = () => {
    if (inputUser1.current && inputUser2.current) {
      if (inputUser1.current.value === inputUser2.current.value) {
        console.log("동일한 소환사명을 입력하실 수 없어요!");
      } else {
        axios
          .post(API.summonerInfo, { summonerName: inputUser1.current.value })
          .then((res) => {
            setUser1data(res.data);
          });

        axios
          .post(API.summonerInfo, { summonerName: inputUser2.current.value })
          .then((res) => {
            setUser2data(res.data);
          });
      }
      if (!inputUser1.current || !inputUser2.current) {
        console.log("소환사명을 입력해주세요");
      }
    }
  };

  return (
    <div className="players-search-page">
      <div className="players-search-bar">
        <div className="tabs">
          <button
            onClick={() => {
              clickTabs("solo");
            }}
            aria-hidden
            className="tab solo-tab"
            type="button"
            ref={tab}
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
            ref={tab}
          >
            DUO
          </button>
        </div>
        {SearchType === "solo" ? (
          <div className="match-search-bar solo-wrap">
            <input
              ref={inputUser1}
              onChange={(e) => {
                setUserName1(e.target.value);
              }}
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
          <div className="search-bar duo-wrap">
            <input
              onChange={(e) => {
                setUserName1(e.target.value);
              }}
              className="players-input"
              type="text"
            ></input>
            <button
              type="button"
              className="search-btn"
              onClick={() => {
                clickDuoSearch();
              }}
            >
              Search
            </button>
            <input
              ref={inputUser2}
              onChange={(e) => {
                setUserName2(e.target.value);
              }}
              className="players-input"
              type="text"
            ></input>
          </div>
        )}
      </div>
      <div className="user-data-view" ref={dataPage}>
        {Object.keys(User1data).length > 0 ? (
          <>
            <div className="summonerInfo">
              <div className="summoner-tier">
                <div>{User1data.leagueInfo?.summonerName}</div>
                <div>{User1data.leagueInfo?.tier}</div>
                <div>{User1data.leagueInfo?.rank}</div>
                <div>{User1data.leagueInfo?.leaguePoints}</div>
              </div>
              <div className="summoner-tags">
                <div className="tag">라인전 강함</div>
                <div className="tag">연승 중</div>
              </div>
            </div>
            <div className="summoner-graph">
              <LaneInfoChart userData={User1data.laneInfo!} />
              <HeatMapChart userData={User1data.recentChampionStats!} />
            </div>
          </>
        ) : (
          <div>검색창만 띄우게</div>
        )}
      </div>
    </div>
  );
}

export default withRouter(PlayersSearchPage);
