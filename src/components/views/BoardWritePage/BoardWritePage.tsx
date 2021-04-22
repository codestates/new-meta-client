/* eslint-disable react/no-array-index-key */
import React, {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import rift from "../../../assets/image/summonersrift.jpg";
import API from "../../../api";

// interface Props {}

const patchVersion = "11.7.1";

function BoardWritePage(props: RouteComponentProps): ReactElement {
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

  const POST = gql`
    mutation CreatePost($data: CreatePostInputType!) {
      createPost(data: $data) {
        title
      }
    }
  `;
  const GET_ALL_POST = gql`
    {
      fetchAllPostsOrderByCreatedAt {
        id
        champion
        title
        description
        skills
        play
        etc
        author
        createdAt
        updatedAt
      }
    }
  `;
  const [postGraghpl, { data }] = useMutation(POST, {
    refetchQueries: [{ query: GET_ALL_POST }],
  });

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
    if (
      titleTag.current?.value &&
      descriptionTag.current?.value &&
      skillTagQ.current?.value &&
      skillTagW.current?.value &&
      skillTagE.current?.value &&
      skillTagR.current?.value &&
      playTag.current?.value &&
      enemyTag.current?.value &&
      etcTag.current?.value
    ) {
      const postData = {
        champion: CurrentChampion,
        title: titleTag.current?.value,
        description: descriptionTag.current?.value,
        skills: JSON.stringify([
          skillTagQ.current?.value,
          skillTagW.current?.value,
          skillTagE.current?.value,
          skillTagR.current?.value,
        ]),
        play: JSON.stringify([playTag.current?.value, enemyTag.current?.value]),
        etc: etcTag.current?.value,
      };

      postGraghpl({
        variables: {
          data: postData,
        },
      }).then((res) => {
        // console.log("res", res);
        const location = {
          pathname: "/board/",
          state: {
            page: 0,
          },
        };
        props.history.push(location);
      });
    } else {
      alert("공략을 모두 작성해주세요");
    }
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

  if (!CurrentChampion) {
    // console.log("챔피언 미선택");
    indexBox.current?.children[1].classList.add("display-none");
    indexBox.current?.children[2].classList.add("display-none");
    indexBox.current?.children[3].classList.add("display-none");
    indexBox.current?.children[4].classList.add("display-none");
  } else {
    indexBox.current?.children[1].classList.remove("display-none");
    indexBox.current?.children[2].classList.remove("display-none");
    indexBox.current?.children[3].classList.remove("display-none");
    indexBox.current?.children[4].classList.remove("display-none");
  }

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
          <div className="search-bar-write">
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
          <button
            className="btn-next"
            type="button"
            onClick={(e) => {
              clickIndex(CurrentIndex + 1, e);
              const indexBoxDiv = indexBox.current;
              indexBoxDiv?.children[CurrentIndex].classList.remove("selected");
              indexBoxDiv?.children[CurrentIndex + 1].classList.add("selected");
            }}
          >
            Next
          </button>
          <div className="current-champion-img">
            {CurrentChampion && (
              <img
                alt=""
                src={`${API.championLoading}/${CurrentChampion}_0.jpg`}
              ></img>
            )}
          </div>
          <div className="title-input-form">
            <div className="champ-name">{CurrentChampion}</div>
            <div className="post-title">
              <p>Title</p>
              <input
                ref={titleTag}
                type="text"
                maxLength={50}
                placeholder="ex ) ??? 장인 1000판 꿀팁 대 공개"
              ></input>
            </div>
            <div className="post-subtitle">
              <p>Description</p>
              <input
                ref={descriptionTag}
                type="text"
                maxLength={50}
                placeholder="ex ) ??? 메타 탑승하는 방법"
              ></input>
            </div>
          </div>
        </div>
        <div className="write-page page-2">
          <button
            className="btn-next page-2"
            type="button"
            onClick={(e) => {
              clickIndex(CurrentIndex + 1, e);
              const indexBoxDiv = indexBox.current;
              indexBoxDiv?.children[CurrentIndex].classList.remove("selected");
              indexBoxDiv?.children[CurrentIndex + 1].classList.add("selected");
            }}
          >
            Next
          </button>
          <div className="title">Skills</div>
          <div className="skill-q">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[0][1]}</div>
                <div className="skill-img">
                  <img
                    src={`${API.championSpell}/${SkillImages[0][0]}`}
                    alt=""
                  ></img>
                </div>
              </>
            )}
            <textarea
              maxLength={50}
              ref={skillTagQ}
              placeholder=" 소환사님만의 스킬 사용법을 알려주세요!"
            ></textarea>
          </div>
          <div className="skill-w">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[1][1]}</div>
                <div className="skill-img">
                  <img
                    src={`${API.championSpell}/${SkillImages[1][0]}`}
                    alt=""
                  ></img>
                </div>
              </>
            )}
            <textarea
              ref={skillTagW}
              placeholder=" 소환사님만의 스킬 사용법을 알려주세요!"
            ></textarea>
          </div>
          <div className="skill-e">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[2][1]}</div>
                <div className="skill-img">
                  <img
                    src={`${API.championSpell}/${SkillImages[2][0]}`}
                    alt=""
                  ></img>
                </div>
              </>
            )}
            <textarea
              ref={skillTagE}
              placeholder=" 소환사님만의 스킬 사용법을 알려주세요!"
            ></textarea>
          </div>
          <div className="skill-r">
            {SkillImages.length > 0 && (
              <>
                <div className="skill-name">{SkillImages[3][1]}</div>
                <div className="skill-img">
                  <img
                    src={`${API.championSpell}/${SkillImages[3][0]}`}
                    alt=""
                  ></img>
                </div>
              </>
            )}
            <textarea
              ref={skillTagR}
              placeholder=" 소환사님만의 스킬 사용법을 알려주세요!"
            ></textarea>
          </div>
        </div>
        <div className="write-page page-3">
          <button
            className="btn-next"
            type="button"
            onClick={(e) => {
              clickIndex(CurrentIndex + 1, e);
              const indexBoxDiv = indexBox.current;
              indexBoxDiv?.children[CurrentIndex].classList.remove("selected");
              indexBoxDiv?.children[CurrentIndex + 1].classList.add("selected");
            }}
          >
            Next
          </button>
          <div className="title">Tip`s</div>
          <div className="label">플레이할 때</div>
          <textarea
            ref={playTag}
            className="play-tips"
            placeholder=" 챔피언의 플레이 스타일을 작성해주세요!"
          ></textarea>
          <div className="label">상대 할 때</div>
          <textarea
            ref={enemyTag}
            className="enemy-tips"
            placeholder=" 챔피언의 챔피언 상대법을 알려주세요!"
          ></textarea>
        </div>
        <div className="write-page page-4">
          <div className="title">.etc</div>
          <textarea
            ref={etcTag}
            className="another-tips"
            placeholder=" 그 외에 독특한 챔피언 팁이 있다면 알려주세요!"
          ></textarea>
          <button onClick={clickPost} className="post-btn" type="button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(BoardWritePage);
