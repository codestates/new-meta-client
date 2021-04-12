import React, { ReactElement } from "react";

// interface Props {

// }

function BoardWrite(): ReactElement {
  return (
    <>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input type="text"></input>
          <i className="icon-search"></i>
        </div>
        <div className="reset-btn">Reset</div>
      </div>
    </>
  );
}

export default BoardWrite;
