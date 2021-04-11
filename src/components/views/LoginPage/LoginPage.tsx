import React, { ReactElement, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import RegisterModal from "./Sections/RegisterModal";
import API from "../../../api";

interface Props extends RouteComponentProps {
  IsModalOpen: boolean;
  closeModal: () => void;
  IsRegisterModal: boolean;
  isRegisterModalHandler: () => void;
  accessTokenHandler: (accessToken: string) => void;
}

function LoginPage(props: Props): ReactElement {
  const {
    IsModalOpen,
    closeModal,
    IsRegisterModal,
    isRegisterModalHandler,
    accessTokenHandler,
  } = props;

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.currentTarget.value);
  };

  const loginHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const body = {
      email: Email,
      password: Password,
    };

    if (Email && Password) {
      axios
        .post(API.user_login_test, body, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.token) {
            accessTokenHandler(res.data.token);
            closeModal();
          }
          //! else일 경우 어떻게 할지.. 유효성검사
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
  };

  return (
    <>
      {IsModalOpen ? (
        <div className="modal-background">
          {!IsRegisterModal ? (
            <div className="modal-box">
              <button className="btn-close" type="button" onClick={closeModal}>
                <i className="icon-cross"></i>
              </button>
              <br />
              <h2>Login</h2>
              <form>
                <div className="user-box login-email">
                  <input
                    className="input-email"
                    placeholder="Email"
                    type="email"
                    onChange={onEmailHandler}
                  />
                </div>
                <div className="user-box login-password">
                  <input
                    className="input-password"
                    placeholder="Password"
                    type="password"
                    onChange={onPasswordHandler}
                  />
                </div>
                <div className="btn-wrapper">
                  <button type="submit" onClick={loginHandler}>
                    Login
                  </button>
                  <i className="icon-google"></i>
                  <i className="icon-facebook"></i>
                  <i className="icon-github"></i>
                </div>
              </form>
              <div className="text-wrapper">
                <span
                  className="register-text"
                  onClick={isRegisterModalHandler}
                  aria-hidden="true"
                >
                  Sign Up Here !
                </span>
              </div>
            </div>
          ) : (
            <RegisterModal closeModal={closeModal} />
          )}
        </div>
      ) : null}
    </>
  );
}

export default withRouter(LoginPage);
