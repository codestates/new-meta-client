/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import API from "../../../../api";

interface Props {
  data: any;
}

function BoardDetail(props: Props): ReactElement {
  const { data } = props;

  const [viewData, setdata] = useState(data);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [info, setinfo] = useState<any>(null);
  const textTag = useRef<HTMLDivElement>(null);
  const partTag = useRef<HTMLDivElement>(null);

  const clickLeftIcon = () => {
    if (CurrentIndex === 0) {
      return null;
    }
    textTag.current?.children[CurrentIndex].classList.remove("is-active");
    textTag.current?.children[CurrentIndex - 1].classList.add("is-active");
    const box = document.querySelector(".text-box");
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let textBoxWidth: string = "0px";
    if (box) {
      textBoxWidth = window.getComputedStyle(box).width;
      console.log(window.getComputedStyle(box).width);
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

  const STAR = gql`
    mutation CreateLike($postId: String!) {
      createLike(postId: $postId) {
        post {
          title
        }
      }
    }
  `;

  const [starQuery] = useMutation(STAR);

  const clickStar = () => {
    starQuery({
      variables: {
        postId: data.id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  useEffect(() => {
    textTag.current?.children[1].classList.remove("is-active");
    textTag.current?.children[2].classList.remove("is-active");
    textTag.current?.children[3].classList.remove("is-active");
    textTag.current?.children[0].classList.add("is-active");
    const tt = textTag.current?.style;
    if (tt) {
      tt.transform = `translateX(0px)`;
    }
    setdata(data);
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];
      setinfo(info);
      // const contentsArr = [];
      // setcontent(contentsArr);
      setCurrentIndex(0);
    };
    run();
  }, [data]);

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
        <div ref={partTag} className="part part1 is-active">
          <div className="contents-title">{viewData.title}</div>
          <div className="contents-description">{viewData.description}</div>
        </div>
        <div className="part part2">
          <div className="contents-skill">
            {info &&
              info.spells.map((el: any, idx: number) => {
                return (
                  <div className="skill-group" key={idx}>
                    <img
                      src={`${API.championSpell}/${el.image.full}`}
                      alt=""
                    ></img>
                    <div>{viewData.skills[idx]}</div>
                  </div>
                );
                //
              })}
          </div>
        </div>
        <div className="part part3">
          <div className="label">플레이 할 때</div>
          <div className="play">{viewData.play[0]}</div>
          <div className="label">상대 할 때</div>
          <div className="enemy">{viewData.play[1]}</div>
        </div>
        <div className="part part4">
          <div className="label">꿀 팁</div>
          <div className="etc">{viewData.etc}</div>
          <div className="button-group">
            <div className="user">
              <i className="icon-user"></i>
              <div className="author">{viewData.author}</div>
            </div>
            <div aria-hidden onClick={clickStar} className="star">
              {/* <i className="icon-star-full"></i> */}
              <i className="icon-star-empty"></i>
              <div className="state">Star</div>
            </div>
          </div>
        </div>
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
