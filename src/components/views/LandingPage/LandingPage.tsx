import React, { ReactElement } from "react";
import { withRouter, Link } from "react-router-dom";
import ionia from "../../../assets/image/ionia.jpeg";
import minimap from "../../../assets/image/lol-minimap.png";
import freljord from "../../../assets/image/freljord.jpeg";
import demacia from "../../../assets/image/demacia.jpeg";
// import arena from "../../../assets/image/arena.jpeg";

// interface Props {}

function LandingPage(): ReactElement {
  return (
    <div className="landing">
      <div className="landing-img-wrapper">
        <img className="landing-img" src={ionia} alt=""></img>
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

      <div className="landing-img-side">
        <img className="landing-img" src={demacia} alt=""></img>
        <div className="landing-text">
          <div className="landing-text-title">Welcome to New-Meta</div>
          <div className="landing-text-discription">
            유저간의 데이터를 비교해보세요
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>
      <div className="landing-img-side">
        <div className="landing-text">
          <div className="landing-text-title">Welcome to New-Meta</div>
          <div className="landing-text-discription">
            자신만의 새로운 메타를 만들어 보세요
          </div>
          <Link to="/board">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
        <img className="landing-img" src={freljord} alt=""></img>
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
      </div> */}
    </div>
  );
}

export default withRouter(LandingPage);
