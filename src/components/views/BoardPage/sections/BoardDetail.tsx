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

  const clickLeftIcon = () => {
    if (CurrentIndex !== 0) {
      setCurrentIndex(CurrentIndex - 1);
    }
  };

  const clickRightIcon = () => {
    if (CurrentIndex !== 3) {
      setCurrentIndex(CurrentIndex + 1);
    }
  };

  useEffect(() => {
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];

      console.log(info, data);

      const c = [
        <div className="part1">
          <div className="contents-title">{data.title}</div>
          <div className="contents-description">{data.description}</div>
        </div>,
        <div className="part2">
          <div className="contents-skill">
            {info.spells.map((el: any, idx: number) => {
              return (
                <>
                  <img
                    src={`${API.championSpell}/${el.image.full}`}
                    alt=""
                  ></img>
                  <div>{data.skills[idx]}</div>
                </>
              );
              //
            })}
          </div>
        </div>,
        <div className="part3">
          <div className="play">{data.play[0]}</div>
          <div className="enemy">{data.play[1]}</div>
        </div>,
        <div className="part4">
          <div className="etc">{data.etc}</div>
        </div>,
      ];
      setcontent(c);
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
      <div className="text-box">
        {content.length > 0 && content[CurrentIndex]}
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
