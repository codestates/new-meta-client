import React, { ReactElement } from "react";
import logo from "../../../assets/image/newmeta-logo-spell.png";

// interface Props {}

function Nav(): ReactElement {
  return (
    <div className="nav">
      <div className="logo">
        <img className="logo-img" src={logo} alt="" />
      </div>
      <button className="btn-primary nav-btn" type="button">
        Login
      </button>
    </div>
  );
}

export default Nav;
