/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-unresolved */
import React, { ReactElement, useState, useEffect } from "react";
import { SummonerAllData } from "./interface";

import LaneInfoChart from "./Sections/LaneInfoChart";
import HeatMapChart from "./Sections/HeatMapChart";
import TimelineChart from "./Sections/TimelineChart";
import WinRateChart from "./Sections/WinRateChart";
import TagComponent from "./Sections/TagComponent";
import MostChampion from "./Sections/MostChampion";
import TierIcon from "./Sections/TierIcon";
import PositionIcon from "./Sections/PositionIcon";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

interface Props {
  User1data: SummonerAllData;
}

function SoloMatchView(props: Props): ReactElement {
  const { User1data } = props;

  useEffect(() => {
    return () => {};
  }, [User1data]);

  return (
    <>
      {User1data.leagueInfo !== undefined && (
        <div className="solo-search-result">
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
              <div className="summoner-tier">
                <TierIcon userData={User1data.leagueInfo!.tier} />
              </div>
            </div>
            <div className="summoner-tags">
              <TagComponent
                leagueInfo={User1data.leagueInfo!}
                kdaInfo={User1data.kdaTimelineData!}
                recentChampionStats={User1data.recentChampionStats!}
              />
            </div>
          </div>
          <div className="summoner-graph">
            <div className="graph-section">
              <div className="graph win-rate">
                <WinRateChart userData={User1data.leagueInfo!} />
              </div>
              <div className="graph-laneInfo">
                <div className="div-laneInfo">
                  <LaneInfoChart userData={User1data.laneInfo!} />
                </div>
                <div className="img-laneInfo">
                  <PositionIcon userData={User1data.laneInfo!} />
                </div>
              </div>
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
            <div className="graph-section">
              <div className="graph exp-timeline">
                <TimelineChart
                  userData={User1data.expTimelineData!}
                  userPosition={User1data.laneInfo!}
                />
              </div>
              <div className="graph">
                <HeatMapChart userData={User1data.recentChampionStats!} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SoloMatchView;
