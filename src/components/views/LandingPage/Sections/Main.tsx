import React, { ReactElement } from "react";
import ionia from "../../../../assets/image/ionia.jpeg";
import Canvas from "./Canvas";

function Main(): ReactElement {
  return (
    <div className="sections main">
      <div className="landing-img-wrapper">
        <Canvas />
        <img className="landing-img" src={ionia} alt="" />
      </div>
      <div className="landing-text main">
        <div className="landing-title">Welcome to New-Meta</div>
        <div className="landing-description">검색하고 비교하고 분석하세요</div>
        <a href="players" className="btn">
          Try now!
        </a>
      </div>
    </div>
  );
}

export default Main;
