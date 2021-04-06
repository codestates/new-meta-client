import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/image/newmeta-logo-spell.png";

// interface Props {}

function Nav(props: any): ReactElement {
  const logoClickHandler = () => {
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
      <button className="btn-primary nav-btn" type="button">
        Login
      </button>
    </div>
  );
}

export default withRouter(Nav);
