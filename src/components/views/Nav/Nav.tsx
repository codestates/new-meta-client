/* eslint-disable no-restricted-globals */
import React, { ReactElement, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "../../../assets/image/newmeta-logo-spell.png";
import LoginPage from "../LoginPage/LoginPage";

// interface Props {
// }

function Nav(props: any): ReactElement {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [IsRegisterModal, setIsRegisterModal] = useState(false);
  const [AccessToken, setAccessToken] = useState("");

  const openModal = (): void => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };
  const accessTokenHandler = (accessToken: string): void => {
    setAccessToken(accessToken);
  };
  const logoutHandler = (): void => {
    setAccessToken("");
  };
  const isRegisterModalHandler = (): void => {
    setIsRegisterModal(true);
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
          </div>
        </div>
        {!AccessToken ? (
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
                logoutHandler();
                toMainHandler();
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
          isRegisterModalHandler={isRegisterModalHandler}
          accessTokenHandler={accessTokenHandler}
        />
      ) : null}
    </>
  );
}

export default withRouter(Nav);
