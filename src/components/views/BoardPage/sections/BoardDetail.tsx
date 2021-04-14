/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import API from "../../../../api";

interface Props {
  data: any;
}

function BoardDetail(props: Props): ReactElement {
  const { data } = props;
  const [content, setcontent] = useState<any[]>([]);
  const [CurrentIndex, setCurrentIndex] = useState(0);

  const textTag = useRef<HTMLDivElement>(null);
  const partTag = useRef<HTMLDivElement>(null);

  const clickLeftIcon = () => {
    if (CurrentIndex === 0) {
      return null;
    }
    textTag.current?.children[CurrentIndex].classList.remove("is-active");
    textTag.current?.children[CurrentIndex - 1].classList.add("is-active");
    const data = document.querySelector(".text-box");
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let textBoxWidth: string = "0px";
    if (data) {
      textBoxWidth = window.getComputedStyle(data).width;
      console.log(window.getComputedStyle(data).width);
    }
    const tt = textTag.current?.style;
    const pt = partTag.current?.style;
    if (tt && pt) {
      const calcWidth =
        Number(textBoxWidth.split("px")[0]) * (CurrentIndex - 1);
      tt.transform = `translateX(-${calcWidth}px)`;
    }
    setCurrentIndex(CurrentIndex - 1);
  };

  const clickRightIcon = () => {
    if (CurrentIndex === 3) {
      return null;
    }
    textTag.current?.children[CurrentIndex].classList.remove("is-active");
    textTag.current?.children[CurrentIndex + 1].classList.add("is-active");
    const data = document.querySelector(".text-box");
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let textBoxWidth: string = "0px";
    if (data) {
      textBoxWidth = window.getComputedStyle(data).width;
      console.log(window.getComputedStyle(data).width);
    }
    const tt = textTag.current?.style;
    const pt = partTag.current?.style;
    if (tt && pt) {
      const calcWidth =
        Number(textBoxWidth.split("px")[0]) * (CurrentIndex + 1);
      tt.transform = `translateX(-${calcWidth}px)`;
    }
    setCurrentIndex(CurrentIndex + 1);
  };

  useEffect(() => {
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];

      const contentsArr = [
        <div ref={partTag} className="part part1 is-active">
          <div className="contents-title">{data.title}</div>
          <div className="contents-description">{data.description}</div>
        </div>,
        <div className="part part2">
          <div className="contents-skill">
            {info.spells.map((el: any, idx: number) => {
              return (
                <div className="skill-group" key={idx}>
                  <img
                    src={`${API.championSpell}/${el.image.full}`}
                    alt=""
                  ></img>
                  <div>{data.skills[idx]}</div>
                </div>
              );
              //
            })}
          </div>
        </div>,
        <div className="part part3">
          <div className="label">플레이 할 때</div>
          <div className="play">{data.play[0]}</div>
          <div className="label">상대 할 때</div>
          <div className="enemy">{data.play[1]}</div>
        </div>,
        <div className="part part4">
          <div className="label">꿀 팁</div>
          <div className="etc">{data.etc}</div>
          <div className="button-group">
            <i className="icon-user"></i>
            {data.author}
            <i className="icon-star-full"></i>
            <i className="icon-star-empty"></i>
            <i className="icon-file"></i>
          </div>
        </div>,
      ];
      setcontent(contentsArr);
    };
    run();
  }, []);

  return (
    <>
      <div className="icon-box">
        <i
          onClick={clickLeftIcon}
          aria-hidden
          className="icon-arrow-left-circle view-left"
        ></i>
        <i
          onClick={clickRightIcon}
          aria-hidden
          className="icon-arrow-right-circle view-right"
        ></i>
      </div>
      <div ref={textTag} className="text-box">
        {content.length > 0 && (
          // <>{content[0]}</>
          <>
            {content.map((el) => {
              return el;
            })}
          </>
        )}
      </div>
      <img
        className="detail-img"
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.champion}_0.jpg`}
        alt=""
      ></img>
    </>
  );
}

export default BoardDetail;
