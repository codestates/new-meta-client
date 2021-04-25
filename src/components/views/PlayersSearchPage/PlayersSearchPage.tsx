/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactElement, useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { SummonerAllData } from "./interface";
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

  const [ToastMessage, setToastMessage] = useState({ success: "", fail: "" });
  const [loadingState, setLoadingState] = useState(false);

  const soloBtn = useRef<HTMLButtonElement>(null);
  const duoBtn = useRef<HTMLButtonElement>(null);
  const user1Input = useRef<HTMLInputElement>(null);
  const user2Input = useRef<HTMLInputElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);

  const [User1data, setUser1data] = useState<SummonerAllData>({});
  const [User2data, setUser2data] = useState<SummonerAllData>({});

  useEffect(() => {
    setUser1data({});
    setUser2data({});
    setUserName1("");
    setUserName2("");
  }, []);

  useEffect(() => {
    if (userName2 && Object.keys(User1data).length > 0) {
      /* userName2 === userName1 */
      axios
        .post(API.summonerInfo, { summonerName: encodeURI(userName2) })
        .then((res) => {
          if (res.data.message === "Request failed with status code 429") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "잠시 후 다시 시도해주세요.",
            });
          }

          if (res.data.message === "Request failed with status code 404") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "존재하지 않는 소환사입니다!",
            });
          }
          setUser2data(res.data);
          setLoadingState(false);
          setUserName2("");

          if (res.data.message === "Request failed with status code 504") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
            return;
          }

          if (res.data.message === "Request failed with status code 403") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
          }

          if (res.data.message === "Request failed with status code 401") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
          }
        })

        .catch((err) => {
          console.log(err);
          setLoadingState(false);
          setUserName2("");
          setToastMessage({
            success: "",
            fail: "소환사 정보를 찾을 수 없습니다!",
          });
        });
    }
  }, [User1data]);

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

  const clickSearch = () => {
    const searchData = localStorage.getItem("search");
    try {
      if (userName1) {
        if (searchData) {
          const list = JSON.parse(searchData);
          list.push(userName1);
          localStorage.setItem("search", JSON.stringify(list));
        } else {
          localStorage.setItem("search", JSON.stringify([userName1]));
        }
      }
      if (userName2) {
        if (searchData) {
          const list = JSON.parse(searchData);
          list.push(userName2);
          localStorage.setItem("search", JSON.stringify(list));
        } else {
          localStorage.setItem("search", JSON.stringify([userName2]));
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (SearchType === "solo" && !userName1) {
      setToastMessage({
        success: "",
        fail: "소환사명을 입력해주세요!",
      });
      setLoadingState(false);
      return;
    }

    if (SearchType === "duo" && (!userName1 || !userName2)) {
      setToastMessage({
        success: "",
        fail: "소환사명을 모두 입력해주세요!",
      });
      setLoadingState(false);
      return;
    }

    if (SearchType === "duo" && userName1 === userName2) {
      setToastMessage({
        success: "",
        fail: "같은 소환사를 검색하실 수 없습니다!",
      });
      setLoadingState(false);
      return;
    }

    if (userName1) {
      setLoadingState(true);

      axios
        .post(API.summonerInfo, {
          summonerName: encodeURI(userName1),
        })
        .then((res) => {
          if (res.data.message === "Request failed with status code 429") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "잠시 후 다시 시도해주세요.",
            });
            return;
          }

          if (res.data.message === "Request failed with status code 404") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "존재하지 않는 소환사입니다.",
            });
            return;
          }

          if (res.data.message === "Request failed with status code 504") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
            return;
          }

          if (res.data.message === "Request failed with status code 403") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
          }

          if (res.data.message === "Request failed with status code 401") {
            setLoadingState(false);
            setToastMessage({
              success: "",
              fail: "소환사의 데이터를 불러오는 데 실패했습니다.",
            });
          }

          setUser1data(res.data);

          setUserName1("");

          if (!userName2) {
            setLoadingState(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setToastMessage({
            success: "",
            fail: "소환사 정보를 찾을 수 없습니다!",
          });

          setLoadingState(false);
        });
    }
  };

  return (
    <>
      <div className="players-search-page">
        <div className="players-search-bar" ref={searchBar}>
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
            <div className="match-search-bar solo-wrap" ref={searchBar}>
              <div className="search-bar-container players-input">
                <input
                  onChange={onInputUserName1Handler}
                  type="text"
                  className="players-input"
                  ref={user1Input}
                ></input>
                <i className="icon-search"></i>
              </div>

              <div
                onClick={() => {
                  user1Input.current!.value = "";
                  setUser1data({});
                  setUser2data({});
                  clickSearch();
                }}
                aria-hidden
                className="summoner-search-btn"
              >
                Search
              </div>
            </div>
          ) : (
            <div className="match-search-bar duo-wrap" ref={searchBar}>
              <div className="search-bar-container players-input">
                <input
                  onChange={onInputUserName1Handler}
                  className="players-input"
                  type="text"
                  ref={user1Input}
                ></input>
                <i className="icon-search"></i>
              </div>

              <div
                className="summoner-search-btn"
                onClick={() => {
                  user1Input.current!.value = "";
                  user2Input.current!.value = "";
                  setUser1data({});
                  setUser2data({});
                  clickSearch();
                }}
                aria-hidden
              >
                Search
              </div>
              <div className="search-bar-container players-input">
                <input
                  onChange={onInputUserName2Handler}
                  className="players-input"
                  type="text"
                  ref={user2Input}
                ></input>
                <i className="icon-search"></i>
              </div>
            </div>
          )}
        </div>
        {ToastMessage.fail && (
          <div>
            <Toast
              ToastMessage={ToastMessage}
              setToastMessage={setToastMessage}
              closeModal={() => {}}
            />
          </div>
        )}
        {loadingState ? (
          <Loading />
        ) : (
          <div className="user-data-view">
            {Object.keys(User1data).length > 0 ? (
              Object.keys(User2data).length > 0 ? (
                <DuoMatchView User1data={User1data} User2data={User2data} />
              ) : (
                <SoloMatchView User1data={User1data} />
              )
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(PlayersSearchPage);
