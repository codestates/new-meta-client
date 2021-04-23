/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { ReactElement, useRef } from "react";
import API from "../../../../api";

interface Props {
  data: {
    champion: string;
    author: string;
    createdAt: string; // todo 추후 변경
    updatedAt: string; // todo 추후 변경
    title: string;
    description: string;
    skills: string[];
    play: string[];
    etc: string;
  };

  setCurrentBoard: React.Dispatch<
    React.SetStateAction<{
      champion: string;
      author: string;
      createdAt: string;
      updatedAt: string;
      title: string;
      description: string;
      skills: string[];
      play: string[];
      etc: string;
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
      <div ref={section1} className="simple-text">
        <div>{data.champion}</div>
        <div>{data.author}</div>
      </div>
      <div ref={section2} className="simple-text2">
        <div>{data.title}</div>
        <div>{data.description}</div>
      </div>
    </div>
  );
}

export default BoardPopular;
