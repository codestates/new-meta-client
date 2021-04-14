import React, { ReactElement } from "react";
import minimap from "../../../../assets/image/lol-minimap.png";

// interface Props {}

function Minimap(): ReactElement {
  return (
    <div>
      <div className="landing-img-wrapper">
        <div className="particle-network-animation"></div>
        <img className="landing-img minimap" src={minimap} alt=""></img>
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

export default Minimap;
