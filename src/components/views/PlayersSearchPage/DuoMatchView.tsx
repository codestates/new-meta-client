/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState, ReactElement } from "react";
import { SummonerAllData } from "./interface";

import LaneInfoChart from "./Sections/LaneInfoChart";
import HeatMapChart from "./Sections/HeatMapChart";
import WinRateChart from "./Sections/WinRateChart";
import TagComponent from "./Sections/TagComponent";
import MostChampion from "./Sections/MostChampion";
import MatchingPoints from "./Sections/MatchingPoints";
import DuoTimeline from "./Sections/DuoTimeLine";
import TimelineChart from "./Sections/TimelineChart";
import PositionIcon from "./Sections/PositionIcon";
import TierIcon from "./Sections/TierIcon";

interface Props {
  User1data: SummonerAllData;
  User2data: SummonerAllData;
}

function DuoMatchView(props: Props): ReactElement {
  const { User1data, User2data } = props;

  return (
    <>
      {User1data.leagueInfo !== undefined &&
      User2data.leagueInfo !== undefined ? (
        <div className="duo-search-result">
          <div className="duo-match-thumbnail">
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
                <div className="summoner-tier">
                  <TierIcon userData={User1data.leagueInfo!.tier} />
                </div>
                <div className="summoner-tags">
                  <TagComponent
                    leagueInfo={User1data.leagueInfo!}
                    kdaInfo={User1data.kdaTimelineData!}
                    recentChampionStats={User1data.recentChampionStats!}
                  />
                </div>
              </div>
            </div>
            <div className="match-success-result">
              <MatchingPoints User1data={User1data} User2data={User2data} />
            </div>
            <div className="summonerInfo user2">
              <div className="summoner-name">
                <div>{User2data.leagueInfo!.summonerName}</div>
              </div>

              <div className="summoner-rank-info">
                <div className="summoner-tier-info">
                  {User2data.leagueInfo!.tier} {User2data.leagueInfo!.rank}
                </div>
                <div className="summoner-tier">
                  {User2data.leagueInfo!.leaguePoints} LP
                </div>
                <div className="summoner-tier">
                  <TierIcon userData={User2data.leagueInfo!.tier} />
                </div>
                <div className="summoner-tags">
                  <TagComponent
                    leagueInfo={User2data.leagueInfo!}
                    kdaInfo={User2data.kdaTimelineData!}
                    recentChampionStats={User2data.recentChampionStats!}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="both">
            <div className="left">
              <div className="summoner-graph">
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
                <div className="graph laneInfo">
                  <div className="div-laneInfo">
                    <LaneInfoChart userData={User1data.laneInfo!} />
                  </div>
                  <div className="img-laneInfo">
                    <PositionIcon userData={User1data.laneInfo!} />
                  </div>
                </div>
                <div className="graph heatmapInfo">
                  <HeatMapChart
                    userData={User1data.recentChampionStats!}
                    userName={User1data.leagueInfo.summonerName}
                  />
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="most">
                <div className="text">Most</div>
              </div>
              <div className="lane">
                <div className="text">Position</div>
              </div>
              <div className="heatmap">
                <div className="text">KDA</div>
              </div>
            </div>
            <div className="right">
              <div className="summoner-graph">
                <div className="graph summoner-most-champion">
                  <div className="mostChamp">
                    <MostChampion
                      userData={User2data.recentChampionStats!}
                      idx={0}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User2data.recentChampionStats!}
                      idx={1}
                    />
                  </div>
                  <div className="mostChamp">
                    <MostChampion
                      userData={User2data.recentChampionStats!}
                      idx={2}
                    />
                  </div>
                </div>
                <div className="graph laneInfo">
                  <div className="div-laneInfo">
                    <LaneInfoChart userData={User2data.laneInfo!} />
                  </div>
                  <div className="img-laneInfo">
                    <PositionIcon userData={User2data.laneInfo!} />
                  </div>
                </div>
                <div className="graph heatmapInfo">
                  <HeatMapChart
                    userData={User2data.recentChampionStats!}
                    userName={User2data.leagueInfo.summonerName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="common-graph">
            <div className="graph duo-timeline">
              <DuoTimeline
                User1data={User1data.expTimelineData!}
                User1LaneInfo={User1data.laneInfo!}
                User1Name={User1data.leagueInfo!.summonerName!}
                User2data={User2data.expTimelineData!}
                User2LaneInfo={User2data.laneInfo!}
                User2Name={User2data.leagueInfo!.summonerName}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DuoMatchView;
