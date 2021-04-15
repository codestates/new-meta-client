import React, { ReactElement, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import RegisterModal from "./Sections/RegisterModal";
import Toast from "../../utils/Toast";
import API from "../../../api";

interface Props extends RouteComponentProps {
  closeModal: () => void;
  IsRegisterModal: boolean;
  isRegisterModalHandler: () => void;
  accessTokenHandler: (accessToken: string) => void;
}

function LoginPage(props: Props): ReactElement {
  const {
    closeModal,
    IsRegisterModal,
    isRegisterModalHandler,
    accessTokenHandler,
  } = props;

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ToastMessage, setToastMessage] = useState({ success: "", fail: "" });

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
            setToastMessage({ success: "로그인 성공!", fail: "" });
          }
        })
        .catch((err) => {
          //! ID & PW 불일치
          console.log("error : ", err);
          setToastMessage({
            success: "",
            fail: "아이디와 비밀번호를 확인해주세요",
          });
          // alert("아이디와 비밀번호를 확인해주세요");
        });
    } else {
      //! ID & PW가 채워지지 않은 경우
      setToastMessage({
        success: "",
        fail: "아이디, 비밀번호를 모두 입력해주세요",
      });
      // alert("아이디, 비밀번호를 모두 입력해주세요!!");
    }
  };

  return (
    <>
      {ToastMessage ? (
        <Toast ToastMessage={ToastMessage} setToastMessage={setToastMessage} />
      ) : null}
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
    </>
  );
}

export default withRouter(LoginPage);
