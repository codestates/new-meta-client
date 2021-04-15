import React, { ReactElement, useState, useEffect, useRef } from "react";
import ionia from "../../../../assets/image/ionia.jpeg";
import Canvas from "./Canvas";

function Main(): ReactElement {
  const [Width, setWidth] = useState(0);
  const [Height, setHeight] = useState(0);
  const [MoveX, setMoveX] = useState("");
  const [MoveY, setMoveY] = useState("");
  const backImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowSizeHandler = (): void => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    windowSizeHandler();
    window.addEventListener("resize", windowSizeHandler);

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);

  const mouseMoveHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMoveX(`${(Width / 2 - e.clientX) * 0.015}px`);
    setMoveY(`${(Height / 2 - e.clientY) * 0.015}px`);
  };

  useEffect(() => {
    const backImage = backImageRef.current;
    if (backImage) {
      backImage.style.transform = `translate3d(${MoveX}, ${MoveY}, -0.1px)`;
    }
  }, [MoveX, MoveY]);

  return (
    <div className="sections main">
      <div
        className="landing-img-wrapper"
        onMouseMove={(e) => {
          mouseMoveHandler(e);
        }}
        ref={backImageRef}
      >
        <Canvas />
        <img className="landing-img" src={ionia} alt="" />
      </div>
      <div className="landing-text main">
        <div className="landing-title">Welcome to New-Meta</div>
        <div className="landing-discription">검색하고 비교하고 분석하세요</div>
        <a href="players" className="btn">
          Try now!
        </a>
      </div>
    </div>
  );
}

export default Main;
