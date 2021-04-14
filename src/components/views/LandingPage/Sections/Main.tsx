import React, { ReactElement, useRef, useEffect } from "react";
import ionia from "../../../../assets/image/ionia.jpeg";
// interface Props {}

function Main(props: any): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let context: CanvasRenderingContext2D | null;

    //

    if (canvas) {
      context = canvas.getContext("2d");
      //
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width="1920" height="1080" {...props} />
      <div className="landing-img-wrapper">
        <img className="landing-img" src={ionia} alt=""></img>
        <div className="landing-text">
          <div className="landing-title">Welcome to New-Meta</div>
          <div className="landing-discription">
            검색하고 비교하고 분석하세요
          </div>
          <a href="players" className="btn">
            Try now!
          </a>
        </div>
      </div>
    </>
  );
}

export default Main;
