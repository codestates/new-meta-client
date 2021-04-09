import axios from "axios";
import React, { ReactElement, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import API from "../../../../api";

interface Props extends RouteComponentProps {
  closeModal: () => void;
}
function RegisterModal({ closeModal }: Props): ReactElement {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.currentTarget.value);
  };
  const onUsernameHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.currentTarget.value);
  };
  const onPasswordHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.currentTarget.value);
  };
  const registerHandler = () => {
    const body = {
      email: Email,
      nickname: Username,
      password: Password,
    };
    //! 유효성 검사
    axios
      .post(API.user_register_test, body, { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          //! 가입 성공
          // console.log("success", res.data.user);
        } else {
          //! 가입 실패
          // console.log("fail", res);
        }
      });
  };

  return (
    <div className="modal-box">
      <button className="btn-close" type="button" onClick={closeModal}>
        <i className="icon-cross"></i>
      </button>
      <br />
      <h2>Register</h2>
      <form>
        <div className="user-box register-email">
          <input
            className="input-email"
            placeholder="Email"
            type="email"
            onChange={onEmailHandler}
          />
        </div>
        <div className="user-box register-username">
          <input
            className="input-username"
            placeholder="Username"
            type="text"
            onChange={onUsernameHandler}
          />
        </div>
        <div className="user-box register-password">
          <input
            className="input-password"
            placeholder="Password"
            type="password"
            onChange={onPasswordHandler}
          />
        </div>
        <div className="user-box register-confirm-password">
          <input
            className="input-confirm-password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>
        <br />
        <div className="btn-wrapper">
          <button
            type="submit"
            onClick={() => {
              registerHandler();
              closeModal();
            }}
          >
            <span>Sign Up</span>
          </button>
          <i className="icon-google"></i>
          <i className="icon-facebook"></i>
          <i className="icon-github"></i>
        </div>
      </form>
    </div>
  );
}

export default withRouter(RegisterModal);
