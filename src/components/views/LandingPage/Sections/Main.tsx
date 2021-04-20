import React, { ReactElement, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import ionia from "../../../../assets/image/ionia.jpeg";
import Canvas from "./Canvas";

function Main(): ReactElement {
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const title: HTMLSpanElement | null = titleRef.current;
    const options = {
      strings: ["New-Meta"],
      typeSpeed: 120,
      startDelay: 0,
      backSpeed: 80,
      backDelay: 800,
      loop: true,
    };
    const typed = new Typed(title!, options);

    const footer = document.querySelector(".footer");
    footer?.classList.add("footer-view");

    return () => {
      typed.destroy();
      footer?.classList.remove("footer-view");
    };
  }, []);

  return (
    <div className="sections main">
      <div className="landing-img-wrapper">
        <Canvas />
        <img className="landing-img" src={ionia} alt="" />
      </div>
      <div className="landing-text main">
        <div className="landing-title">
          Welcome to <span ref={titleRef}></span>
        </div>
        <div className="landing-description">검색하고 비교하고 분석하세요</div>
        <Link to="players">
          <div className="landing-btn">Try now!</div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
