import React, { ReactElement, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import tempData from "./tempData.json";

// interface Props {}

// console.log(tempData);

function PlayersSearchPage(): ReactElement {
  const [SearchType, setSearchType] = useState("solo");
  const [userName1, setuserName1] = useState("");
  const [userName2, setuserName2] = useState("");
  const [User1data, setUser1data] = useState(tempData);
  const [User2data, setUser2data] = useState({});

  const inputUser1 = useRef<HTMLInputElement>(null);

  const clickTabs = (type: string) => {
    setSearchType(type);
  };

  const clickSearch = () => {
    console.log("search button click");
    console.log("user 1 : ", userName1);
    console.log("user 2 : ", userName2);

    console.log(inputUser1.current?.value);
    if (inputUser1.current) {
      inputUser1.current.value = "";
    }

    // todo axios 요청으로 각각의 유저 데이터 분석값 받아오기
    // todo setUserdata 로 데이터 넣어주기
  };

  return (
    <div className="players-search-page">
      <div className="players-search-bar">
        <div className="tabs">
          <div
            onClick={() => {
              clickTabs("solo");
            }}
            aria-hidden
            className="tab solo-tab"
          >
            Solo
          </div>
          <div
            onClick={() => {
              clickTabs("duo");
            }}
            aria-hidden
            className="tab duo-tab"
          >
            Due
          </div>
        </div>
        {SearchType === "solo" ? (
          <div className="solo-wrap">
            <input
              ref={inputUser1}
              onChange={(e) => {
                setuserName1(e.target.value);
              }}
              className="players-input"
              type="text"
            ></input>
            <button
              type="button"
              onClick={() => {
                clickSearch();
              }}
            >
              Search
            </button>
          </div>
        ) : (
          <div className="duo-wrap">
            <input
              onChange={(e) => {
                setuserName1(e.target.value);
              }}
              className="players-input"
              type="text"
            ></input>
            <button
              type="button"
              onClick={() => {
                clickSearch();
              }}
            >
              Search
            </button>
            <input
              onChange={(e) => {
                setuserName2(e.target.value);
              }}
              className="players-input"
              type="text"
            ></input>
          </div>
        )}
      </div>
      <div className="user-data-view">
        {Object.keys(User1data).length > 0 ? (
          <>
            <div>{User1data.summonerInfo.name}</div>
            <div className="score">
              <div>{User1data.leagueInfo.tier}</div>
              <div>{User1data.leagueInfo.rank}</div>
              <div>{User1data.leagueInfo.leaguePoints}</div>
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
