import { gql, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ionia from "../../../assets/image/ionia2.jpeg";

// interface Props {}
const tempData = {
  user: {
    // 기본 유저 데이터
    id: "sdfsdfsdfsdf", // 식별자
    nick: "osunguk",
    email: "osunguk@gmail.com",

    // post 와 조인
    posts: ["1번 게시물 타이틀", "2번 게시물 타이틀"],

    // bookmarks(조인 테이블 user-user)
    followerIds: ["Kim", "Na", "Park", "Lee"],
    followeeIds: ["gab", "eul", "byung", "jeong"],

    // likes(조인 테이블 user-post)
    likes: ["3번 게시물 타이틀", "4번 게시물 타이틀"],
  },
};

const MyINFO = gql`
  {
    me {
      nickname
      email
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

function MyPage(): ReactElement {
  const { loading, error, data } = useQuery(MyINFO);

  useEffect(() => {
    if (loading) {
      console.log("loading");
    }
    if (error) console.log(`Error! ${error.message}`);
    console.log("data:", data);
  }, [data, error, loading]);

  return (
    <>
      {/* <div className="my-page-background-img">
        <img src={ionia} alt=""></img>
      </div>
      <div className="my-page-background-blur">&nbsp;</div> */}
      <div className="my-page">
        <section className="user-title">
          <div className="">{tempData.user.nick}</div>
        </section>
        <section className="user-info">
          <div className="box-label">Info</div>
          <div className="user-email">Email : {tempData.user.email}</div>
          <div className="numbers">
            <div className="post-num">
              <div className="">Post</div>
              <div className="num">{tempData.user.posts.length}</div>
            </div>
            <div className="follower-num">
              <div className="">Follower</div>
              <div className="num">{tempData.user.followerIds.length}</div>
            </div>
            <div className="followee-num">
              <div className="">Followee</div>
              <div className="num">{tempData.user.followeeIds.length}</div>
            </div>
          </div>
        </section>
        <section className="user-posts">
          <div className="box-label">Post</div>
          <div className="post">
            <div className="label">Recent posts</div>
            <div className="post-list">
              {tempData.user.posts.map((el: any) => {
                return <div className="post-item">&nbsp;</div>;
              })}
            </div>
          </div>
          <div className="post">
            <div className="label">like posts</div>
            <div className="post-list">
              {tempData.user.posts.map((el: any) => {
                return <div className="post-item">&nbsp;</div>;
              })}
            </div>
          </div>
        </section>
        <section className="user-follow">
          <div className="box-label">Follow</div>
          <div className="label">Follower list</div>
          <div>
            {tempData.user.followerIds.map((el: any) => {
              return (
                <div className="follow-item">
                  <div className="nickname">osunguk</div>
                  <div className="email">osunguk@gmail.com</div>
                  <div className="unfollow">Unfollow</div>
                </div>
              );
            })}
          </div>
          <div className="label">Followee list</div>
          <div>
            {tempData.user.followerIds.map((el: any) => {
              return (
                <div className="follow-item">
                  <div className="nickname">osunguk</div>
                  <div className="email">osunguk@gmail.com</div>
                  <div className="following">Following</div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="user-search-history">
          <div className="box-label">Search</div>
          <div className="label">
            <div className="left">Recent search</div>
            <div className="right">reset</div>
          </div>
          <div className="search-list">
            {tempData.user.followerIds.map((el: any) => {
              return <div className="search-item">hide on bush</div>;
            })}
          </div>
        </section>
        <section className="user-etc">
          <div className="box-label">etc.</div>
          <div className="button-group">
            <button type="button">Change Nickname</button>
            <button type="button">New Password</button>
            <button className="leave" type="button">
              Leave
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default withRouter(MyPage);
