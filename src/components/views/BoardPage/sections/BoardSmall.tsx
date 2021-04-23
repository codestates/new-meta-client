/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { ReactElement, useRef } from "react";

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

function BoardSmall(props: Props): ReactElement {
  const { data, setCurrentBoard } = props;

  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const section4 = useRef<HTMLDivElement>(null);

  return (
    <div
      // onMouseEnter={() => {
      //   section1.current?.classList.remove("mouse-over");
      //   section2.current?.classList.add("mouse-over");
      // }}
      // onMouseLeave={() => {
      //   section1.current?.classList.add("mouse-over");
      //   section2.current?.classList.remove("mouse-over");
      // }}
      className="board-small"
    >
      {/* <img src={`${API.championSquare}/${data.champion}.png`} alt=""></img> */}
      <div ref={section1} className="simple-text">
        <div>{data.champion}</div>
      </div>
      <div ref={section2} className="simple-text2">
        <div
          onClick={() => {
            setCurrentBoard(data);
          }}
          aria-hidden
        >
          {data.title}
        </div>
        {/* <div>{data.description}</div> */}
      </div>
      <div ref={section3} className="simple-text3">
        <div>author</div>
        {/* <div>{`author: ${data.author}`}</div> */}
      </div>
      <div ref={section4} className="simple-text4">
        <div>author</div>
        {/* <div>{`author: ${data.author}`}</div> */}
      </div>
    </div>
  );
}

export default BoardSmall;
