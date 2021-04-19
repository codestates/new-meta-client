import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import targon from "../../../assets/image/targon.jpeg";

function NotFoundPage(): ReactElement {
  return (
    <div className="not-found">
      <img src={targon} alt=""></img>
      <div className="error">
        <div className="hit-the-floor">404</div>
        <div className="hit-the-floor text">error</div>
      </div>
      <div className="explain">페이지를 찾을 수 없습니다</div>
      <Link to="/">메인으로 가기</Link>
    </div>
  );
}

export default NotFoundPage;
