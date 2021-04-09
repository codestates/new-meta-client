import React, { ReactElement, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import rift from "../../../assets/image/summonersrift.jpg";
import { removeFooter } from "../../utils/displayfooter";

// interface Props {}

function BoardWritePage(): ReactElement {
  removeFooter();

  const [CurrentIndex, setCurrentIndex] = useState(0);
  const writeBox = useRef<HTMLDivElement>(null);
  const { current } = writeBox;

  const clickIndex = (index: number): void => {
    current?.children[CurrentIndex - 1].classList.remove("is-active");
    setCurrentIndex(index);
    current?.children[index - 1].classList.add("is-active");
  };

  return (
    <div className="board-write-page">
      <div className="back-blur">
        <img src={rift} alt="" />
      </div>
      <div className="index-box">
        <div
          onClick={() => clickIndex(1)}
          aria-hidden="true"
          className="index-item"
        >
          Pick
        </div>
        <div
          onClick={() => clickIndex(2)}
          aria-hidden="true"
          className="index-item"
        >
          Title
        </div>
        <div
          onClick={() => clickIndex(3)}
          aria-hidden="true"
          className="index-item"
        >
          Skill
        </div>
        <div
          onClick={() => clickIndex(4)}
          aria-hidden="true"
          className="index-item"
        >
          Tips
        </div>
        <div
          onClick={() => clickIndex(5)}
          aria-hidden="true"
          className="index-item"
        >
          .etc
        </div>
      </div>
      <div ref={writeBox} className="write-box">
        <div className="page page-1">챔피언 선택하기</div>
        <div className="page page-2">제목 및 간단한 소개</div>
        <div className="page page-3">스킬 공략</div>
        <div className="page page-4">팁s</div>
        <div className="page page-5">기타 등등</div>
        {/* <div className="page page-test is-active">테스트 페이지</div> */}
      </div>
    </div>
  );
}

export default withRouter(BoardWritePage);
