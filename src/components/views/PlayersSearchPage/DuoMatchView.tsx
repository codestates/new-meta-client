/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState, ReactElement } from "react";
import {
  SummonerAllData,
  MatchInfo,
  LeagueInfo,
  LaneInfo,
  PlayerMatchInfo,
  FrameExpData,
  ParticipantFrames,
  Position,
  KDAEventData,
} from "./interface";
import lanerData from "./lanerData.json";
import junglerData from "./junglerData.json";
import TOP from "../../../assets/image/position/icon-top.png";
import MID from "../../../assets/image/position/icon-mid.png";
import JNG from "../../../assets/image/position/icon-jng.png";
import SPT from "../../../assets/image/position/icon-spt.png";
import ADC from "../../../assets/image/position/icon-adc.png";
import LaneInfoChart from "./Sections/LaneInfoChart";
import HeatMapChart from "./Sections/HeatMapChart";
import TimelineChart from "./Sections/TimelineChart";
import WinRateChart from "./Sections/WinRateChart";
import TagComponent from "./Sections/TagComponent";
import MostChampion from "./Sections/MostChampion";
import MatchingPoints from "./Sections/MatchingPoints";
import DuoTimeline from "./Sections/DuoTimeLine";

interface Props {
  User1data: SummonerAllData;
  User2data: SummonerAllData;
  User1MainPosition: string;
  User2MainPosition: string;
}

function DuoMatchView(props: Props): ReactElement {
  const { User1data, User2data, User1MainPosition, User2MainPosition } = props;

  useEffect(() => {
    return () => {};
  }, [User1data, User2data, User1MainPosition, User2MainPosition]);

  return (
    <div className="duo-search-result">
      <div className="duo-match-thumbnail">
        <div className="match-success-point">
          <MatchingPoints User1data={User1data} User2data={User2data} />
        </div>
        <div className="two-summoner-info">
          <div className="summonerInfo user1">
            <div className="summoner-name">
              <div>{User1data.leagueInfo!.summonerName}</div>
            </div>

            <div className="summoner-rank-info">
              <div className="summoner-tier-info">
                {User1data.leagueInfo!.tier} {User1data.leagueInfo!.rank}
              </div>
              <div className="summoner-tier">
                {User1data.leagueInfo!.leaguePoints} LP
              </div>
              <div className="summoner-tags">
                <TagComponent
                  laneInfo={User1data.laneInfo!}
                  leagueInfo={User1data.leagueInfo!}
                  kdaInfo={User1data.kdaTimelineData!}
                  recentChampionStats={User1data.recentChampionStats!}
                />
              </div>
            </div>
            <div className="summoner-graph">
              <div className="graph laneInfo">
                <img src={TOP} alt="" width="90" height="90" />
              </div>
              <div className="graph-section">
                <div className="graph summoner-most-champion">
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={0}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={1}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Summoner 2 */}
          <div className="summonerInfo user1">
            <div className="summoner-name">
              <div>{User1data.leagueInfo!.summonerName}</div>
            </div>

            <div className="summoner-rank-info">
              <div className="summoner-tier-info">
                {User1data.leagueInfo!.tier} {User1data.leagueInfo!.rank}
              </div>
              <div className="summoner-tier">
                {User1data.leagueInfo!.leaguePoints} LP
              </div>
              <div className="summoner-tags">
                <TagComponent
                  laneInfo={User1data.laneInfo!}
                  leagueInfo={User1data.leagueInfo!}
                  kdaInfo={User1data.kdaTimelineData!}
                  recentChampionStats={User1data.recentChampionStats!}
                />
              </div>
            </div>
            <div className="summoner-graph">
              <div className="graph laneInfo">
                <img src={TOP} alt="" width="90" height="90" />
              </div>
              <div className="graph-section">
                <div className="graph summoner-most-champion">
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={0}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={1}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User1data.recentChampionStats!}
                      idx={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="common-graph">
          <DuoTimeline
            User1Name={User1data.summonerInfo!.name}
            User1data={User1data.expTimelineData!}
            User2data={User2data.expTimelineData!}
            User2Name={User2data.summonerInfo!.name}
            User1LaneInfo={User1data.laneInfo!}
            User2LaneInfo={User2data.laneInfo!}
          />
        </div>
      </div>
    </div>
  );
}

export default DuoMatchView;
