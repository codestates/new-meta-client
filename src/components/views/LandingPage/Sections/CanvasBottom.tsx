import React, { ReactElement, useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

function CanvasBottom(): ReactElement {
  const canvasBottomRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasBottom = canvasBottomRef.current;
    const context = canvasBottom?.getContext("2d");
    const stars: Star[] = [];
    const x = 33;
    canvasBottom!.width = 1000;
    canvasBottom!.height = 1100;

    for (let i = 0; i < x; i += 1) {
      stars.push({
        x: Math.random() * canvasBottom!.width,
        y: Math.random() * canvasBottom!.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }

    function draw() {
      context?.clearRect(0, 0, canvasBottom!.width, canvasBottom!.height);
      context!.globalCompositeOperation = "lighter";

      for (let i = 0, x = stars.length; i < x; i += 1) {
        const star = stars[i];
        context!.fillStyle = "#00b6a4";
        context?.beginPath();
        context?.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        context?.fill();
        context?.stroke();
      }

      context?.beginPath();

      for (let i = 0, x = stars.length; i < x; i += 1) {
        const starI = stars[i];
        context?.moveTo(starI.x, starI.y);

        for (let j = 0, x = stars.length; j < x; j += 1) {
          const starII = stars[j];
          if (distance(starI, starII) < 200) {
            context?.lineTo(starII.x, starII.y);
          }
        }
      }

      context!.lineWidth = 0.05;
      context!.strokeStyle = "#e2e4e9";
      context?.stroke();
    }

    function distance(point1: Star, point2: Star) {
      let xs = 0;
      let ys = 0;
      xs = point2.x - point1.x;
      xs *= xs;
      ys = point2.y - point1.y;
      ys *= ys;
      return Math.sqrt(xs + ys);
    }

    draw();
  }, []);

  return <canvas className="canvas-bottom" ref={canvasBottomRef} />;
}

export default CanvasBottom;
