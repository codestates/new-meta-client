/* eslint-disable no-undef */
import React, { ReactElement, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import freljord from "../../../../assets/image/freljord.jpeg";
import searchPage from "../../../../assets/image/searchpage-resized.gif";
import champList from "../../../../assets/image/champList.png";
import champDetail from "../../../../assets/image/champDetail.png";
import writePageImg from "../../../../assets/image/boardWrite.png";
import boardPageImg from "../../../../assets/image/boardPage.png";
import CanvasBottom from "./CanvasBottom";

const sideTotalNum = 3;
let sidePageNum = 0;
let sectionSide: NodeListOf<HTMLElement>;
let sections: NodeListOf<HTMLElement>;
let pageHeight: number;
let prevHeight: number;

function Services(props: any): ReactElement {
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

      if (prevHeight - pageHeight / 1.28 > scroll) {
        // 첫번째 섹션 나타나는 지점
        for (let i = 0; i < sideTotalNum; i += 1) {
          sectionSide[i].classList.remove("ani");
        }
      } else {
        // 두번째 섹션 부터
        for (let i = 0; i < sideTotalNum; i += 1) {
          if (
            scroll > sectionSide[i].offsetTop - pageHeight / 1.28 &&
            scroll <
              sectionSide[i].offsetTop -
                pageHeight / 1.28 +
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

    return () => {
      window.removeEventListener("scroll", sideScrollHandler);
      window.removeEventListener("resize", () => {
        pageHeight = window.innerHeight * 0.7;
        prevHeight = sections[0].offsetHeight + sections[1].offsetHeight;
      });
    };
  }, []);

  return (
    <div className="sections services">
      <CanvasBottom />
      <div className="side-section">
        <div className="clip-1" />
        <div className="side-img-wrapper">
          <img
            className="landing-img right first-img"
            src={searchPage}
            alt=""
          />
        </div>
        <div className="text-wrapper first">
          <div className="title">Match Your Teammate</div>
          <div className="description">
            유저간의 데이터를 비교해보세요
            <br />
            나와 맞는 유저일까?
          </div>
          <Link to="/players">
            <button className="btn-primary" type="button">
              <span>Try now!</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="side-section">
        <div className="clip-2" />
        <div className="side-img-wrapper second-img">
          {/* 
            writePageImg
            boardPageImg 
          */}
          <img
            className="landing-img left board-img"
            src={boardPageImg}
            alt=""
          />
          <img
            className="landing-img left write-img"
            src={writePageImg}
            alt=""
          />
        </div>
        <div className="text-wrapper second">
          <div className="title">Create Your New Meta</div>
          <div className="description">
            자신만의 새로운 메타를 만들어 보세요
            <br />
            그리고 새로운 메타를 공유하세요
          </div>
          <button
            onClick={() => {
              const location = {
                pathname: "/board",
                state: {
                  page: 0,
                },
              };
              props.history.push(location);
            }}
            className="btn-primary"
            type="button"
          >
            <span>Try now!</span>
          </button>
        </div>
      </div>

      <div className="side-section">
        <div className="clip-3" />
        <div className="side-img-wrapper right last-img">
          <img
            className="landing-img right champ-list-image"
            src={champList}
            alt=""
          />
          <img
            className="landing-img right image-down detail-image"
            src={champDetail}
            alt=""
          />
        </div>
        <div className="text-wrapper third">
          <div className="title">Find Your Champion</div>
          <div className="description">
            챔피언에 대한 정보를 확인해보세요
            <br />
            어떤 챔피언이 나랑 어울릴까?
          </div>
          <button
            onClick={() => {
              const location = {
                pathname: "/board",
                state: {
                  page: 1,
                },
              };
              props.history.push(location);
            }}
            className="btn-primary"
            type="button"
          >
            <span>Try now!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Services);
