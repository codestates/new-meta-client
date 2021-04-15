import React, { ReactElement } from "react";
import demacia from "../../../../assets/image/demacia3.jpeg";

function EmptyDetail(): ReactElement {
  return (
    <>
      <div className="text-box">
        <div className="empty-detail-board">
          <div className="text-box-title">Click Post</div>
          <div className="text-box-description">
            Check out other people&apos;s New Meta.
          </div>
        </div>
      </div>
      <img src={demacia} alt=""></img>
    </>
  );
}

export default EmptyDetail;
