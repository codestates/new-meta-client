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

  const titleTag = useRef<HTMLInputElement>(null);
  const descriptionTag = useRef<HTMLInputElement>(null);
  const skillTagQ = useRef<HTMLTextAreaElement>(null);
  const skillTagW = useRef<HTMLTextAreaElement>(null);
  const skillTagE = useRef<HTMLTextAreaElement>(null);
  const skillTagR = useRef<HTMLTextAreaElement>(null);

  const playTag = useRef<HTMLTextAreaElement>(null);
  const enemyTag = useRef<HTMLTextAreaElement>(null);
  const etcTag = useRef<HTMLTextAreaElement>(null);

  const postData = {
    champion: CurrentChampion,
    author: "osunguk", // todo : user 데이터로 바꾸기
    createdAt: Date.now(),
    updatedAt: Date.now(),
    title: titleTag.current?.value,
    description: descriptionTag.current?.value,
    skills: [
      skillTagQ.current?.value,
      skillTagW.current?.value,
      skillTagE.current?.value,
      skillTagR.current?.value,
    ],
    play: [playTag.current?.value, enemyTag.current?.value],
    etc: etcTag.current?.value,
  };

  console.log(postData);

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

  const clickPost = () => {
    // todo : 서버에 게시물 등록 요청
    // axios
  };

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
              <input ref={titleTag} type="text"></input>
            </div>
            <div className="post-subtitle">
              <p>description</p>
              <input ref={descriptionTag} type="text"></input>
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
            <textarea ref={skillTagQ}></textarea>
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
            <textarea ref={skillTagW}></textarea>
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
            <textarea ref={skillTagE}></textarea>
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
            <textarea ref={skillTagR}></textarea>
          </div>
        </div>
        <div className="write-page page-3">
          <div className="title">Tip`s</div>
          <div className="label">플레이할 때</div>
          <textarea ref={playTag} className="play-tips"></textarea>
          <div className="label">상대 할 때</div>
          <textarea ref={enemyTag} className="enemy-tips"></textarea>
        </div>
        <div className="write-page page-4">
          <div className="title">.etc</div>
          <textarea ref={etcTag} className="another-tips"></textarea>
          <button onClick={clickPost} className="post-btn" type="button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(BoardWritePage);
