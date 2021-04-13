/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import API from "../../../../api";

interface Props {
  data: any;
}

function BoardDetail(props: Props): ReactElement {
  const { data } = props;
  const [content, setcontent] = useState<any[]>([]);
  const [CurrentIndex, setCurrentIndex] = useState(0);

  const clickLeftIcon = (e: React.MouseEvent) => {
    const partList = e.currentTarget.parentElement?.parentElement?.children[1];
    // setCurrentIndex(CurrentIndex - 1);
  };

  const clickRightIcon = (e: React.MouseEvent) => {
    const partList = e.currentTarget.parentElement?.parentElement?.children[1];
    console.log(CurrentIndex);
    console.log(partList);
    console.log(partList?.children[CurrentIndex]);
    console.log(partList?.children[CurrentIndex + 1]);

    // partList?.children[CurrentIndex].classList.add("display-none");
    // setTimeout(() => {
    //   partList?.children[CurrentIndex].classList.remove("is-out");
    // }, 1000);

    // partList?.children[CurrentIndex + 1].classList.add("is-in");
    // setTimeout(() => {
    //   partList?.children[CurrentIndex + 1].classList.remove("is-in");
    // }, 1000);

    // setCurrentIndex(CurrentIndex + 1);
  };

  useEffect(() => {
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];

      const contentsArr = [
        <div className="part part1">
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
          onClick={(e) => clickLeftIcon(e)}
          aria-hidden
          className="icon-arrow-left-circle view-left"
        ></i>
        <i
          onClick={(e) => clickRightIcon(e)}
          aria-hidden
          className="icon-arrow-right-circle view-right"
        ></i>
      </div>
      <div className="text-box">
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
