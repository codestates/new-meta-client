import React, { ReactElement } from "react";
import ionia from "../../../../assets/image/ionia.jpeg";
import Canvas from "./Canvas";

function Main(props: any): ReactElement {
  return (
    <div className="sections main">
      <div className="landing-img-wrapper">
        <Canvas />
        <img className="landing-img" src={ionia} alt="" />
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
          <a href="players" className="btn">
            Try now!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
