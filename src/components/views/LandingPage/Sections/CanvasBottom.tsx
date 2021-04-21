/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable radix */

import React, { ReactElement, useEffect, useRef } from "react";

const color = "0, 182, 164";
const R = 1;
const balls: any[] = [];
const lineWidth = 0.7;
const disLimit = 390;

function CanvasBottom(): ReactElement {
  const canvasBottomRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasBottom = canvasBottomRef.current;
    const ctx = canvasBottom?.getContext("2d");
    let width: number = parseInt(canvasBottom?.getAttribute("width")!);
    let height: number = parseInt(canvasBottom?.getAttribute("height")!);

    function randomNumFrom(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function randomSidePos(length: number) {
      return Math.ceil(Math.random() * length);
    }

    function renderBalls() {
      Array.prototype.forEach.call(
        balls,
        (b: { x: number; y: number; alpha: number }) => {
          if (!Object.prototype.hasOwnProperty.call(b, "type")) {
            ctx!.fillStyle = `rgba(${color}, ${b.alpha})`;
            ctx!.beginPath();
            ctx!.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx!.closePath();
            ctx!.fill();
          }
        }
      );
    }

    function renderLines() {
      console.log("renderLines");
      let fraction;
      let alpha;

      for (let i = 0; i < balls.length; i += 1) {
        for (let j = i + 1; j < balls.length; j += 1) {
          fraction = getDisOf(balls[i], balls[j]) / disLimit;

          if (fraction < 1) {
            alpha = (1 - fraction).toString();
            ctx!.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx!.lineWidth = lineWidth;
            ctx!.beginPath();
            ctx!.moveTo(balls[i].x, balls[i].y);
            ctx!.lineTo(balls[j].x, balls[j].y);
            ctx!.stroke();
            ctx!.closePath();
          }
        }
      }
    }

    function getDisOf(
      b1: { x: number; y: number },
      b2: { x: number; y: number }
    ) {
      const deltaX = Math.abs(b1.x - b2.x);
      const deltaY = Math.abs(b1.y - b2.y);
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    function render() {
      console.log("render");
      ctx!.clearRect(0, 0, width, height);
      renderBalls();
      renderLines();
      window.requestAnimationFrame(render);
    }

    function initBalls(num: number) {
      console.log("initBalls");
      for (let i = 1; i <= num; i += 1) {
        balls.push({
          x: randomSidePos(width),
          y: randomSidePos(height),
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        });
      }
    }

    function initCanvas() {
      console.log("initCanvas");
      canvasBottom?.setAttribute("width", String(window.innerWidth * 0.96));
      canvasBottom?.setAttribute("height", "1250px");
      width = parseInt(canvasBottom?.getAttribute("width")!);
      height = parseInt(canvasBottom?.getAttribute("height")!);
    }

    // window.addEventListener("resize", () => {
    //   console.log("Window Resize...");
    //   initCanvas();
    // });

    function goMovie() {
      console.log("goMovie");
      initCanvas();
      initBalls(25);
      window.requestAnimationFrame(render);
    }

    goMovie();
    render();
  }, []);

  return <canvas className="canvas-bottom" ref={canvasBottomRef} />;
}

export default CanvasBottom;
