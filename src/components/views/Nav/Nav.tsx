/* eslint-disable no-restricted-globals */
import { gql, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/image/newmeta-logo-spell.png";
import LoginPage from "../LoginPage/LoginPage";

// interface Props {
// }

const CHECK_LOGIN = gql`
  {
    me {
      nickname
    }
  }
`;

function Nav(props: any): ReactElement {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [IsRegisterModal, setIsRegisterModal] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);

  const { loading, error, data } = useQuery(CHECK_LOGIN);

  useEffect(() => {
    if (!error) {
      setIsLogin(true);
    }
  }, [loading, error, data]);

  const openModal = (): void => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };
  const toMainHandler = (): void => {
    props.history.push("/");
  };

  return (
    <>
      <div className="nav">
        <div className="logo">
          <img
            onClick={toMainHandler}
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
            {IsLogin && (
              <div
                aria-hidden
                onClick={() => {
                  props.history.push("/mypage");
                }}
                className="page"
              >
                My
              </div>
            )}
          </div>
        </div>
        {!IsLogin ? (
          <div className="btn-wrapper">
            <button
              type="button"
              className="nav-btn login"
              onClick={() => {
                openModal();
                setIsRegisterModal(false);
              }}
            >
              <span>Login</span>
            </button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button
              type="button"
              className="nav-btn logout"
              onClick={() => {
                toMainHandler();
                setIsLogin(false);
                localStorage.clear();
              }}
            >
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {IsModalOpen ? (
        <LoginPage
          closeModal={closeModal}
          IsRegisterModal={IsRegisterModal}
          setIsRegisterModal={setIsRegisterModal}
        />
      ) : null}
    </>
  );
}

export default withRouter(Nav);
