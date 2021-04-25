import { gql, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PostModal from "./Sections/PostModal";
import ChangeNicknameModal from "./Sections/ChangeNicknameModal";
import NewPasswordModal from "./Sections/NewPasswordModal";
import LeaveModal from "./Sections/LeaveModal";
import LikePostModal from "./Sections/LikePostModal";
import API from "../../../api";

// interface Props {}
const tempData = {
  user: {
    // 기본 유저 데이터
    id: "sdfsdfsdfsdf", // 식별자
    nick: "osunguk",
    email: "osunguk@gmail.com",

    // post 와 조인
    posts: [],

    // bookmarks(조인 테이블 user-user)
    followerIds: [],
    followeeIds: [],

    // likes(조인 테이블 user-post)
    likes: ["3번 게시물 타이틀", "4번 게시물 타이틀"],
  },
};

const MyINFO = gql`
  {
    myInfo {
      user {
        nickname
        email
        accountType
      }
      likes {
        post {
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
      posts {
        id
        champion
        title
        createdAt
        updatedAt
      }
      followers {
        subject {
          nickname
          email
          id
        }
      }
      followings {
        target {
          nickname
          email
          id
        }
      }
    }
  }
`;

const MyPost = gql`
  {
    readMyPosts {
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

interface myInfo {
  user: {
    email: string;
    nickname: string;
  };
  likes: any[];
}

function MyPage(props: any): ReactElement {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [MyData, setMyData] = useState<myInfo | null>(null);
  const [MyPosts, setMyPosts] = useState([]);
  const [AccountType, setAccountType] = useState("");
  const [FollowingList, setFollowingList] = useState([]);
  const [FollowerList, setFollowerList] = useState([]);
  const [PModal, SetPostModal] = useState(false);
  const [LPModal, SetLPostModal] = useState(false);
  const [PModalData, SetPostModalData] = useState(null);
  const [LPModalData, SetLPostModalData] = useState(null);
  const [CNModal, SetChangeNicknameModal] = useState(false);
  const [NPModal, SetNewPasswordModal] = useState(false);
  const [LModal, SetLeaveModal] = useState(false);
  const userInfoQuery = useQuery(MyINFO);
  const userPostQuery = useQuery(MyPost);
  const [SearchList, SetsearchList] = useState([]);

  const clickMyPost = (data: any) => {
    SetPostModal(true);
    SetPostModalData(data);
  };

  const clickListPost = (data: any) => {
    SetLPostModal(true);
    SetLPostModalData(data);
  };

  const clickChangeNick = () => {
    SetChangeNicknameModal(true);
  };

  const clickNewPassword = () => {
    SetNewPasswordModal(true);
  };

  const clickLeave = () => {
    SetLeaveModal(true);
  };

  const clickFollow = (userId: string) => {
    const location = {
      pathname: "/userpage",
      state: {
        userId,
      },
    };
    props.history.push(location);
  };

  useEffect(() => {
    // todo 팔로우, 좋아요 부분 다 하기

    if (userInfoQuery.data) {
      setAccountType(userInfoQuery.data.myInfo.user.accountType);
      setMyData(userInfoQuery.data.myInfo);
      setFollowerList(userInfoQuery.data.myInfo.followers); // 나를
      setFollowingList(userInfoQuery.data.myInfo.followings); // 내가
    }
    if (userPostQuery.data) {
      setMyPosts(userPostQuery.data.readMyPosts);
    }

    return () => {
      setMyData(null);
      setMyPosts([]);
      setFollowerList([]);
      setFollowingList([]);
    };
  }, [userInfoQuery, userInfoQuery.data, userPostQuery.data]);

  useEffect(() => {
    const search = localStorage.getItem("search");
    if (search) {
      const list = JSON.parse(search);
      SetsearchList(list);
    }
    userInfoQuery.refetch();
    userPostQuery.refetch();

    return () => {
      setMyData(null);
      setMyPosts([]);
      setFollowerList([]);
      setFollowingList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {PModal && <PostModal closeModal={SetPostModal} data={PModalData} />}
      {CNModal && <ChangeNicknameModal closeModal={SetChangeNicknameModal} />}
      {NPModal && <NewPasswordModal closeModal={SetNewPasswordModal} />}
      {LModal && (
        <LeaveModal closeModal={SetLeaveModal} AccountType={AccountType} />
      )}
      {LPModal && (
        <LikePostModal closeModal={SetLPostModal} data={LPModalData} />
      )}

      {/* <div className="my-page-background-img">
        <img src={ionia} alt=""></img>
      </div>
      <div className="my-page-background-blur">&nbsp;</div> */}

      <div className="my-page">
        <section className="user-title">
          <div className="">{MyData?.user.nickname}</div>
        </section>
        <section className="user-info">
          <div className="box-label">Info</div>
          {AccountType === "local" && (
            <div className="user-email">Email : {MyData?.user.email}</div>
          )}
          <div className="numbers">
            <div className="post-num">
              <div className="">Post</div>
              <div className="num">{MyPosts.length}</div>
            </div>
            <div className="follower-num">
              <div className="">Following</div>
              <div className="num">{FollowingList.length}</div>
            </div>
            <div className="followee-num">
              <div className="">Follower</div>
              <div className="num">{FollowerList.length}</div>
            </div>
          </div>
        </section>
        <section className="user-posts">
          <div className="box-label">Post</div>
          <div className="post">
            <div className="label">My posts</div>
            <div className="post-list">
              {MyPosts.length > 0 ? (
                MyPosts.map((el: any) => {
                  const data = el.createdAt.slice(0, 10).split("-").join(".");
                  return (
                    <div
                      aria-hidden
                      onClick={() => {
                        clickMyPost(el);
                      }}
                      key={el.id}
                      className="post-item my-post"
                    >
                      <img
                        src={`${API.championSquare}/${el.champion}.png`}
                        alt=""
                      ></img>
                      <div className="text">
                        <div className="title">{el.champion}</div>
                        <div className="description">{data}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="my-post-empty">No my posts yet</div>
              )}
            </div>
          </div>
          <div className="post">
            <div className="label">like posts</div>
            <div className="post-list">
              {MyData && MyData.likes.length > 0 ? (
                MyData.likes.map((el: any) => {
                  const element = el.post;
                  return (
                    <div
                      aria-hidden
                      onClick={() => {
                        clickListPost(element);
                      }}
                      key={element.id}
                      className="post-item my-post"
                    >
                      <img
                        src={`${API.championSquare}/${element.champion}.png`}
                        alt=""
                      ></img>
                      <div className="text">
                        <div className="title">{element.author}</div>
                        <div className="description">{element.champion}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="my-post-empty">No like posts yet</div>
              )}
            </div>
          </div>
        </section>
        <section className="user-follow">
          <div className="box-label">Follow</div>
          <div className="label">Following list</div>
          <div>
            {FollowingList.length > 0 ? (
              FollowingList.map((el: any) => {
                const data = el.target;

                return (
                  <div key={data.id} className="follow-item">
                    <div
                      aria-hidden
                      onClick={() => {
                        clickFollow(data.id);
                      }}
                      className="nickname"
                    >
                      {data.nickname}
                    </div>
                    <div className="email">{data.email}</div>
                  </div>
                );
              })
            ) : (
              <div className="my-follower-empty">Try follower your friends</div>
            )}
          </div>
          <div className="label">Follower list</div>
          <div>
            {FollowerList.length > 0 ? (
              FollowerList.map((el: any) => {
                const data = el.subject;
                return (
                  <div key={data.id} className="follow-item">
                    <div
                      aria-hidden
                      onClick={() => {
                        clickFollow(data.id);
                      }}
                      className="nickname"
                    >
                      {data.nickname}
                    </div>
                    <div className="email">{data.email}</div>
                  </div>
                );
              })
            ) : (
              <div className="my-followee-empty">
                Let your friends know who you are.
              </div>
            )}
          </div>
        </section>
        <section className="user-search-history">
          <div className="box-label">Search</div>
          <div className="label">
            <div className="left">Recent search</div>
            <div
              aria-hidden
              onClick={() => {
                localStorage.removeItem("search");
                SetsearchList([]);
              }}
              className="right"
            >
              reset
            </div>
          </div>
          <div className="search-list">
            {SearchList.length > 0 ? (
              SearchList.map((el: any) => {
                return (
                  <>
                    <div className="search-item">
                      <div className="nickname">{el}&#44;</div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="my-search-empty">
                You didn&#39;t search anything.
              </div>
            )}
          </div>
        </section>
        <section className="user-etc">
          <div className="box-label">etc.</div>
          <div className="button-group">
            {AccountType === "local" ? (
              <>
                <button onClick={clickChangeNick} type="button">
                  Change Nick name
                </button>
                <button onClick={clickNewPassword} type="button">
                  New Password
                </button>
                <button onClick={clickLeave} className="leave" type="button">
                  Leave
                </button>
              </>
            ) : (
              <>
                <button onClick={clickLeave} className="leave" type="button">
                  Leave
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default withRouter(MyPage);
