import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
// import arena from "../../../assets/image/ionia.jpeg";
import minimap from "../../../assets/image/lol-minimap.png";
import arena from "../../../assets/image/freljord.jpeg";
// import arena from "../../../assets/image/arena.jpeg";
// import arena from "../../../assets/image/arena.jpeg";

// interface Props {}

function LandingPage(): ReactElement {
  return (
    <div className="landing">
      <div className="landing-img-wrapper">
        <img className="landing-img" src={arena} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
        </div>
      </div>
      <div className="landing-img-wrapper">
        <img className="landing-img" src={minimap} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
        </div>
      </div>
      {/*
      <div className="landing-img-wrapper">
        <img className="landing-img" src={arena} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
        </div>
      </div>
      <div className="landing-img-wrapper">
        <img className="landing-img" src={arena} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
        </div>
      </div>
      <div className="landing-img-wrapper">
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
