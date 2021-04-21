import React from "react";
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
}

function DuoMatchView(props: Props) {
  const { User1data, User2data } = props;

  return (
    <div className="duo-search-result">
      <div className="duo-match-thumbnail">
        <div className="match-success-point">
          <MatchingPoints User1data={User1data} User2data={User2data} />
        </div>
        <div className="two-summoner-info">
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
              <div className="summoner-tags">
                <TagComponent
                  laneInfo={User1data.laneInfo!}
                  leagueInfo={User1data.leagueInfo!}
                  kdaInfo={User1data.kdaTimelineData!}
                  recentChampionStats={User1data.recentChampionStats!}
                />
              </div>
              <div className="summoner-graph">
                <div className="graph-section">
                  <div className="graph">
                    <WinRateChart userData={User1data.leagueInfo!} />
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
              </div>
            </div>
          </div>
          <div className="summonerInfo">
            <div className="summoner-name">
              <div>{User2data.leagueInfo!.summonerName}</div>
            </div>
            <div className="summoner-lank-info">
              <div className="summoner-tier">
                {User2data.leagueInfo!.tier} {User2data.leagueInfo!.rank}
              </div>
              <div className="summoner-tier">
                {User2data.leagueInfo!.leaguePoints} LP
              </div>
              <div className="summoner-tags">
                <TagComponent
                  laneInfo={User2data.laneInfo!}
                  leagueInfo={User2data.leagueInfo!}
                  kdaInfo={User2data.kdaTimelineData!}
                  recentChampionStats={User2data.recentChampionStats!}
                />
              </div>

              <div className="summoner-graph">
                <div className="graph-section">
                  <div className="graph">
                    <WinRateChart userData={User2data.leagueInfo!} />
                  </div>
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
