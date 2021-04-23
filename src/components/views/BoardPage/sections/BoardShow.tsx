/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import BoardDetail from "./BoardDetail";
import BoardSmall from "./BoardSmall";
import Login from "../../LoginPage/LoginPage";
import BoardPopular from "./BoardPopular";

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
      user {
        id
        nickname
      }
    }
  }
`;
function BoardShow(props: any): ReactElement {
  const [CurrentBoard, setCurrentBoard] = useState({});
  const [BoardList, setBoardList] = useState([]);
  const getAllPostQuery = useQuery(GET_ALL_POST);

  const [IsLoginOpen, setIsLoginOpen] = useState(false);
  const closeModal = () => setIsLoginOpen(false);

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
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="user-board">
      {IsLoginOpen ? (
        <Login
          closeModal={closeModal}
          setIsGoogleToken={() => null}
          setIsFacebookToken={() => null}
        />
      ) : null}
      <div className="detail-view">
        {Object.keys(CurrentBoard).length > 0 ? (
          <BoardDetail data={CurrentBoard} setCurrentBoard={setCurrentBoard} />
        ) : null}
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
        <div className="label">Popular</div>
        <div className="content-list popular">
          {BoardList.map((el, idx) => {
            return (
              <BoardPopular
                key={idx}
                data={el}
                setCurrentBoard={setCurrentBoard}
              />
            );
          })}
        </div>
        <div className="label">Recent</div>
        <div className="content-list recent">
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
      </div>
    </div>
  );
}

export default withRouter(BoardShow);
