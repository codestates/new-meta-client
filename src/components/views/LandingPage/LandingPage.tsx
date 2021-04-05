import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";

// interface Props {}

function LandingPage(): ReactElement {
  return (
    <div className="landing">
      <h1>랜딩 페이지 입니다 </h1>
    </div>
  );
}

export default withRouter(LandingPage);
