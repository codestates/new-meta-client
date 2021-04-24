import React, { ReactElement, useState, useEffect, useRef } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import SuccessPopup from "./SuccessPopup";
import Toast from "../../../utils/Toast";

// eslint-disable-next-line no-useless-escape
const EMAIL_RE = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const USERNAME_RE = /^[가-힣|a-z|A-Z|0-9|]+$/;
const PASSWORD_RE = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;

const REGISTER = gql`
  mutation Register($data: RegisterInputType!) {
    register(data: $data) {
      id
      nickname
      email
    }
  }
`;

interface Props extends RouteComponentProps {
  closeModal: () => void;
  ToastMessage: { success: string; fail: string };
  setToastMessage: (ToastMessage: { success: string; fail: string }) => void;
  setIsRegisterModal: (boolean: boolean) => void;
}

function RegisterModal(props: Props): ReactElement {
  const {
    closeModal,
    ToastMessage,
    setToastMessage,
    setIsRegisterModal,
  } = props;
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [IsPopupOpen, setIsPopupOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [registerGraghpl, { data }] = useMutation(REGISTER);

  const validationSuccess = (type: string): void => {
    const successIcon = document.querySelector<HTMLElement>(
      `.icon-check-circle.${type}`
    );
    const failIcon = document.querySelector<HTMLElement>(
      `.icon-x-circle.${type}`
    );
    const message = document.querySelector<HTMLElement>(
      `.valid-check-text.${type}`
    );
    const inputBox = document.querySelector(`.input-${type}`);

    if (successIcon && failIcon && message && inputBox) {
      const successStyle = successIcon.style;
      const failStyle = failIcon.style;
      const messageStyle = message.style;
      successStyle.display = "block";
      failStyle.display = "none";
      messageStyle.display = "none";
      inputBox.classList.remove("valid-fail");
    }
  };

  const validationFail = (type: string): void => {
    const successIcon = document.querySelector<HTMLElement>(
      `.icon-check-circle.${type}`
    );
    const failIcon = document.querySelector<HTMLElement>(
      `.icon-x-circle.${type}`
    );
    const message = document.querySelector<HTMLElement>(
      `.valid-check-text.${type}`
    );
    const inputBox = document.querySelector(`.input-${type}`);

    if (successIcon && failIcon && message && inputBox) {
      const successStyle = successIcon.style;
      const failStyle = failIcon.style;
      const messageStyle = message.style;
      successStyle.display = "none";
      failStyle.display = "block";
      messageStyle.display = "block";
      inputBox.classList.add("valid-fail");
    }
  };

  const onEmailHandler = (event: { currentTarget: { value: string } }) => {
    setEmail(event.currentTarget.value);
    const regex = new RegExp(EMAIL_RE, "i");
    if (regex.test(event.currentTarget.value)) {
      validationSuccess("email");
    } else {
      validationFail("email");
    }
  };

  const onUsernameHandler = (event: { currentTarget: { value: string } }) => {
    setUsername(event.currentTarget.value);
    const regex = new RegExp(USERNAME_RE, "i");
    if (regex.test(event.currentTarget.value)) {
      validationSuccess("username");
    } else {
      validationFail("username");
    }
  };

  const onPasswordHandler = (event: { currentTarget: { value: string } }) => {
    setPassword(event.currentTarget.value);
    const regex = new RegExp(PASSWORD_RE, "i");
    if (regex.test(event.currentTarget.value)) {
      validationSuccess("password");
    } else {
      validationFail("password");
    }
  };

  const onConfirmPasswordHandler = (event: {
    currentTarget: { value: string };
  }) => {
    setConfirmPassword(event.currentTarget.value);
    if (event.currentTarget.value === Password) {
      validationSuccess("confirm-password");
    } else {
      validationFail("confirm-password");
    }
  };

  const onSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (Email && Username && Password && ConfirmPassword) {
      registerGraghpl({
        variables: {
          data: {
            email: Email,
            nickname: Username,
            password: Password,
          },
        },
      })
        .then((res) => {
          // console.log("success:", res);
          setIsPopupOpen(true);
        })
        .catch((err) => {
          // console.log("error:", err);
          setToastMessage({ success: "", fail: "가입에 실패했습니다." });
        });
      // axios
      //   .post(API.user_register_test, body, { withCredentials: true })
      //   .then((res) => {
      //     if (res.data.user) {
      //       //! 가입 성공 => 팝업
      //       console.log("success", res.data.user);
      //       setIsPopupOpen(true);
      //     } else {
      //       //! 가입 실패 => 토스트
      //       console.log("fail", res);
      //       setToastMessage({ success: "", fail: "가입에 실패했습니다." });
      //     }
      //   });
    } else {
      //! 빈칸 => 토스트
      setToastMessage({
        success: "",
        fail: "모든 항목을 올바르게 입력해주세요",
      });
    }
  };

  useEffect(() => {
    const modal = modalRef.current;
    const handleClickOutside = (e: { target: any }) => {
      if (
        modal &&
        !modal.contains(e.target) &&
        !ToastMessage.fail &&
        !ToastMessage.success
      ) {
        closeModal();
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ToastMessage.fail, ToastMessage.success, closeModal]);

  return (
    <>
      {ToastMessage.fail ? (
        <Toast
          ToastMessage={ToastMessage}
          setToastMessage={setToastMessage}
          closeModal={closeModal}
        />
      ) : null}
      {!IsPopupOpen ? (
        <div className="modal-box" ref={modalRef}>
          <button
            className="btn-back"
            type="button"
            onClick={() => {
              setIsRegisterModal(false);
            }}
          >
            <i className="icon-arrow-left-circle" />
          </button>
          <button className="btn-close" type="button" onClick={closeModal}>
            <i className="icon-cross" />
          </button>
          <br />
          <h2>Sign Up</h2>
          <form>
            <div className="user-box register-email">
              <input
                className="input-email"
                placeholder="Email"
                type="email"
                onChange={onEmailHandler}
              />
              <i className="icon-check-circle email" />
              <i className="icon-x-circle email" />
              <div className="valid-check-text email">
                유효하지 않은 이메일 형식입니다.
              </div>
            </div>
            <div className="user-box register-username">
              <input
                className="input-username"
                placeholder="User Name"
                type="text"
                onChange={onUsernameHandler}
              />
              <i className="icon-check-circle username" />
              <i className="icon-x-circle username" />
              <div className="valid-check-text username">
                유저네임은 한글, 알파벳 또는 숫자로 구성되어야 합니다.
              </div>
            </div>
            <div className="user-box register-password">
              <input
                className="input-password"
                placeholder="Password"
                type="password"
                onChange={onPasswordHandler}
              />
              <i className="icon-check-circle password" />
              <i className="icon-x-circle password" />
              <div className="valid-check-text password">
                알파벳 대소문자, 숫자, 특수문자를 1개 이상 포함하여 8자리 이상의
                비밀번호를 작성하세요.
              </div>
            </div>
            <div className="user-box register-confirm-password">
              <input
                className="input-confirm-password"
                placeholder="Confirm Password"
                type="password"
                onChange={onConfirmPasswordHandler}
              />
              <i className="icon-check-circle confirm-password" />
              <i className="icon-x-circle confirm-password" />
              <div className="valid-check-text confirm-password">
                패스워드가 일치하지 않습니다.
              </div>
            </div>
            <div className="btn-wrapper">
              <button type="submit" onClick={onSubmitHandler}>
                <span>Sign Up</span>
              </button>
              <i className="icon-google" />
              <i className="icon-facebook" />
              <i className="icon-github" />
            </div>
          </form>
        </div>
      ) : (
        <SuccessPopup
          setIsPopupOpen={setIsPopupOpen}
          closeModal={closeModal}
          setIsRegisterModal={setIsRegisterModal}
          IsPopupOpen={IsPopupOpen}
        />
      )}
    </>
  );
}

export default withRouter(RegisterModal);
