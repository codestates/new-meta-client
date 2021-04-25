/* eslint-disable no-restricted-globals */
import { gql, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/image/newmeta-logo-spell.png";
import { GET_CURRENT_USER, TokenVar } from "../../../graphql";
import LoginPage from "../LoginPage/LoginPage";
import Hamburger from "./Sections/Hamburger";
import Toast from "../../utils/Toast";

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

function Nav(props: any): ReactElement {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [ToastMessage, setToastMessage] = useState({ success: "", fail: "" });

  // const { loading, error, data } = useQuery(CHECK_LOGIN);
  const currentUser = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token: any = url.searchParams.get("token");

    if (token && !localStorage.getItem("token")) {
      TokenVar(token);
      localStorage.setItem("token", token);
      setIsLogin(true);
      setToastMessage({
        success: "New-Meta에 오신 것을 환영합니다!",
        fail: "",
      });
      props.history.push("/");
    }
  }, [props]);

  useEffect(() => {
    setIsLogin(!!currentUser.data.token);
  }, [currentUser, currentUser.data]);

  const openModal = (): void => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };
  const logoutHandler = (): void => {
    TokenVar(null);
    setIsLogin(false);
    setToastMessage({ success: "로그아웃 되었습니다.", fail: "" });
    localStorage.clear();
    props.history.push("/");
  };

  return (
    <>
      <div className="nav">
        <div className="logo">
          <Hamburger />
          <img
            onClick={() => {
              props.history.push("/");
            }}
            aria-hidden
            className="logo-img"
            src={logo}
            alt=""
          />
          <div className="trans-page">
            <div
              aria-hidden
              onClick={() => {
                props.history.push("/players");
              }}
              className="page"
            >
              Player
            </div>
            <div
              aria-hidden
              onClick={() => {
                props.history.push("/board");
              }}
              className="page"
            >
              Champ
            </div>
          </div>
        </div>
        {!localStorage.getItem("token") ? (
          <div className="btn-wrapper">
            <button
              type="button"
              className="nav-btn login"
              onClick={() => {
                openModal();
              }}
            >
              <span>Login</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <div
              aria-hidden
              onClick={() => {
                props.history.push("/mypage");
              }}
              className="page"
            >
              Mypage
            </div>
            <button
              type="button"
              className="nav-btn logout"
              onClick={logoutHandler}
            >
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
      {IsModalOpen ? <LoginPage closeModal={closeModal} /> : null}
      {ToastMessage.success ? (
        <Toast
          ToastMessage={ToastMessage}
          setToastMessage={setToastMessage}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
}

export default withRouter(Nav);
