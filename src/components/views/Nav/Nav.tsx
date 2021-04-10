import React, { ReactElement, useState } from "react";
import { withRouter } from "react-router-dom";
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
    <div className="nav">
      <div
        className="logo"
        onClick={toMainHandler}
        onKeyDown={() => {
          return null;
        }}
        role="button"
        tabIndex={0}
      >
        <img className="logo-img" src={logo} alt="" />
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
          <LoginPage
            IsModalOpen={IsModalOpen}
            closeModal={closeModal}
            IsRegisterModal={IsRegisterModal}
            isRegisterModalHandler={isRegisterModalHandler}
            accessTokenHandler={accessTokenHandler}
          />
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
  );
}

export default withRouter(Nav);
