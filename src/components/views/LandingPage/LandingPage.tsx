/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
import { addFooter } from "../../utils/displayfooter";
import Main from "./Sections/Main";
import Minimap from "./Sections/Minimap";
import Services from "./Sections/Services";

// interface Props {}

function LandingPage(): ReactElement {
  addFooter();
  return (
    <div className="landing">
      <Main />
      <Minimap />
      <Services />
      {/* <div className="landing-img-wrapper">
        <img className="landing-img" src={arena} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default withRouter(LandingPage);
