import React, { ReactElement } from "react";

function Loading(): ReactElement {
  return (
    <div className="loading-background">
      <div className="loading-container">
        <div className="loading-text">Loading</div>
        <div className="demo">
          <div className="circle">
            <div className="inner"></div>
          </div>
          <div className="circle">
            <div className="inner"></div>
          </div>
          <div className="circle">
            <div className="inner"></div>
          </div>
          <div className="circle">
            <div className="inner"></div>
          </div>
          <div className="circle">
            <div className="inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
