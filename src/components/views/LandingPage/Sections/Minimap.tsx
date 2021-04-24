/* eslint-disable no-lonely-if */
/* eslint-disable no-undef */
import React, { ReactElement, useEffect, useRef } from "react";

import minimap from "../../../../assets/image/minimap/minimap.png";
import iconTop from "../../../../assets/image/minimap/icon-top.png";
import iconJungle from "../../../../assets/image/minimap/icon-jungle.png";
import iconMid from "../../../../assets/image/minimap/icon-mid.png";
import iconBottom from "../../../../assets/image/minimap/icon-bottom.png";
import iconSupport from "../../../../assets/image/minimap/icon-support.png";
import laneTop from "../../../../assets/image/minimap/lane-top.png";
import laneJungle from "../../../../assets/image/minimap/lane-jungle.png";
import laneMid from "../../../../assets/image/minimap/lane-mid.png";
import laneBottom from "../../../../assets/image/minimap/lane-bottom.png";
import laneSupport from "../../../../assets/image/minimap/lane-support.png";

const totalNum = 5;
let pageNum = 0;
let section: NodeListOf<HTMLElement>;
let li: NodeListOf<HTMLElement>;
let imageWrappers: NodeListOf<HTMLDivElement>;
let activeImageWrapper: HTMLDivElement | null;
let innerWraps: NodeListOf<HTMLDivElement>;
let activeInnerWrap: HTMLDivElement | null;
let sections: NodeListOf<HTMLElement>;
let minimapPrevHeight: number;
let minimapPageHeight: number;

