import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
// import skill from "../../../assets/image/skill-assets.png";
// import splash from "../../../assets/image/splash-assets.png";
// import square from "../../../assets/image/square-assets.png";

// interface Props {}

const sample = {
  version: "11.7.1",
  id: "Bard",
  key: "432",
  name: "바드",
  title: "영겁의 수호자",
  blurb:
    "별 너머에서 온 여행자 바드는 뜻밖의 발견과 예기치 않은 행운을 수호하며, 삶이 무심한 혼돈을 견딜 수 있도록 우주의 균형을 유지하기 위해 싸운다. 룬테라 인들은 바드가 신비하고 초월자적인 존재라는 내용의 노래를 곧잘 흥얼거리지만, 이 우주의 방랑자가 강력한 마법의 힘이 깃든 유물에 집착한다는 사실은 모든 룬테라 인이 동의하는 바다. 하지만 유익한 정령들이 내는 환희 어린 합창에 둘러싸인 바드가 악의를 지니고 있는 것은 아닐 터이다. 바드는 필멸의...",
  info: {
    attack: 4,
    defense: 4,
    magic: 5,
    difficulty: 9,
  },
  image: {
    full: "Bard.png",
    sprite: "champion0.png",
    group: "champion",
    x: 48,
    y: 48,
    w: 48,
    h: 48,
  },
  tags: ["Support", "Mage"],
  partype: "마나",
  stats: {
    hp: 560,
    hpperlevel: 89,
    mp: 350,
    mpperlevel: 50,
    movespeed: 330,
    armor: 34,
    armorperlevel: 4,
    spellblock: 30,
    spellblockperlevel: 0.5,
    attackrange: 500,
    hpregen: 5.5,
    hpregenperlevel: 0.55,
    mpregen: 6,
    mpregenperlevel: 0.45,
    crit: 0,
    critperlevel: 0,
    attackdamage: 52,
    attackdamageperlevel: 3,
    attackspeedperlevel: 2,
    attackspeed: 0.625,
  },
};

function BoardReadPage(): ReactElement {
  return <div className="board-read-page"></div>;
}

export default withRouter(BoardReadPage);
