import React, { ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  closeModal: () => void;
}
function RegisterModal({ closeModal }: Props): ReactElement {
  return (
    <div className="modal-box">
      <button className="btn-close" type="button" onClick={closeModal}>
        <i className="icon-cross"></i>
      </button>
      <br />
      <h2>Register</h2>
      <br />
      <form>
        <div className="user-box register-email">
          <input className="input-email" placeholder="Email" type="email" />
        </div>
        <div className="user-box register-username">
          <input
            className="input-username"
            placeholder="Username"
            type="text"
          />
        </div>
        <div className="user-box register-password">
          <input
            className="input-password"
            placeholder="Password"
            type="password"
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
