/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import API from "../../../api";
import { removeFooter } from "../../utils/displayfooter";

interface Champion {
  id: string;
  name: string;
  key: string;
  title: string;
  allytips: string[];
  blurb: string;
  lore: string;
  enemytips: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  passive: {
    description: string;
    name: string;
  };
  spells: [
    { id: string; name: string; description: string; image: { full: string } },
    { id: string; name: string; description: string; image: { full: string } },
    { id: string; name: string; description: string; image: { full: string } },
    { id: string; name: string; description: string; image: { full: string } }
  ];
  tags: string[];
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
  };
}

function BoardReadPage(props: RouteComponentProps): ReactElement {
  // eslint-disable-next-line react/destructuring-assignment
  const { state }: any = props.location;
  const [ChampionInfo, setChampionInfo] = useState<Champion | undefined>(
    undefined
  );
  const [Skins, setSkins] = useState<string[]>([]);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [Spells, setSpells] = useState([]);

  function previousSlide(): void {
    const lastIndex = Skins.length - 1;
    const shouldResetIndex = CurrentIndex === 0;
    const index = shouldResetIndex ? lastIndex : CurrentIndex - 1;
    setCurrentIndex(index);
  }
  function nextSlide(): void {
    const lastIndex = Skins.length - 1;
    const shouldResetIndex = CurrentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : CurrentIndex + 1;
    setCurrentIndex(index);
  }
  useEffect(() => {
    removeFooter();
    const run = async () => {
      const result = await axios.get(`${API.championInfo}/${state.id}.json`);
      const temp = result.data.data[state.id];
      const skinNumberList = Object.values(temp.skins).reduce<number[]>(
        function (a: any, b: any) {
          a.push(b.num);
          return a;
        },
        []
      );

      const skins = await Promise.all(
        skinNumberList.map((el: number) => {
          return axios.get(
            `${API.championSplash}/${result.data.data[state.id].id}_${String(
              el
            )}.jpg`
          );
        })
      );
      const skinsURL: Array<string> = skins.reduce<string[]>(function (
        acc: any,
        cur: any
      ) {
        acc.push(cur.config.url);
        return acc;
      },
      []);
      setSpells(
        result.data.data[state.id].spells.reduce((acc: any, cur: any) => {
          acc.push(cur.image.full);
          return acc;
        }, [])
      );

      setSkins(skinsURL);
      setChampionInfo(result.data.data[state.id]);
    };
    run();
  }, [state.id]);

  return (
    <div>
      {state ? (
        <div className="board-read-page">
          <div className="champion-title-image">
            <img className="blur-img" src={Skins[CurrentIndex]} alt=""></img>
            <i
              onClick={previousSlide}
              aria-hidden="true"
              className="icon-arrow-left-circle icon-left"
            ></i>
            <div className="image-wrapper">
              <img src={Skins[CurrentIndex]} alt=""></img>
            </div>
            <i
              onClick={nextSlide}
              aria-hidden="true"
              className="icon-arrow-right-circle icon-right"
            ></i>
          </div>
          <div className="champion-introduce">
            <div className="title">{ChampionInfo?.name}</div>
            <div className="title-en">{ChampionInfo?.id}</div>
          </div>
          <div className="champion-contents">
            <div className="box-label">Story</div>
            <div className="story-title">
              &quot; {ChampionInfo?.title} &quot;
            </div>
            <div className="story">
              <div className="white-space"></div>
              <div className="story-text">{ChampionInfo?.lore}</div>
              <div className="white-space"></div>
            </div>
            <div className="box-label">Skill</div>
            <div className="skills">
              {ChampionInfo?.spells.map((el, idx) => {
                return (
                  <div key={idx}>
                    {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                    <img
                      onMouseEnter={(e) => {
                        const temp = e.currentTarget.parentElement;
                        const temp2 = temp?.children[1];
                        temp2?.classList.add("view-skill-text");
                      }}
                      onMouseOut={(e) => {
                        const temp = e.currentTarget.parentElement;
                        const temp2 = temp?.children[1];
                        temp2?.classList.remove("view-skill-text");
                      }}
                      aria-hidden="true"
                      src={`${API.championSpell}/${Spells[idx]}`}
                      alt=""
                    ></img>
                    <div className="skill-description">
                      <div className="skill-name">{el.name}</div>
                      <div className="skill-explanation">{el.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="box-label">Tip</div>
            <div className="tips">
              <div className="white-space"></div>
              <div className="play-tips">
                <div className="play-tips-title">플레이 할 경우</div>
                <div className="tip-box">
                  {ChampionInfo?.allytips.map((el, idx) => {
                    return (
                      <div className="tip" key={idx}>
                        <div className="numbering">{idx + 1}</div>
                        {el}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="enemy-tips">
                <div className="enemy-tips-title">상대하게 될 경우</div>
                <div className="tip-box">
                  {ChampionInfo?.enemytips.map((el, idx) => {
                    return (
                      <div className="tip" key={idx}>
                        <div className="numbering">{idx + 1}</div>
                        {el}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="white-space"></div>
            </div>
          </div>
        </div>
      ) : (
        // location 에 챔피언 데이터가 없으면 /board 로 이동시킴
        <Redirect to="/board" />
      )}
    </div>
  );
}

export default withRouter(BoardReadPage);
