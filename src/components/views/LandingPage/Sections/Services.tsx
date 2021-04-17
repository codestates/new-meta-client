/* eslint-disable no-undef */
import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import freljord from "../../../../assets/image/freljord.jpeg";
import demacia from "../../../../assets/image/demacia.jpeg";

const sideTotalNum = 3;
let sidePageNum = 0;
let sectionSide: NodeListOf<HTMLElement>;
let sections: NodeListOf<HTMLElement>;
let pageHeight: number;
let prevHeight: number;

function Services(): ReactElement {
  useEffect(() => {
    sectionSide = document.querySelectorAll("div.side-section");
    sections = document.querySelectorAll(".sections");

    const sideScrollHandler = () => {
      const scroll = window.scrollY;
      pageHeight = window.innerHeight * 0.7;
      prevHeight = sections[0].offsetHeight + sections[1].offsetHeight;
      const sidePageChangeFunc = () => {
        if (sectionSide) {
          sectionSide[sidePageNum].classList.add("ani");
        }
      };

      if (prevHeight - pageHeight / 1.7 > scroll) {
        for (let i = 0; i < sideTotalNum; i += 1) {
          sectionSide[i].classList.remove("ani");
        }
      } else {
        for (let i = 0; i < sideTotalNum; i += 1) {
          if (
            scroll > sectionSide[i].offsetTop - pageHeight / 1.7 &&
            scroll <
              sectionSide[i].offsetTop -
                pageHeight / 1.7 +
                prevHeight +
                sectionSide[i].offsetHeight
          ) {
            sidePageNum = i;
            break;
          }
        }
        sidePageChangeFunc();
      }
    };

    window.addEventListener("scroll", sideScrollHandler);
    window.addEventListener("resize", () => {
      pageHeight = window.innerHeight * 0.7;
      prevHeight = sections[0].offsetHeight + sections[1].offsetHeight;
    });
  }, []);

  return (
    <div className="sections services">
      <div className="side-section">
        <div className="clip-1" />
        <div className="side-img-wrapper">
          <img className="landing-img right" src={demacia} alt="" />
        </div>
        <div className="text-wrapper first">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            유저간의 데이터를 비교해보세요
            <br />
            나와 맞는 유저일까?
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>

      <div className="side-section">
        <div className="clip-2" />
        <div className="side-img-wrapper">
          {/* <div className="rectangle-1" /> */}
          <img className="landing-img left" src={freljord} alt="" />
        </div>
        <div className="text-wrapper second">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            자신만의 새로운 메타를 만들어 보세요
            <br />
            공략 공유하기
          </div>
          <Link to="/board">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>

      <div className="side-section">
        <div className="clip-3" />
        <div className="side-img-wrapper right">
          <img className="landing-img right" src={demacia} alt="" />
        </div>
        <div className="text-wrapper third">
          <div className="title">Welcome to New-Meta</div>
          <div className="description">
            유저간의 데이터를 비교해보세요
            <br />
            나와 맞는 유저일까?
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              확인하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
