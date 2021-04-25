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
          <div className="text q">&#34;우리 팀 정글러, 갱 잘 와줄까?&#34;</div>
          <div className="text a">
            <span className="arrow">&#10174;</span>&nbsp;&nbsp;라인전 단계의{" "}
            <span className="highlight">킬 관여율</span>과{" "}
            <span className="highlight">갱킹 선호도</span>를 확인해봐!
          </div>
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
          <div className="text q">
            &#34;우리 팀 라이너들, CS는 얼마나 잘 챙길까?&#34;
          </div>
          <div className="text a">
            <span className="arrow">&#10174;</span>&nbsp;&nbsp;15분까지
            라이너들의 <span className="highlight">CS 경험치</span>를 비교해봐!
          </div>
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
          <div className="text q">
            {" "}
            &#34;나의 야스오 승률, 증명할 수 있어!&#34;
          </div>
          <div className="text a">
            {" "}
            <span className="arrow">&#10174;</span>&nbsp;&nbsp;최근 챔피언의{" "}
            <span className="highlight">전적</span>과{" "}
            <span className="highlight">승률</span>로 보여줄게!
          </div>
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
          <div className="text q">
            {" "}
            &#34;우리 팀 정글러, 용을 잘 챙길까?&#34;
          </div>
          <div className="text a">
            {" "}
            <span className="arrow">&#10174;</span>&nbsp;&nbsp;정글러의
            <span className="highlight"> 오브젝트 획득률</span>을 확인해보자!
          </div>
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
          <div className="text q">
            {" "}
            &#34;우리 팀 원딜러의 숙련도를 알고 싶어!&#34;
          </div>
          <div className="text a">
            {" "}
            <span className="arrow">&#10174;</span>&nbsp;&nbsp;
            <span className="highlight">메인 포지션</span>과 최근 전적의{" "}
            <span className="highlight">KDA</span>로 검증해봐!
          </div>
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
