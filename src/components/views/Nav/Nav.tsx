import React, { ReactElement, useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/image/newmeta-logo-spell.png";
import LoginPage from "../LoginPage/LoginPage";

// interface Props {
// }

function Nav(props: any): ReactElement {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [IsRegisterModal, setIsRegisterModal] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  const handleIsRegisterModal = (): void => {
    setIsRegisterModal(true);
  };
  const logoClickHandler = (): void => {
    props.history.push("/");
  };

  return (
    <div className="nav">
      <div
        className="logo"
        onClick={logoClickHandler}
        onKeyDown={() => {
          return null;
        }}
        role="button"
        tabIndex={0}
      >
        <img className="logo-img" src={logo} alt="" />
      </div>
      <div className="btn-login">
        <button
          type="button"
          className="nav-btn"
          onClick={() => {
            openModal();
            setIsRegisterModal(false);
          }}
        >
          Login
        </button>
        <LoginPage
          IsModalOpen={IsModalOpen}
          closeModal={closeModal}
          IsRegisterModal={IsRegisterModal}
          handleIsRegisterModal={handleIsRegisterModal}
        />
      </div>
    </div>
  );
}

export default withRouter(Nav);
