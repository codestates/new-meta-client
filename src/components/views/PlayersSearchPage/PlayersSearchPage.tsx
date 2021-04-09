import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
import positionFirst from "../../../assets/image/position/position-mid.png";
import positionSecond from "../../../assets/image/position/position-jungle.png";
import emblemFirst from "../../../assets/image/emblem/Emblem_Grandmaster.png";
import emblemSecond from "../../../assets/image/emblem/Emblem_Challenger.png";
import chart1 from "../../../assets/image/chart/chart1.png";
import chart2 from "../../../assets/image/chart/chart2.png";
import chart3 from "../../../assets/image/chart/chart3.png";
import bar from "../../../assets/image/chart/bar.png";

// interface Props {}

function PlayersSearchPage(): ReactElement {
  return (
    <div className="groups">
      {/* search bar */}
      <div className="col search">
        <div className="search-bar user1">
          <input type="text" />
          <i className="icon-search" />
        </div>
        <button className="btn-user" type="submit">
          <span>Search</span>
        </button>
        <div className="search-bar user2">
          <input type="text" />
          <i className="icon-search" />
        </div>
      </div>
      {/* user section */}
      <div className="col user">
        <div className="matching user1">
          <div className="container-position-img user2">
            <img className="position-img first" src={positionFirst} alt="" />
          </div>
          <div className="userinfo">
            <span className="username-text">user1</span>
            <div className="rank">
              <div className="rank-text-wrapper">
                <span className="rank-text name">Grandmaster</span>
                <span className="rank-text point"> 522 LP</span>
              </div>
              <span className="rank-img-wrapper">
                <img className="rank-img" src={emblemFirst} alt="emblem" />
              </span>
            </div>
          </div>
        </div>
        <div className="matching result">
          <span className="title">게임 궁합 점수</span>
          <img className="score" src={bar} alt="result" />
        </div>
        <div className="matching user2">
          <div className="userinfo">
            <span className="username-text">user2</span>
            <div className="rank">
              <span className="rank-img-wrapper">
                <img className="rank-img" src={emblemSecond} alt="emblem" />
              </span>
              <div className="rank-text-wrapper">
                <span className="rank-text name">Challenger</span>
                <span className="rank-text point"> 1314 LP</span>
              </div>
            </div>
          </div>
          <div className="container-position-img user2">
            <img className="position-img second" src={positionSecond} alt="" />
          </div>
        </div>
      </div>
      {/* data detail section */}
      <div className="col detail">
        <div className="data user1">
          <div className="username-section">
            <span className="username">user1</span>
            <span> 님의 플레이 스타일은</span>
          </div>

          <div className="data-detail">
            <div className="label-section">
              <span className="label 1">라인전 강함</span>
              <span className="label 2">초반에 강함</span>
              <span className="label 3">2연승</span>
            </div>
            <div className="chart-section-1">
              <img className="chart-1" src={chart1} alt="chart-1" />
              <img className="chart-2" src={chart2} alt="chart-2" />
            </div>
            <div className="chart-section-2">
              <img className="chart-3" src={chart3} alt="chart-3" />
            </div>
          </div>
        </div>
        <div className="data user2">
          <div className="username-section">
            <span className="username">user2</span>
            <span> 님의 플레이 스타일은</span>
          </div>

          <div className="data-detail">
            <div className="label-section">
              <span className="label 1">라인전 강함</span>
              <span className="label 2">초반에 강함</span>
              <span className="label 3">2연승</span>
            </div>
            <div className="chart-section-1">
              <img className="chart-1" src={chart1} alt="chart-1" />
              <img className="chart-2" src={chart2} alt="chart-2" />
            </div>
            <div className="chart-section-2">
              <img className="chart-3" src={chart3} alt="chart-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PlayersSearchPage);
