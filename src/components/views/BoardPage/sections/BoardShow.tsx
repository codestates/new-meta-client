/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import EmptyDetail from "./EmptyDetail";
import BoardDetail from "./BoardDetail";
import BoardSmall from "./BoardSmall";
import Popup from "../../../utils/Popup";

const GET_ALL_POST = gql`
  {
    fetchAllPostsOrderByCreatedAt {
      id
      champion
      title
      description
      skills
      play
      etc
      createdAt
      updatedAt
    }
  }
`;
function BoardShow(props: any): ReactElement {
  const [CurrentBoard, setCurrentBoard] = useState({});
  const [BoardList, setBoardList] = useState([]);
  const getAllPostQuery = useQuery(GET_ALL_POST);

  const [IsPopupOpen, setIsPopupOpen] = useState(false);
  const popupMessage = "로그인이 필요한 서비스입니다.";
  const btnMessage = "OK";
  const closePopupHandler = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const dataList = getAllPostQuery?.data?.fetchAllPostsOrderByCreatedAt;
    if (dataList) {
      const result = dataList.map((el: any) => {
        return {
          ...el,
          skills: JSON.parse(el.skills),
          play: JSON.parse(el.play),
        };
      });
      setBoardList(result);
    }
  }, [getAllPostQuery]);

  const clickWriteBtn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      props.history.push("/board/write");
    } else {
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="user-board">
      {IsPopupOpen ? (
        <Popup
          popupMessage={popupMessage}
          btnMessage={btnMessage}
          IsPopupOpen={IsPopupOpen}
          closePopupHandler={closePopupHandler}
        />
      ) : null}
      <div className="detail-view">
        {Object.keys(CurrentBoard).length > 0 ? (
          <BoardDetail data={CurrentBoard} />
        ) : (
          <EmptyDetail />
        )}
      </div>
      <div className="list-view">
        <div className="btn-wrapper">
          <button
            onClick={clickWriteBtn}
            className="creat-meta-btn"
            type="button"
          >
            create meta
          </button>
        </div>
        <div className="label">Recent</div>
        <div className="content-list">
          {BoardList.map((el, idx) => {
            return (
              <BoardSmall
                key={idx}
                data={el}
                setCurrentBoard={setCurrentBoard}
              />
            );
          })}
        </div>
        <div className="label">Popular</div>
        <div className="content-list">
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
        </div>
        <div className="label">Recommend</div>
        <div className="content-list">
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(BoardShow);
