/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from "react";
import { withRouter, Link } from "react-router-dom";
import ChampionCard from "./sections/ChampionCard";

// interface Props {}

function BoardPage(): ReactElement {
  return (
    <div className="board-page">
      <div className="search-bar">
        <input type="text"></input>
        <i className="icon-search"></i>
      </div>
      <div className="title">챔피언 별</div>
      <div className="champions">
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
        <ChampionCard />
      </div>
      <div className="title">
        사용자 추천 메타
        <Link to="/board/write">
          <button className="btn-primary" type="button">
            작성하기
          </button>
        </Link>
      </div>
      <div className="recommend"></div>
    </div>
  );
}

export default withRouter(BoardPage);
