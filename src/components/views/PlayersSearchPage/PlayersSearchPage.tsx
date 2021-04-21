/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  ReactComponentElement,
  ReactElement,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
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
import SoloMatchView from "./SoloMatchView";
import DuoMatchView from "./DuoMatchView";
import Toast from "../../utils/Toast";
import Loading from "../../utils/Loading";
import API from "../../../api";
import LanerData from "./lanerData.json";
import JunglerData from "./junglerData.json";

function PlayersSearchPage(): ReactElement {
  const [SearchType, setSearchType] = useState("solo");
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [user1MainPosition, setUser1MainPosition] = useState("");
  const [user2MainPosition, setUser2MainPosition] = useState("");
  const [ToastMessage, setToastMessage] = useState({ success: "", fail: "" });
  const [loadingState, setLoadingState] = useState(false);

  const soloBtn = useRef<HTMLButtonElement>(null);
  const duoBtn = useRef<HTMLButtonElement>(null);

  const [User1data, setUser1data] = useState<SummonerAllData>(JunglerData);
  const [User2data, setUser2data] = useState<SummonerAllData>({});

  function getMainPosition(object: LaneInfo): string {
    const max = Object.values(object).reduce((acc, cur) => {
      return acc > cur ? acc : cur;
    });
    const array = ["TOP", "JUNGLE", "MID", "AD_CARRY", "SUPPORT"];
    let mainPosition = "";
    for (const el of array) {
      if (object[el] === max) {
        mainPosition = el;
      }
    }
    return mainPosition;
  }

  useEffect(() => {
    return () => {
      setLoadingState(false);
    };
  }, [User1data, User2data, user1MainPosition, user2MainPosition]);

  const onInputUserName1Handler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserName1(e.target.value);
  };

  const onInputUserName2Handler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserName2(e.target.value);
  };

  const clickTabs = (type: string) => {
    setSearchType(type);
    if (type === "solo") {
      duoBtn.current?.classList.remove("active");
      soloBtn.current?.classList.add("active");
    } else {
      duoBtn.current?.classList.add("active");
      soloBtn.current?.classList.remove("active");
    }
  };

  const clickSoloSearch = async () => {
    if (userName1) {
      setLoadingState(true);

      await axios
        .post(API.summonerInfo, {
          summonerName: encodeURI(userName1),
        })
        .then((res) => {
          setUser1data(res.data);
          setUser1MainPosition(getMainPosition(User1data.laneInfo!));
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err);
          setToastMessage({
            success: "",
            fail: "소환사 정보를 찾을 수 없습니다!",
          });
          setLoadingState(false);
        });
    } else {
      setToastMessage({ success: "", fail: "소환사명을 입력하지 않으셨어요!" });
    }
  };

  const clickDuoSearch = async () => {
    if (
      (!userName1 && userName2) ||
      (userName1 && !userName2) ||
      (!userName1 && !userName2)
    ) {
      setToastMessage({
        success: "",
        fail: "소환사명을 모두 입력해주세요!",
      });
    } else if (userName1 && userName2) {
      if (userName1 === userName2) {
        setToastMessage({
          success: "",
          fail: "같은 소환사를 비교할 수는 없습니다!",
        });
      } else {
        setLoadingState(true);
        await axios
          .post(API.summonerInfo, { summonerName: encodeURI(userName1) })
          .then((res) => {
            setUser1data(res.data);
            setUser1MainPosition(getMainPosition(User1data.laneInfo!));
          })
          .then(() => {
            axios
              .post(API.summonerInfo, { summonerName: encodeURI(userName2) })
              .then((res) => {
                setUser2data(res.data);
                setUser2MainPosition(getMainPosition(User2data.laneInfo!));
              })
              .catch((err) => {
                setLoadingState(false);
                setToastMessage({
                  success: "",
                  fail: "소환사 정보를 찾을 수 없습니다!",
                });
              });
            setLoadingState(false);
          })
          .catch((err) => {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사 정보를 찾을 수 없습니다!",
            });
          });
      }
    }
  };

  return (
    <>
      <div className="players-search-page">
        <div className="players-search-bar">
          <div className="tabs">
            <button
              onClick={() => {
                clickTabs("solo");
              }}
              ref={soloBtn}
              aria-hidden
              className="tab solo-tab active"
              type="button"
            >
              SOLO
            </button>
            <button
              onClick={() => {
                clickTabs("duo");
              }}
              aria-hidden
              ref={duoBtn}
              type="button"
              className="tab duo-tab"
            >
              DUO
            </button>
          </div>
          {SearchType === "solo" ? (
            <div className="match-search-bar solo-wrap">
              <input
                onChange={onInputUserName1Handler}
                className="players-input"
                type="text"
              ></input>
              <button
                type="button"
                onClick={() => {
                  clickSoloSearch();
                }}
                className="summoner-search-btn"
              >
                Search
              </button>
            </div>
          ) : (
            <div className="match-search-bar duo-wrap">
              <input
                onChange={onInputUserName1Handler}
                className="players-input"
                type="text"
              ></input>
              <button
                type="button"
                className="summoner-search-btn"
                onClick={clickDuoSearch}
              >
                Search
              </button>
              <input
                onChange={onInputUserName2Handler}
                className="players-input"
                type="text"
              />
            </div>
          )}
        </div>
        {ToastMessage.fail ? (
          <div>
            <Toast
              ToastMessage={ToastMessage}
              setToastMessage={setToastMessage}
              closeModal={() => {}}
            />
          </div>
        ) : null}
        {loadingState ? <Loading /> : null}
        <div className="user-data-view">
          {Object.keys(User1data).length > 0 ? (
            Object.keys(User2data).length > 0 ? (
              <DuoMatchView
                User1data={User1data}
                User1MainPosition={user1MainPosition}
                User2data={User2data}
                User2MainPosition={user2MainPosition}
              />
            ) : (
              <SoloMatchView
                User1data={User1data}
                User1MainPosition={user1MainPosition}
              />
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default withRouter(PlayersSearchPage);
