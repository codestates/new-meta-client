import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import API from "../../../../api";

interface Props extends RouteComponentProps {
  data: any;
}

function ChampionCard(props: Props): ReactElement {
  const { data } = props;
  const [SplashImage, setSplashImage] = useState("");
  const { blurb, info, name, tags, title } = data;

  useEffect(() => {
    const run = async () => {
      const result: any = await axios
        .get(`${API.championSplash}/${data.id}_0.jpg`)
        .then((res) => res.config.url);
      setSplashImage(result);
    };
    run();
  }, [data.id]);
  return (
    <div className="champion-card">
      <div
        className="card-side front"
        onClick={(e) => {
          if (e.currentTarget.parentElement?.classList.length !== 1) {
            e.currentTarget.parentElement?.classList.toggle("rotate-again");
          }
          e.currentTarget.parentElement?.classList.toggle("rotate");
        }}
        aria-hidden="true"
      >
        <img src={SplashImage} alt="" loading="lazy"></img>
      </div>
      <div className="card-side back">
        <div className="text-box">
          <div
            className="back-btn"
            onClick={(e) => {
              // eslint-disable-next-line no-unused-expressions
              e.currentTarget.parentElement?.parentElement?.parentElement?.classList.toggle(
                "rotate-again"
              );
              e.currentTarget.parentElement?.parentElement?.parentElement?.classList.toggle(
                "rotate"
              );
            }}
            aria-hidden="true"
          >
            <i className="icon-x-circle"></i>
          </div>
          <div className="name">
            {name} &lt;{title}&gt;
          </div>
          <div className="info">
            <div>attack : {info.attack}</div>
            <div>defense : {info.defense}</div>
            <div>magic : {info.magic}</div>
          </div>
          <div className="diff">난이도 : {info.difficulty}</div>
          <div className="styles">
            type :
            {tags.map((el: string, idx: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx}>{el}</div>
            ))}
          </div>
          <div className="blurb">{blurb} </div>
          <div
            onClick={() => {
              const location = {
                pathname: "/board/read",
                state: {
                  id: data.id,
                },
              };

              props.history.push(location);
            }}
            aria-hidden="true"
            className="page-into-btn"
          >
            <i className="icon-arrow-right-circle"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChampionCard);
