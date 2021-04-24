import React, { ReactElement, useState, useEffect, useRef } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import RegisterModal from "./Sections/RegisterModal";
import Toast from "../../utils/Toast";
import { TokenVar } from "../../../graphql";

const LOGIN = gql`
  mutation Login($data: LoginInputType!) {
    login(data: $data) {
      token
    }
  }
`;

interface Props extends RouteComponentProps {
  closeModal: () => void;
}

function LoginPage(props: Props): ReactElement {
  const { closeModal } = props;

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsRegisterModal, setIsRegisterModal] = useState(false);
  const [ToastMessage, setToastMessage] = useState({ success: "", fail: "" });
  const [loginGraghpl, { data }] = useMutation(LOGIN);
  const modalRef = useRef<HTMLDivElement>(null);

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
    if (Email && Password) {
      loginGraghpl({
        variables: { data: { email: Email, password: Password } },
      })
        .then((res) => {
          TokenVar(res.data.login.token);
          localStorage.setItem("token", res.data.login.token);
          setToastMessage({ success: "로그인 성공!", fail: "" });
        })
        .catch((err) => {
          console.log("error : ", err);
          setToastMessage({
            success: "",
            fail: "아이디와 비밀번호를 확인해주세요",
          });
        });
    } else {
      //! ID & PW가 채워지지 않은 경우
      setToastMessage({
        success: "",
        fail: "아이디, 비밀번호를 모두 입력해주세요",
      });
    }
  };

  const googleLoginHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.open("http://localhost:4000/auth/google");
  };

  const facebookLoginHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.open("http://localhost:4000/auth/facebook");
  };

  const githubLoginHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.open("http://localhost:4000/auth/github");
  };

  useEffect(() => {
    return () => {
      setToastMessage({
        success: "",
        fail: "",
      });
    };
  }, []);

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
  }, [ToastMessage.fail, ToastMessage.success, closeModal, IsRegisterModal]);

  return (
    <>
      {ToastMessage.success ? (
        <Toast
          ToastMessage={ToastMessage}
          setToastMessage={setToastMessage}
          closeModal={closeModal}
        />
      ) : (
        <>
          <div className="modal-background">
            {!IsRegisterModal ? (
              <>
                {ToastMessage.fail ? (
                  <Toast
                    ToastMessage={ToastMessage}
                    setToastMessage={setToastMessage}
                    closeModal={closeModal}
                  />
                ) : null}

                <div className="modal-box" ref={modalRef}>
                  <button
                    className="btn-close"
                    type="button"
                    onClick={closeModal}
                  >
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
                      <i
                        className="icon-google"
                        onClick={(e) => {
                          console.log(
                            "1. 구글 아이콘 클릭 -> setIsGoogleToken = true"
                          );
                          googleLoginHandler(e);
                        }}
                        aria-hidden
                      ></i>
                      <i
                        className="icon-facebook"
                        onClick={(e) => {
                          console.log("페북 온클릭");
                          facebookLoginHandler(e);
                        }}
                        aria-hidden
                      ></i>
                      <i
                        className="icon-github"
                        onClick={(e) => {
                          console.log("깃헙 온클릭");
                          githubLoginHandler(e);
                        }}
                        aria-hidden
                      ></i>
                    </div>
                  </form>
                  <div className="text-wrapper">
                    <span
                      className="register-text"
                      onClick={() => {
                        setToastMessage({ success: "", fail: "" });
                        setIsRegisterModal(true);
                      }}
                      aria-hidden="true"
                    >
                      Sign Up Here !
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <RegisterModal
                closeModal={closeModal}
                ToastMessage={ToastMessage}
                setToastMessage={setToastMessage}
                setIsRegisterModal={setIsRegisterModal}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default withRouter(LoginPage);
