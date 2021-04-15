import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import freljord from "../../../../assets/image/freljord.jpeg";
import demacia from "../../../../assets/image/demacia.jpeg";

// interface Props {}

function Services(): ReactElement {
  return (
    <div>
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
    </div>
  );
}

export default Services;
