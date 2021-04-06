import React, { ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  IsModalOpen: boolean;
  closeModal: () => void;
}

function LoginPage({ IsModalOpen, closeModal }: Props): ReactElement {
  // const { IsModalOpen } = props;

  return (
    <>
      {IsModalOpen ? (
        <div className="modal-background">
          <div className="login-box">
            <button className="btn-close" type="button" onClick={closeModal}>
              <i className="icon-cross"></i>
            </button>
            <h2>Login</h2>
            <form>
              <div className="user-box">
                <input
                  className="input-email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="user-box">
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
          </div>
        </div>
      ) : null}
    </>
  );
}

export default withRouter(LoginPage);
