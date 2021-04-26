/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { withRouter } from "react-router-dom";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { GET_CURRENT_USER } from "../../../../graphql";
import API from "../../../../api";

function BoardDetail(props: any): ReactElement {
  const { data, setCurrentBoard } = props;

  const [viewData, setdata] = useState(data);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [info, setinfo] = useState<any>(null);
  const textTag = useRef<HTMLDivElement>(null);
  const partTag = useRef<HTMLDivElement>(null);
  const boardModalRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState(undefined);
  const [likeState, setLikeState] = useState<boolean | undefined>(undefined);
  const [Author, setAuthor] = useState(false);
  const userLogin = useQuery(GET_CURRENT_USER);

  const MY_LIKE_POST = gql`
    {
      readMyLikes {
        likes {
          post {
            id
            title
          }
        }
        user {
          id
        }
      }
    }
  `;

  const CHECK_LOGIN = gql`
    {
      myInfo {
        user {
          nickname
          email
        }
      }
    }
  `;

  const userLikeList = useQuery(MY_LIKE_POST);
  const currentUser = useQuery(CHECK_LOGIN);

  useEffect(() => {
    userLikeList.refetch();
  }, [currentUser]);

  useEffect(() => {
    setIsLogin(userLogin.data.token);

    if (userLogin.data.token !== null && userLikeList.data) {
      const { likes, user } = userLikeList.data.readMyLikes;

      if (data.user.id === user.id) {
        setAuthor(true);
      }
      const result = likes.filter((el: any) => {
        if (el.post.id === data.id) {
          return el;
        }
      });

      if (result.length !== 0) {
        setLikeState(true);
      } else {
        setLikeState(false);
      }
      //
    }
  }, [userLogin, data, userLikeList.data]);

  const clickLeftIcon = () => {
    if (CurrentIndex === 0) {
      return null;
    }
    textTag.current?.children[CurrentIndex].classList.remove("is-active");
    textTag.current?.children[CurrentIndex - 1].classList.add("is-active");
    const box = document.querySelector(".text-box");
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let textBoxWidth: string = "0px";
    if (box) {
      textBoxWidth = window.getComputedStyle(box).width;
    }
    const tt = textTag.current?.style;
    const pt = partTag.current?.style;
    if (tt && pt) {
      const calcWidth =
        Number(textBoxWidth.split("px")[0]) * (CurrentIndex - 1);
      tt.transform = `translateX(-${calcWidth}px)`;
    }
    setCurrentIndex(CurrentIndex - 1);
  };

  const clickRightIcon = () => {
    if (CurrentIndex === 3) {
      return null;
    }
    textTag.current?.children[CurrentIndex].classList.remove("is-active");
    textTag.current?.children[CurrentIndex + 1].classList.add("is-active");
    const data = document.querySelector(".text-box");
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let textBoxWidth: string = "0px";
    if (data) {
      textBoxWidth = window.getComputedStyle(data).width;
    }
    const tt = textTag.current?.style;
    const pt = partTag.current?.style;
    if (tt && pt) {
      const calcWidth =
        Number(textBoxWidth.split("px")[0]) * (CurrentIndex + 1);
      tt.transform = `translateX(-${calcWidth}px)`;
    }
    setCurrentIndex(CurrentIndex + 1);
  };

  const STAR = gql`
    mutation CreateLike($postId: String!) {
      createLike(postId: $postId) {
        post {
          title
        }
      }
    }
  `;

  const UNSTAR = gql`
    mutation DeleteLike($postId: String!) {
      deleteLike(postId: $postId)
    }
  `;

  const [starQuery] = useMutation(STAR, {
    refetchQueries: [
      {
        query: MY_LIKE_POST,
      },
      {
        query: gql`
          {
            fetchAllPostsOrderByCreatedAt {
              title
            }
          }
        `,
      },
      {
        query: gql`
          {
            fetchAllPostsOrderByLikes {
              title
            }
          }
        `,
      },
    ],
  });

  const [unstarQuery] = useMutation(UNSTAR, {
    refetchQueries: [
      {
        query: MY_LIKE_POST,
      },
      {
        query: gql`
          {
            fetchAllPostsOrderByCreatedAt {
              title
            }
          }
        `,
      },
      {
        query: gql`
          {
            fetchAllPostsOrderByLikes {
              title
            }
          }
        `,
      },
    ],
  });
  const clickStar = () => {
    starQuery({
      variables: {
        postId: data.id,
      },
    }).catch((err) => {
      console.log("error : ", err);
    });
  };

  const clickUnstar = () => {
    unstarQuery({
      variables: {
        postId: data.id,
      },
    }).catch((err) => {
      console.log("error : ", err);
    });
  };

  const MY_ID = gql`
    {
      myInfo {
        user {
          id
        }
      }
    }
  `;
  const idQuery = useQuery(MY_ID);

  const clickAuthor = (userId: string) => {
    if (idQuery.data && idQuery.data.myInfo.user.id === userId) {
      props.history.push("/mypage");
    } else {
      const location = {
        pathname: "/userpage",
        state: {
          userId,
        },
      };

      props.history.push(location);
    }
  };

  useEffect(() => {
    textTag.current?.children[1].classList.remove("is-active");
    textTag.current?.children[2].classList.remove("is-active");
    textTag.current?.children[3].classList.remove("is-active");
    textTag.current?.children[0].classList.add("is-active");
    const tt = textTag.current?.style;
    if (tt) {
      tt.transform = `translateX(0px)`;
    }
    setdata(data);
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];
      setinfo(info);
      // const contentsArr = [];
      // setcontent(contentsArr);
      setCurrentIndex(0);
    };
    run();
  }, [data]);

  useEffect(() => {
    const boardModal = boardModalRef.current;

    const handleClickOutside = (e: { target: any }) => {
      if (boardModal && !boardModal.contains(e.target)) {
        setCurrentBoard(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="board-modal-background">
      <div className="board-modal-box" ref={boardModalRef}>
        <button
          className="btn-close"
          type="button"
          onClick={() => {
            setCurrentBoard({});
          }}
        >
          <i className="icon-cross"></i>
        </button>
        <div className="icon-box">
          {CurrentIndex > 0 ? (
            <i
              onClick={clickLeftIcon}
              aria-hidden
              className="icon-arrow-left-circle view-left"
            ></i>
          ) : (
            <i />
          )}
          {CurrentIndex < 3 ? (
            <i
              onClick={clickRightIcon}
              aria-hidden
              className="icon-arrow-right-circle view-right"
            ></i>
          ) : (
            <i />
          )}
        </div>
        <div ref={textTag} className="text-box">
          <div ref={partTag} className="part part1 is-active">
            <div className="contents-title">{viewData.title}</div>
            <div className="contents-description">{viewData.description}</div>
          </div>
          <div className="part part2">
            <div className="contents-skill">
              {info &&
                info.spells.map((el: any, idx: number) => {
                  return (
                    <div className="skill-group" key={idx}>
                      <img
                        src={`${API.championSpell}/${el.image.full}`}
                        alt=""
                        className="board-detail-img"
                      ></img>
                      <div>{viewData.skills[idx]}</div>
                    </div>
                  );
                  //
                })}
            </div>
          </div>
          <div className="part part3">
            <div className="label">플레이 할 때</div>
            <div className="play">{viewData.play[0]}</div>
            <div className="label">상대 할 때</div>
            <div className="enemy">{viewData.play[1]}</div>
          </div>
          <div className="part part4">
            <div className="label">꿀 팁</div>
            <div className="etc">{viewData.etc}</div>
            <div className="button-group">
              <div
                aria-hidden
                onClick={() => {
                  clickAuthor(viewData.user.id);
                }}
                className="user"
              >
                <i className="icon-user"></i>
                <div className="author">{viewData.user.nickname}</div>
              </div>
              {isLogin && (
                <>
                  {!Author && (
                    <>
                      {likeState ? (
                        <div aria-hidden onClick={clickUnstar} className="star">
                          <i className="icon-star-full"></i>
                          <div className="state">Unstar</div>
                        </div>
                      ) : (
                        <div aria-hidden onClick={clickStar} className="star">
                          <i className="icon-star-empty"></i>
                          <div className="state">Star</div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <img
          className="detail-img"
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.champion}_0.jpg`}
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default withRouter(BoardDetail);
