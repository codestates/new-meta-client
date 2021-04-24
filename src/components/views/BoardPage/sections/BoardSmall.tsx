/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { ReactElement, useRef } from "react";
import API from "../../../../api";

interface Props {
  data: {
    champion: string;
    createdAt: string; // todo 추후 변경
    updatedAt: string; // todo 추후 변경
    title: string;
    description: string;
    skills: string[];
    play: string[];
    etc: string;
    user: {
      id: string;
      nickname: string;
    };
    numberOfLikes: number;
  };

  setCurrentBoard: React.Dispatch<
    React.SetStateAction<{
      champion: string;
      createdAt: string;
      updatedAt: string;
      title: string;
      description: string;
      skills: string[];
      play: string[];
      etc: string;
      user: {
        id: string;
        nickname: string;
      };
      numberOfLikes: number;
    }>
  >;
}

function BoardSmall(props: Props): ReactElement {
  const { data, setCurrentBoard } = props;

  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const section4 = useRef<HTMLDivElement>(null);

  return (
    <div
      className="board-small"
      onClick={() => {
        setCurrentBoard(data);
      }}
      aria-hidden
    >
      <div ref={section1} className="simple-text">
        <div className="champion-name">{data.champion}</div>
        <img src={`${API.championSplash}/${data.champion}_0.jpg`} alt=""></img>
      </div>
      <div ref={section2} className="simple-text2">
        <div className="small-title">{data.title}</div>
        <div className="small-description">{data.description}</div>
      </div>
      <div ref={section3} className="simple-text3">
        <div>{data.user.nickname}</div>
      </div>
      <div ref={section4} className="simple-text4">
        <i className="icon-star-full"></i>
        <div className="like-num">{data.numberOfLikes}</div>
      </div>
    </div>
  );
}

export default BoardSmall;
