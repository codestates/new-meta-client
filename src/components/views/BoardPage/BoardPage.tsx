/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import ChampionCard from "./sections/ChampionCard";
import API from "../../../api";
import { removeFooter } from "../../utils/displayfooter";

// interface Props {}

function BoardPage(): ReactElement {
  const [Champions, setChampions] = useState([]);
  useEffect(() => {
    removeFooter();
    const run = async () => {
      const result = await axios.get(API.allChampionInfo);
      setChampions(Object.values(result.data.data));
    };
    run();
  }, []);

  return (
    <div className="board-page">
      <div className="search-bar">
        <input type="text"></input>
        <i className="icon-search"></i>
      </div>
      <div className="title">챔피언 별</div>
      <div className="champions">
        {Champions.map((el, idx) => {
          // eslint-disable-next-line react/no-array-index-key
          return <ChampionCard key={idx} data={el} />;
        })}
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