function Minimap(): ReactElement {
  const pointWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    section = document.querySelectorAll(".section-minimap");
    li = document.querySelectorAll(".pointWrap li");
    sections = document.querySelectorAll(".sections");

    const scrollHandler = () => {
      const scroll = window.scrollY;
      const pointWrapper = pointWrapperRef.current;
      imageWrappers = document.querySelectorAll(".image-wrapper");
      activeImageWrapper = document.querySelector(".active .image-wrapper");
      innerWraps = document.querySelectorAll(".innerWrap");
      activeInnerWrap = document.querySelector(".active .innerWrap");
      minimapPrevHeight = sections[0].offsetHeight;
      minimapPageHeight = window.innerHeight;

      const pageChangeFunc = () => {
        if (section && li) {
          for (let i = 0; i < totalNum; i += 1) {
            section[i].classList.remove("active");
            li[i].classList.remove("active");
          }
          section[pageNum].classList.add("active");
          li[pageNum].classList.add("active");
        }
      };

      if (
        section[0].offsetTop <= Math.ceil(scroll) &&
        section[4].offsetTop >= Math.ceil(scroll)
      ) {
        if (
          activeImageWrapper &&
          pointWrapper &&
          activeInnerWrap &&
          innerWraps &&
          imageWrappers
        ) {
          for (let i = 0; i < totalNum; i += 1) {
            imageWrappers[i].style.position = "fixed";
            innerWraps[i].style.position = "fixed";
          }
          pointWrapper.style.opacity = "1";
          pointWrapper.style.position = "fixed";
        }
      } else {
        if (pointWrapper && innerWraps && imageWrappers) {
          for (let i = 0; i < totalNum; i += 1) {
            imageWrappers[i].style.position = "absolute";
            innerWraps[i].style.position = "absolute";
          }
          if (pointWrapper) {
            pointWrapper.style.opacity = "0";
            pointWrapper.style.position = "absolute";
          }
        }
      }

      for (let i = 0; i < totalNum; i += 1) {
        if (
          Math.ceil(scroll) >=
            section[i].offsetTop - window.innerHeight / 1.5 &&
          Math.ceil(scroll) <=
            section[i].offsetTop -
              window.innerHeight / 1.5 +
              section[i].offsetHeight
        ) {
          pageNum = i;
          break;
        }
      }
      pageChangeFunc();
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", () => {
      minimapPrevHeight = sections[0].offsetHeight;
      minimapPageHeight = window.innerHeight;
    });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", () => {
        minimapPrevHeight = sections[0].offsetHeight;
        minimapPageHeight = window.innerHeight;
      });
    };
  }, []);

  const onClickHandler = (idx: number) => {
    if (section) {
      section[pageNum].classList.remove("active");
      section[idx].classList.add("active");
      window.scrollTo({
        top: section[idx].offsetTop,
      });
      pageNum = idx;
    }
  };

  return (
    <div className="sections minimap">
      <section className="section-minimap 0">
        <div className="pointWrap" ref={pointWrapperRef}>
          <li
            onClick={() => {
              onClickHandler(0);
            }}
            aria-hidden="true"
          />
          <li
            onClick={() => {
              onClickHandler(1);
            }}
            aria-hidden="true"
          />
          <li
            onClick={() => {
              onClickHandler(2);
            }}
            aria-hidden="true"
          />
          <li
            onClick={() => {
              onClickHandler(3);
            }}
            aria-hidden="true"
          />
          <li
            onClick={() => {
              onClickHandler(4);
            }}
            aria-hidden="true"
          />
        </div>
        <div className="innerWrap">
          <h1>TOP</h1>
          <div className="text">다이브 라인인데 우리 정글 바텀갱 가네?</div>
          <div className="text">복귀 텔 탄다고 뭐라 하지 마세요</div>
          <div className="text">1 대 2 중인데 전령을 치네</div>
          <div className="text">칼챔인데 왜 탱탬을 가라고 하지?</div>
        </div>
        <div className="image-wrapper top">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneTop} className="lane" alt="top" />
          <img src={iconTop} className="icon" alt="top" />
        </div>
      </section>

      <section className="section-minimap 1">
        <div className="innerWrap">
          <h1>JUNGLE</h1>
          <div className="text">저도 바위게 팀원이랑 같이 먹고 싶어요</div>
          <div className="text">라인밀어 놓고 갱와달라고요?</div>
          <div className="text">대각선 법칙 ... 아시죠?</div>
          <div className="text">강타없는데 용치지 마요</div>
        </div>
        <div className="image-wrapper jungle">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneJungle} className="lane" alt="jungle" />
          <img src={iconJungle} className="icon" alt="jungle" />
        </div>
      </section>

      <section className="section-minimap 2">
        <div className="innerWrap">
          <h1>MIDDLE</h1>
          <div className="text">라인 버리고 갔더니 적에게 쌍 버프?</div>
          <div className="text">윗 부쉬엔 적팀 탑 아랫 부쉬엔 적팀 서폿</div>
          <div className="text">블루주면 캐리할게</div>
          <div className="text">풀캠프 다 돌면 갱은 언제 와?</div>
        </div>
        <div className="image-wrapper mid">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneMid} className="lane" alt="mid" />
          <img src={iconMid} className="icon" alt="mid" />
        </div>
      </section>

      <section className="section-minimap 3">
        <div className="innerWrap">
          <h1>BOTTOM</h1>
          <div className="text">아니 저 베인 잘합니다</div>
          <div className="text">아니 지금오면 더블킬인데</div>
          <div className="text">아니 이게 안죽네</div>
          <div className="text">아니시에이팅</div>
        </div>
        <div className="image-wrapper bottom">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneBottom} className="lane" alt="bottom" />
          <img src={iconBottom} className="icon" alt="bottom" />
        </div>
      </section>

      <section className="section-minimap 4">
        <div className="innerWrap">
          <h1>SUPPORT</h1>
          <div className="text">제발 와드하러 갔을 때 물리지마요</div>
          <div className="text">제발 타곤산 있는데 대포 미니언 좀</div>
          <div className="text">제발 저는 메라가 아니에요</div>
          <div className="text">제발 타워 골드만이라도 ...</div>
        </div>
        <div className="image-wrapper support">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneSupport} className="lane" alt="support" />
          <img src={iconSupport} className="icon" alt="support" />
        </div>
      </section>
    </div>
  );
}

export default Minimap;
