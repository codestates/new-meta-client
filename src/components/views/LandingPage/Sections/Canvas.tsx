/* eslint-disable lines-between-class-members */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
/* eslint-disable react/no-this-in-sfc */
import React, { ReactElement, useRef, useEffect } from "react";

interface P {
  x: number;
  y: number;
  s: number;
  ang: number;
  v: number;
}

function Canvas(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let context: CanvasRenderingContext2D | null;
    let width: number;
    let height: number;

    if (canvas) {
      context = canvas.getContext("2d");
      width = canvas.width = 1500;
      height = canvas.height = 700;

      if (context && width && height) {
        context.fillStyle = "rgba(30,30,30,1)";
        context.fillRect(0, 0, width, height);
      }
    }

    class Particle implements P {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = (this.s * this.s) / 4;
      }
      x: number;
      y: number;
      s: number;
      ang: number;
      v: number;

      move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
      }

      show() {
        if (context) {
          context.beginPath();
          context.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
          context.fillStyle = "#0ec7b5";
          context.fill();
        }
      }
    }

    const particles: Particle[] = [];

    const draw = () => {
      if (particles.length < 50) {
        for (let j = 0; j < 10; j += 1) {
          particles.push(new Particle());
        }
      }
      for (let i = 0; i < particles.length; i += 1) {
        particles[i].move();
        particles[i].show();
        if (
          particles[i].x < 0 ||
          particles[i].x > width ||
          particles[i].y < 0 ||
          particles[i].y > height
        ) {
          particles.splice(i, 1);
        }
      }
    };

    const onRequestFrame = (): any => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback: TimerHandler) {
          window.setTimeout(callback);
        }
      );
    };

    const loop = (): void => {
      window.requestAnimationFrame(loop);
      if (context) {
        context.clearRect(0, 0, width, height);
        draw();
      }
    };

    window.requestAnimationFrame = onRequestFrame;

    loop();
    setInterval(loop, 1000 / 60);

    return () => {
      window.cancelAnimationFrame = onRequestFrame;
    };
  }, []);

  return <canvas className="canvas-top" ref={canvasRef} />;
}

export default Canvas;
