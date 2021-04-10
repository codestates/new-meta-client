/* eslint-disable react/no-array-index-key */
import React, {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import rift from "../../../assets/image/summonersrift.jpg";
import { removeFooter } from "../../utils/displayfooter";
import API from "../../../api";

// interface Props {}

const patchVersion = "11.7.1";

function BoardWritePage(): ReactElement {
  removeFooter();

  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [Champions, setChampions] = useState<string[]>([]);
  const [CurrentChampion, setCurrentChampion] = useState<string>("");
  const [SkillImages, setSkillImages] = useState<string[]>([]);
  const writeBox = useRef<HTMLDivElement>(null);
  const indexBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const result = await axios.get(API.allChampionInfo);
      const squareImages = Object.values(result.data.data).map((el: any) => {
        return `${API.championSquare}/${el.id}.png`;
      });

      setChampions(squareImages);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickIndex = (index: number, e: MouseEvent): void => {
    // console.log("test");

    e.currentTarget.parentElement?.children[CurrentIndex].classList.remove(
      "selected"
    );
    e.currentTarget.classList.add("selected");

    const { current } = writeBox;
    current?.children[CurrentIndex].classList.remove("is-active");
    setCurrentIndex(index);
    current?.children[index].classList.add("is-active");
  };

  const clickChampion = (index: number): void => {
    const { current } = writeBox;
    current?.children[CurrentIndex].classList.remove("is-active");
    setCurrentIndex(index);
    current?.children[index].classList.add("is-active");

    const indexBoxDiv = indexBox.current;
    indexBoxDiv?.children[0].classList.remove("selected");
    indexBoxDiv?.children[1].classList.add("selected");
  };

  return (
    <div className="board-write-page">
      <div className="back-blur">
        <img src={rift} alt="" />
      </div>
      <div ref={indexBox} className="index-box">
        <div
          onClick={(e: MouseEvent) => clickIndex(0, e)}
          aria-hidden="true"
          className="index-item selected"
        >
          Pick
        </div>
        <div
          onClick={(e: MouseEvent) => clickIndex(1, e)}
          aria-hidden="true"
          className="index-item"
        >
          Title
        </div>
        <div
          onClick={(e: MouseEvent) => clickIndex(2, e)}
          aria-hidden="true"
          className="index-item"
        >
          Skill
        </div>
        <div
          onClick={(e: MouseEvent) => clickIndex(3, e)}
          aria-hidden="true"
          className="index-item"
        >
          Tips
        </div>
        <div
          onClick={(e: MouseEvent) => clickIndex(4, e)}
          aria-hidden="true"
          className="index-item"
        >
          .etc
        </div>
      </div>
      <div ref={writeBox} className="write-box">
        <div className="write-page page-0 is-active">
          <div className="search-bar">
            <input type="text"></input>
            <i className="icon-search"></i>
          </div>
          <div className="champions-pick">
            {Champions.map((url, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    const championName: string = url
                      .split("/")
                      [url.split("/").length - 1].split(".")[0];
                    setCurrentChampion(championName);
                    axios
                      .get(`${API.championInfo}/${championName}.json`)
                      .then((res) => {
                        const { spells } = res.data.data[championName];

                        const result = spells.map((el: any) => {
                          return [el.image.full, el.name];
                        });
                        setSkillImages(result);
                      });
                    clickChampion(1);
                  }}
                  aria-hidden="true"
                  className="champions-pick-square"
                >
                  <img src={url} alt=""></img>
                </div>
              );
            })}
          </div>
        </div>

        <div className="write-page page-1">
          <div className="current-champion-img">
            <img
              alt=""
              src={`${API.championLoading}/${CurrentChampion}_0.jpg`}
            ></img>
          </div>
          <div className="title-input-form">
            <div className="post-title">
              <p>title</p>
              <input type="text"></input>
            </div>
            <div className="post-subtitle">
              <p>description</p>
              <input type="text"></input>
            </div>
          </div>
        </div>
        <div className="write-page page-2">
          <div className="title">Skills</div>
          <div className="skill-q">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[0][1]}</div>
                <img
                  src={`${API.championSpell}/${SkillImages[0][0]}`}
                  alt=""
                ></img>
              </>
            )}
            <textarea></textarea>
          </div>
          <div className="skill-w">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[1][1]}</div>
                <img
                  src={`${API.championSpell}/${SkillImages[1][0]}`}
                  alt=""
                ></img>
              </>
            )}
            <textarea></textarea>
          </div>
          <div className="skill-e">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[2][1]}</div>
                <img
                  src={`${API.championSpell}/${SkillImages[2][0]}`}
                  alt=""
                ></img>
              </>
            )}
            <textarea></textarea>
          </div>
          <div className="skill-r">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[3][1]}</div>
                <img
                  src={`${API.championSpell}/${SkillImages[3][0]}`}
                  alt=""
                ></img>
              </>
            )}
            <textarea></textarea>
          </div>
        </div>
        <div className="write-page page-3">
          <div className="title">Tip`s</div>
          <div className="label">플레이할 때</div>
          <textarea className="play-tips"></textarea>
          <div className="label">상대 할 때</div>
          <textarea className="enemy-tips"></textarea>
        </div>
        <div className="write-page page-4">
          <div className="title">.etc</div>
          <textarea className="another-tips"></textarea>
        </div>
      </div>
    </div>
  );
}

export default withRouter(BoardWritePage);
