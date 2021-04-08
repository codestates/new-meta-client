import React, { ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import RegisterModal from "./Sections/RegisterModal";

interface Props extends RouteComponentProps {
  IsModalOpen: boolean;
  closeModal: () => void;
  IsRegisterModal: boolean;
  handleIsRegisterModal: () => void;
}

function LoginPage(props: Props): ReactElement {
  const {
    IsModalOpen,
    closeModal,
    IsRegisterModal,
    handleIsRegisterModal,
  } = props;

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
                  />
                </div>
                <div className="user-box login-password">
                  <input
                    className="input-password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="btn-wrapper">
                  <button type="submit">Login</button>
                  <i className="icon-google"></i>
                  <i className="icon-facebook"></i>
                  <i className="icon-github"></i>
                </div>
              </form>
              <div className="text-wrapper">
                <span
                  className="register-text"
                  onClick={handleIsRegisterModal}
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
