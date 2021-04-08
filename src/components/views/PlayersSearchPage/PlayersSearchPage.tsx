import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";

// interface Props {}

function PlayersSearchPage(): ReactElement {
  return (
    <div className="groups">
      <div className="data first-player">
        <div className="search-bar">
          <input type="text" />
          <i className="icon-search" />
        </div>
        <div>
          <span>username</span>
          <span> & icon</span>
        </div>
      </div>
      <div className="data matching">
        <h3>matching result</h3>
      </div>
      <div className="data second-player">
        <div className="search-bar">
          <input type="text" />
          <i className="icon-search" />
        </div>
        <div>
          <span>icon</span>
          <span> & username</span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PlayersSearchPage);
