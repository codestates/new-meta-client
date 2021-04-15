import React, { ReactElement, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";

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

// interface Props {}

const totalNum = 5;
let pageNum = 0;

function Minimap(): ReactElement {
  useEffect(() => {
    const section = document.querySelectorAll("section");
    const li = document.querySelectorAll("li");

    const scrollHandler = () => {
      const scroll = window.scrollY;
      // eslint-disable-next-line no-undef
      const imageWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        ".image-wrapper"
      );
      const ActiveImageWrapper: HTMLDivElement | null = document.querySelector(
        ".active .image-wrapper"
      );
      const pointWrapper: HTMLDivElement | null = document.querySelector(
        ".pointWrap"
      );
      if (section[0].offsetTop <= scroll && section[4].offsetTop >= scroll) {
        if (ActiveImageWrapper && pointWrapper) {
          for (let i = 0; i < imageWrappers.length; i += 1) {
            imageWrappers[i].style.position = "fixed";
            imageWrappers[i].style.opacity = "0";
          }
          ActiveImageWrapper.style.opacity = "1";
          pointWrapper.style.position = "fixed";
        }
      } else {
        // eslint-disable-next-line no-undef
        const imageWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll(
          ".image-wrapper"
        );
        const pointWrapper: HTMLDivElement | null = document.querySelector(
          ".pointWrap"
        );
        if (imageWrappers && pointWrapper) {
          for (let i = 0; i < imageWrappers.length; i += 1) {
            imageWrappers[i].style.position = "absolute";
          }
          pointWrapper.style.position = "absolute";
        }
      }
      for (let i = 0; i < totalNum; i += 1) {
        if (
          scroll > section[i].offsetTop - window.outerHeight / 1.5 &&
          scroll <
            section[i].offsetTop -
              window.outerHeight / 1.5 +
              section[i].offsetHeight
        ) {
          pageNum = i;
          break;
        }
      }
      pageChangeFunc();
    };

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

    window.addEventListener("scroll", scrollHandler);
  }, []);

  const section = document.querySelectorAll("section");
  const onClickHandler = (idx: number) => {
    section[pageNum].classList.remove("active");
    section[idx].classList.add("active");
    window.scrollTo({
      top: section[idx].offsetTop,
      behavior: "smooth",
    });
    pageNum = idx;
  };

  return (
    <div className="sections minimap">
      <section className="section-minimap 0">
        <div className="pointWrap">
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
          <h2>top</h2>
          <p>description</p>
        </div>
        <div className="image-wrapper top">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneTop} className="lane" alt="top" />
          <img src={iconTop} className="icon" alt="top" />
        </div>
      </section>

      <section className="section-minimap 1">
        <div className="innerWrap">
          <h2>jungle</h2>
          <p>description</p>
        </div>
        <div className="image-wrapper jungle">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneJungle} className="lane" alt="jungle" />
          <img src={iconJungle} className="icon" alt="jungle" />
        </div>
      </section>

      <section className="section-minimap 2">
        <div className="innerWrap">
          <h2>mid</h2>
          <p>description</p>
        </div>
        <div className="image-wrapper mid">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneMid} className="lane" alt="mid" />
          <img src={iconMid} className="icon" alt="mid" />
        </div>
      </section>

      <section className="section-minimap 3">
        <div className="innerWrap">
          <h2>bottom</h2>
          <p>description</p>
        </div>
        <div className="image-wrapper bottom">
          <img className="landing-img minimap" src={minimap} alt="minimap" />
          <img src={laneBottom} className="lane" alt="bottom" />
          <img src={iconBottom} className="icon" alt="bottom" />
        </div>
      </section>

      <section className="section-minimap 4">
        <div className="innerWrap">
          <h2>support</h2>
          <p>description</p>
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
