/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import API from "../../../../api";

interface Props extends RouteComponentProps {
  data: any;
  inreaseCounter: any;
}

function ChampionCard(props: Props): ReactElement {
  const { data, inreaseCounter } = props;
  const [SplashImage, setSplashImage] = useState("");
  const { blurb, info, name, tags, title } = data;

  useEffect(() => {
    const run = async () => {
      const result: any = await axios
        .get(`${API.championLoading}/${data.id}_0.jpg`)
        .then((res) => res.config.url);
      setSplashImage(result);
    };
    run();
  }, [data.id]);
  return (
    <div
      className="champion-card"
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
    >
      <img
        src={SplashImage}
        alt=""
        loading="lazy"
        onLoad={inreaseCounter}
      ></img>
      <div className="card-info">
        <div>{name}</div>
        <div>&lt;{title}&gt;</div>
        <div>
          {tags.map((el: string, idx: number) => {
            return <div key={idx}>{el}</div>;
          })}
        </div>
        <div className="diff">
          난이도 :
          {info.difficulty < 4
            ? " 쉬움"
            : info.difficulty < 7
            ? " 보통"
            : " 어려움"}
        </div>
        <br />
      </div>
    </div>
  );
}

export default withRouter(ChampionCard);

/*
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
          */
