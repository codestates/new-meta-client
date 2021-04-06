import React, { ReactElement } from "react";
import tempImage from "../../../../assets/image/loading-screen-assets.png";

// interface Props {

// }

export default function ChampionCard(): ReactElement {
  return (
    <div className="champion-card">
      <div
        className="card-side front"
        onClick={(e) => {
          if (e.currentTarget.parentElement?.classList.length !== 1) {
            e.currentTarget.parentElement?.classList.toggle("rotate-again");
          }
          e.currentTarget.parentElement?.classList.toggle("rotate");
        }}
        aria-hidden="true"
      >
        <img src={tempImage} alt=""></img>
      </div>
      <div
        className="card-side back"
        onClick={(e) => {
          e.currentTarget.parentElement?.classList.toggle("rotate-again");
          e.currentTarget.parentElement?.classList.toggle("rotate");
        }}
        aria-hidden="true"
      >
        안녕하세요
        <a href="/board/read">자세히 보러 가기</a>
      </div>
    </div>
  );
}
