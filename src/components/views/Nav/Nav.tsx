import React, { ReactElement, useState } from "react";
import logo from "../../../assets/image/newmeta-logo-spell.png";
import LoginPage from "../LoginPage/LoginPage";
// interface Props {
// }

function Nav(): ReactElement {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="nav">
      <div className="logo">
        <img className="logo-img" src={logo} alt="" />
      </div>
      <div className="btn-login">
        <button
          type="button"
          className="btn-primary nav-btn"
          onClick={openModal}
        >
          Login
        </button>
        <LoginPage IsModalOpen={IsModalOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default Nav;
