import React, { ReactElement, useState } from "react";
import EmptyDetail from "./EmptyDetail";
import BoardDetail from "./BoardDetail";
import soldier from "../../../../assets/image/soldier.jpeg";
import demacia from "../../../../assets/image/demacia3.jpeg";
import splash from "../../../../assets/image/splash-assets.png";
import challenger from "../../../../assets/image/emblem/Emblem_Challenger.png";
// interface Props {

// }

const tempData = [
  {
    champion: "Bard",
    author: "osunguk",
    createdAt: "2020.04.01 18:35",
    updatedAt: "2020.04.05 20:11",
    title: "바드 1000판 노하우 공개",
    description: "감전 바드로 원딜보다 딜 많이 하는 방법",
    skills: [
      "평 Q 로 감전을 바로 터트린다",
      "유지력싸움, 이속증가",
      "단축키 사용으로 빠르게 탄다",
      "전령을 무효화할 수 있는 유일한 스킬",
    ],
    play: [
      "e 라는 아주 좋은 생존기가 있기 때문에 신출귀몰하며 로밍으로 게임을 푼다",
      "미니언 뒤에 있으면 속박을 조심하고, 차원문은 위험해보이면 타지 않는다",
    ],
    etc: "로밍 갔을 때 원딜보고 항상 죽지말라고 말해두자",
  },
];

function BoardWrite(): ReactElement {
  const [CurrentBoard, setCurrentBoard] = useState(tempData[0]);

  return (
    <div className="user-board">
      <div className="detail-view">
        {CurrentBoard ? <BoardDetail data={CurrentBoard} /> : <EmptyDetail />}
      </div>
      <div className="list-view">
        <div className="label">Recent</div>
        <div className="content-list">
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
        </div>
        <div className="label">Popular</div>
        <div className="content-list">
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
        </div>
        <div className="label">Recommend</div>
        <div className="content-list">
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
}

export default BoardWrite;
