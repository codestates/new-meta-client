import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import freljord from "../../../../assets/image/freljord.jpeg";
import demacia from "../../../../assets/image/demacia.jpeg";

// interface Props {}

function Services(): ReactElement {
  return (
    <div className="services">
      <div className="side-section 1">
        <div className="clip-1" />
        <div className="img-wrapper">
          <img className="landing-img right" src={demacia} alt="" />
        </div>
        <div className="text-wrapper first">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            유저간의 데이터를 비교해보세요
            <br />
            나와 맞는 유저일까?
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>

      <div className="side-section 2">
        <div className="clip-2" />
        <div className="img-wrapper">
          {/* <div className="rectangle-1" /> */}
          <img className="landing-img left" src={freljord} alt="" />
        </div>
        <div className="text-wrapper second">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            자신만의 새로운 메타를 만들어 보세요
            <br />
            공략 공유하기
          </div>
          <Link to="/board">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>

      <div className="side-section 3">
        <div className="clip-3" />
        <div className="img-wrapper right">
          <img className="landing-img right" src={demacia} alt="" />
        </div>
        <div className="text-wrapper third">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            유저간의 데이터를 비교해보세요
            <br />
            나와 맞는 유저일까?
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
