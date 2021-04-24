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

  return (
    <>
      {User1data.leagueInfo && (
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
                <div className="label">Win Rate</div>
                <WinRateChart userData={User1data.leagueInfo!} />
              </div>
              <div className="graph graph-laneInfo">
                <div className="label">Position Rate</div>
                <div className="div-laneInfo">
                  <LaneInfoChart userData={User1data.laneInfo!} />
                </div>
                <div className="img-laneInfo">
                  <PositionIcon userData={User1data.laneInfo!} />
                </div>
              </div>
              <div className="graph summoner-most-champion">
                <div className="label">Most Champions</div>
                <div className="most-champ-wrap">
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
            <div className="graph-section">
              <div className="graph exp-timeline">
                <div className="label">Total CS & Gold for 15 Minutes </div>
                <TimelineChart
                  userData={User1data.expTimelineData!}
                  userPosition={User1data.laneInfo!}
                />
              </div>
              <div className="graph">
                <div className="label">KDA for 20 Matches</div>
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
