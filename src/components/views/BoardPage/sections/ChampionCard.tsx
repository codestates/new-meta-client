import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import tempImage from "../../../../assets/image/loading-screen-assets.png";
import API from "../../../../api";

interface Props {
  data: any;
}

export default function ChampionCard(props: Props): ReactElement {
  const { data } = props;
  const [SplashImage, setSplashImage] = useState("");
  const { blurb, info, name, tags, title } = data;

  useEffect(() => {
    const run = async () => {
      const result: any = await axios
        .get(`${API.championSplash}${data.id}_0.jpg`)
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
        <img src={SplashImage} alt=""></img>
      </div>
      <div
        className="card-side back"
        onClick={(e) => {
          e.currentTarget.parentElement?.classList.toggle("rotate-again");
          e.currentTarget.parentElement?.classList.toggle("rotate");
        }}
        aria-hidden="true"
      >
        <div className="text-box">
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
            {tags.map((el: string) => (
              <div>{el}</div>
            ))}
          </div>
          <div className="blurb">{blurb} </div>
          <i className="icon-arrow-right-circle"></i>
        </div>
      </div>
    </div>
  );
}
