/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import axios from "axios";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";

import ChampionCardList from "./sections/ChampionCardList";
import BoardShow from "./sections/BoardShow";
import API from "../../../api";

// interface Props {}

/*
0: "Fighter"
1: "Tank"
2: "Mage"
3: "Assassin"
4: "Support"
5: "Marksman"
*/

function BoardPage(props: RouteComponentProps): ReactElement {
  const { location } = props;
  const { state }: any = location;

  const [Champions, setChampions] = useState<any>([]);
  const [CurrentPage, setCurrentPage] = useState(state?.page || 0);
  const pageSection = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cache = sessionStorage.getItem("Champions");
    const run = async () => {
      const result = await axios.get(API.allChampionInfo);
      sessionStorage.setItem(
        "Champions",
        JSON.stringify(Object.values(result.data.data))
      );
      setChampions(Object.values(result.data.data));
    };
    if (!cache) {
      run();
    } else {
      setChampions(JSON.parse(cache));
    }
  }, []);

  const ps = pageSection.current;

  return (
    <div className="board-page">
      <div ref={pageSection} className="title">
        <div
          onClick={() => {
            setCurrentPage(0);
            ps?.children[CurrentPage].classList.remove("selected");
            ps?.children[0].classList.add("selected");
          }}
          aria-hidden="true"
          className="page-section"
        >
          New-Meta
        </div>
        <div
          onClick={() => {
            setCurrentPage(1);
            ps?.children[CurrentPage].classList.remove("selected");
            ps?.children[1].classList.add("selected");
          }}
          aria-hidden="true"
          className="page-section"
        >
          Champions
        </div>
      </div>
      {CurrentPage === 0 && <BoardShow />}
      {CurrentPage === 1 && <ChampionCardList Champions={Champions} />}
    </div>
  );
}

export default withRouter(BoardPage);

/*
<div className="title">
        사용자 추천 메타
        <Link to="/board/write">
          <button className="btn-primary" type="button">
            작성하기
          </button>
        </Link>
      </div>
      <div className="recommend"></div>
*/
