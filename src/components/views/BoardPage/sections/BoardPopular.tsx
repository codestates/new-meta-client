/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { ReactElement, useRef } from "react";
import API from "../../../../api";

interface Props {
  data: {
    champion: string;
    user: {
      nickname: string;
    };
    createdAt: string; // todo 추후 변경
    updatedAt: string; // todo 추후 변경
    title: string;
    description: string;
    skills: string[];
    play: string[];
    etc: string;
    numberOfLikes: number;
  };

  setCurrentBoard: React.Dispatch<
    React.SetStateAction<{
      champion: string;
      user: {
        nickname: string;
      };
      createdAt: string;
      updatedAt: string;
      title: string;
      description: string;
      skills: string[];
      play: string[];
      etc: string;
      numberOfLikes: number;
    }>
  >;
}

function BoardPopular(props: Props): ReactElement {
  const { data, setCurrentBoard } = props;

  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={() => {
        setCurrentBoard(data);
      }}
      onMouseEnter={() => {
        section1.current?.classList.remove("mouse-over");
        section2.current?.classList.add("mouse-over");
      }}
      onMouseLeave={() => {
        section1.current?.classList.add("mouse-over");
        section2.current?.classList.remove("mouse-over");
      }}
      aria-hidden
      className="board-small"
    >
      <img src={`${API.championSquare}/${data.champion}.png`} alt=""></img>
      <div ref={section1} className="simple-text mouse-over">
        <div className="champ-name">{data.champion}</div>
        <div className="author">{data.user.nickname}</div>
      </div>
      <div ref={section2} className="simple-text2">
        <i className="icon-star-full"></i>
        <div className="like-num">{data.numberOfLikes}</div>
      </div>
    </div>
  );
}

export default BoardPopular;
