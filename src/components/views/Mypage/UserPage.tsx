/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { GET_CURRENT_USER } from "../../../graphql";
import LikePostModal from "./Sections/LikePostModal";
import API from "../../../api";

interface myInfo {
  user: {
    email: string;
    nickname: string;
  };
  likes: any[];
}

const YOUR_INFO = gql`
  query UserInfo($userId: String!) {
    userInfo(userId: $userId) {
      user {
        nickname
        email
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
        description
        skills
        play
        etc
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
    }
  }
`;

const CURRENT_USER = gql`
  {
    myInfo {
      followings {
        target {
          id
          nickname
        }
      }
      followers {
        subject {
          id
          nickname
        }
      }
    }
  }
`;

function UserPage(props: RouteComponentProps): ReactElement {
  const { location } = props;
  const { state }: any = location;

  // eslint-disable-next-line @typescript-eslint/ban-types
  const [MyData, setMyData] = useState<myInfo | null>(null);
  const [MyPosts, setMyPosts] = useState([]);
  const [FollowerList, setFollowerList] = useState([]);
  const [FolloweeList, setFolloweeList] = useState([]);
  const [LPModal, SetLPostModal] = useState(false);
  const [LPModalData, SetLPostModalData] = useState(null);
  const [IsLogin, setIsLogin] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  const currentToken = useQuery(GET_CURRENT_USER);
  const currentUser = useQuery(CURRENT_USER);

  useEffect(() => {
    setIsLogin(!!currentToken.data.token);
  }, [currentToken, currentToken.data]);

  useEffect(() => {
    if (currentUser.data) {
      const { followings } = currentUser.data.myInfo;

      for (let i = 0; i < followings.length; i++) {
        if (followings[i].target.id === state.userId) {
          setIsFollow(true);
          return;
        }
      }
      setIsFollow(false);
    }
  }, [currentUser, currentUser.data, state.userId]);

  const clickMyPost = (data: any) => {
    SetLPostModal(true);
    SetLPostModalData(data);
  };

  const clickListPost = (data: any) => {
    SetLPostModal(true);
    SetLPostModalData(data);
  };

  const FOLLOW = gql`
    mutation Follow($targetId: String!) {
      createFollow(targetId: $targetId) {
        subject {
          nickname
        }
        target {
          nickname
        }
      }
    }
  `;
  const UNFOLLOW = gql`
    mutation Unfollow($targetId: String!) {
      deleteFollow(targetId: $targetId)
    }
  `;

  const [followQuery] = useMutation(FOLLOW, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const [unfollowQuery] = useMutation(UNFOLLOW, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const clickFollow = () => {
    //
    followQuery({
      variables: {
        targetId: state.userId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickUnfollow = () => {
    //
    unfollowQuery({
      variables: {
        targetId: state.userId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userInfoQuery = useQuery(YOUR_INFO, {
    variables: {
      userId: state.userId,
    },
  });
  const userPostQuery = useQuery(MyPost);

  useEffect(() => {
    // todo 팔로우, 좋아요 부분 다 하기
    if (userInfoQuery.data) {
      setMyData(userInfoQuery.data.userInfo);
      setMyPosts(userInfoQuery.data.userInfo.posts);
    }

    return () => {
      setMyData(null);
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
      setMyPosts([]);
      setFollowerList([]);
      setFolloweeList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {LPModal && (
        <LikePostModal closeModal={SetLPostModal} data={LPModalData} />
      )}

      <div className="my-page">
        <section className="user-title">
          <div className="">{MyData?.user.nickname}</div>
          <div className="follow-btn">
            {IsLogin && (
              <>
                {isFollow ? (
                  <div aria-hidden onClick={clickUnfollow} className="follow">
                    <i className="icon-user-minus"></i>
                    <div className="text">Unfollow</div>
                  </div>
                ) : (
                  <div aria-hidden onClick={clickFollow} className="follow">
                    <i className="icon-user-plus"></i>
                    <div className="text">Follow</div>
                  </div>
                )}
              </>
            )}
          </div>
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
            <div className="label">posts</div>
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
                <div className="my-post-empty">No posts yet</div>
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
      </div>
    </>
  );
}

export default withRouter(UserPage);
