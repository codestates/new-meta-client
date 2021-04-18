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
    </div>
  );
}

export default withRouter(LandingPage);
