import { gql, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PostModal from "./Sections/PostModal";
import ChangeNicknameModal from "./Sections/ChangeNicknameModal";
import NewPasswordModal from "./Sections/NewPasswordModal";
import LeaveModal from "./Sections/LeaveModal";
import API from "../../../api";
import ionia from "../../../assets/image/ionia2.jpeg";

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
      }
      posts {
        id
        champion
        title
        createdAt
        updatedAt
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
      author
    }
  }
`;

interface myInfo {
  user: {
    email: string;
    nickname: string;
  };
}

function MyPage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [MyData, setMyData] = useState<myInfo | null>(null);
  const [LikePosts, setLikePosts] = useState([]);
  const [MyPosts, setMyPosts] = useState([]);
  const [FollowerList, setFollowerList] = useState([]);
  const [FolloweeList, setFolloweeList] = useState([]);
  const [PModal, SetPostModal] = useState(false);
  const [PModalData, SetPostModalData] = useState(null);
  const [CNModal, SetChangeNicknameModal] = useState(false);
  const [NPModal, SetNewPasswordModal] = useState(false);
  const [LModal, SetLeaveModal] = useState(false);
  const userInfoQuery = useQuery(MyINFO);
  const userPostQuery = useQuery(MyPost);

  const clickMyPost = (data: any) => {
    SetPostModal(true);
    SetPostModalData(data);
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
  useEffect(() => {
    // todo 팔로우, 좋아요 부분 다 하기

    if (userInfoQuery.data) {
      setMyData(userInfoQuery.data.myInfo);
    }
    if (userPostQuery.data) {
      setMyPosts(userPostQuery.data.readMyPosts);
    }

    return () => {
      setMyData(null);
      setLikePosts([]);
      setMyPosts([]);
      setFollowerList([]);
      setFolloweeList([]);
    };
  }, [userInfoQuery, userInfoQuery.data, userPostQuery.data]);

  useEffect(() => {
    userInfoQuery.refetch();
    userPostQuery.refetch();

    return () => {
      setMyData(null);
      setLikePosts([]);
      setMyPosts([]);
      setFollowerList([]);
      setFolloweeList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {PModal && <PostModal closeModal={SetPostModal} data={PModalData} />}
      {CNModal && <ChangeNicknameModal closeModal={SetChangeNicknameModal} />}
      {NPModal && <NewPasswordModal closeModal={SetNewPasswordModal} />}
      {LModal && <LeaveModal closeModal={SetLeaveModal} />}

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
          <div className="user-email">Email : {MyData?.user.email}</div>
          <div className="numbers">
            <div className="post-num">
              <div className="">Post</div>
              <div className="num">{MyPosts.length}</div>
            </div>
            <div className="follower-num">
              <div className="">Follower</div>
              <div className="num">{FollowerList.length}</div>
            </div>
            <div className="followee-num">
              <div className="">Followee</div>
              <div className="num">{FolloweeList.length}</div>
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
              {tempData.user.posts.length > 0 ? (
                tempData.user.posts.map((el: any) => {
                  return <div className="post-item">&nbsp;</div>;
                })
              ) : (
                <div className="my-post-empty">No like posts yet</div>
              )}
            </div>
          </div>
        </section>
        <section className="user-follow">
          <div className="box-label">Follow</div>
          <div className="label">Follower list</div>
          <div>
            {tempData.user.followerIds.length > 0 ? (
              tempData.user.followerIds.map((el: any) => {
                return (
                  <div className="follow-item">
                    <div className="nickname">osunguk</div>
                    <div className="email">osunguk@gmail.com</div>
                    <div className="unfollow">Unfollow</div>
                  </div>
                );
              })
            ) : (
              <div className="my-follower-empty">Try follower your friends</div>
            )}
          </div>
          <div className="label">Followee list</div>
          <div>
            {tempData.user.followerIds.length > 0 ? (
              tempData.user.followerIds.map((el: any) => {
                return (
                  <div className="follow-item">
                    <div className="nickname">osunguk</div>
                    <div className="email">osunguk@gmail.com</div>
                    <div className="unfollow">Unfollow</div>
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
            <div className="right">reset</div>
          </div>
          <div className="search-list">
            {tempData.user.followerIds.length > 0 ? (
              tempData.user.followerIds.map((el: any) => {
                return (
                  <div className="follow-item">
                    <div className="nickname">osunguk</div>
                    <div className="email">osunguk@gmail.com</div>
                    <div className="unfollow">Unfollow</div>
                  </div>
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
            <button onClick={clickChangeNick} type="button">
              Change Nick name
            </button>
            <button onClick={clickNewPassword} type="button">
              New Password
            </button>
            <button onClick={clickLeave} className="leave" type="button">
              Leave
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default withRouter(MyPage);
