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
    if (!IsLogin) {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("token");

      if (token && !localStorage.getItem("token")) {
        setIsLogin(true);
        localStorage.setItem("token", token);
        setToastMessage({
          success: "New-Meta에 오신 것을 환영합니다!",
          fail: "",
        });
      }
    }
  }, [IsLogin]);

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
    setToastMessage({ success: "다음에 다시 찾아주세요", fail: "" });
    localStorage.clear();
    console.log("");

    props.history.push("/");
  };

  return (
    <>
      <div className="nav">
        <div className="logo">
          <Hamburger IsLogin={IsLogin} />
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
        {!IsLogin ? (
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
