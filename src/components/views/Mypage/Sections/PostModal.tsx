/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import API from "../../../../api";

interface Props {
  closeModal: Dispatch<SetStateAction<boolean>>;
  data: any;
}

interface post {
  champion: string;
  createdAt: string;
  description: string;
  etc: string;
  id: string;
  play: string[];
  skills: string[];
  title: string;
  updatedAt: string;
}

function PostModal(props: Props): ReactElement {
  const { closeModal, data } = props;
  const [info, setinfo] = useState<any>(null);
  const [EditMode, setEditMode] = useState(false);
  const [Data, setData] = useState<post>({
    ...data,
    play: JSON.parse(data.play),
    skills: JSON.parse(data.skills),
  });
  const basicModalRef = useRef<HTMLDivElement>(null);

  const titleTag = useRef<HTMLInputElement>(null);
  const descriptionTag = useRef<HTMLInputElement>(null);
  const skillTagQ = useRef<HTMLInputElement>(null);
  const skillTagW = useRef<HTMLInputElement>(null);
  const skillTagE = useRef<HTMLInputElement>(null);
  const skillTagR = useRef<HTMLInputElement>(null);

  const skillTagList = [skillTagQ, skillTagW, skillTagE, skillTagR];

  const playTag = useRef<HTMLInputElement>(null);
  const enemyTag = useRef<HTMLInputElement>(null);
  const etcTag = useRef<HTMLInputElement>(null);

  const clickEdit = () => {
    setEditMode(true);
  };

  const clickEditCancel = () => {
    setEditMode(false);
  };

  const UPDATE_POST = gql`
    mutation UpdatePost($data: UpdatePostInputType!) {
      updatePost(data: $data) {
        post {
          id
          champion
          title
          description
          skills
          play
          etc
          createdAt
          updatedAt
        }
      }
    }
  `;

  const [updatePostQuery] = useMutation(UPDATE_POST, {
    refetchQueries: [
      {
        query: gql`
          {
            readMyPosts {
              id
              champion
              title
              description
              skills
              play
              etc
              createdAt
              updatedAt
            }
          }
        `,
      },
    ],
  });

  const clickConfirm = () => {
    // update 쿼리 날리기
    const postData = {
      id: data.id,
      champion: data.champion,
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
    updatePostQuery({
      variables: {
        data: postData,
      },
    })
      .then((res) => {
        const updatedData = res.data.updatePost.post;
        setEditMode(false);
        const result = {
          ...updatedData,
          play: JSON.parse(updatedData.play),
          skills: JSON.parse(updatedData.skills),
        };
        setData(result);
      })
      .catch((err) => console.log("err : ", err));
  };

  const DELETE_POST = gql`
    mutation DeletePost($postId: String!) {
      deletePost(postId: $postId)
    }
  `;

  const [deletePostQuery] = useMutation(DELETE_POST, {
    refetchQueries: [
      {
        query: gql`
          {
            readMyPosts {
              id
              champion
              title
              description
              skills
              play
              etc
              createdAt
              updatedAt
            }
          }
        `,
      },
    ],
  });

  const clickDelete = () => {
    // update 쿼리 날리기
    deletePostQuery({
      variables: {
        postId: data.id,
      },
    }).then((res) => {
      console.log(res);
      closeModal(false);
    });
  };

  useEffect(() => {
    const run = async () => {
      const champInfo = await axios.get(
        `${API.championInfo}/${data.champion}.json`
      );
      const info = champInfo.data.data[data.champion];
      setinfo(info);
    };
    run();

    const basicModal = basicModalRef.current;
    const handleClickOutside = (e: { target: any }) => {
      if (basicModal && !basicModal.contains(e.target)) {
        closeModal(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      titleTag.current &&
      descriptionTag.current &&
      skillTagQ.current &&
      skillTagW.current &&
      skillTagE.current &&
      skillTagR.current &&
      playTag.current &&
      enemyTag.current &&
      etcTag.current
    ) {
      titleTag.current.value = Data.title;
      descriptionTag.current.value = Data.description;
      skillTagQ.current.value = Data.skills[0];
      skillTagW.current.value = Data.skills[1];
      skillTagE.current.value = Data.skills[2];
      skillTagR.current.value = Data.skills[3];
      playTag.current.value = Data.play[0];
      enemyTag.current.value = Data.play[1];
      etcTag.current.value = Data.etc;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EditMode]);

  const created = Data.createdAt.slice(0, 10).split("-").join(".");
  const updated = Data.updatedAt.slice(0, 10).split("-").join(".");
  return (
    <>
      <div className="modal-background post-modal-background">
        <div className="modal modal-box post-modal" ref={basicModalRef}>
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn-close"
            type="button"
          >
            <i className="icon-cross"></i>
          </button>
          <div className="contents-box">
            <div className="head">
              <div className="square">
                <img
                  src={`${API.championSquare}/${Data?.champion}.png`}
                  alt=""
                ></img>
                <div className="champion">{Data.champion}</div>
              </div>
              <div className="head-text">
                {EditMode ? (
                  <>
                    <input className="title" ref={titleTag}></input>
                    <input className="description" ref={descriptionTag}></input>
                  </>
                ) : (
                  <>
                    <div className="title">{Data.title}</div>
                    <div className="description">{Data.description}</div>
                  </>
                )}
              </div>
            </div>
            <div className="skill-list">
              {info &&
                info.spells.map((el: any, idx: number) => {
                  return (
                    <div className="skill-group" key={idx}>
                      <img
                        src={`${API.championSpell}/${el.image.full}`}
                        alt=""
                      ></img>
                      {EditMode ? (
                        <>
                          <input
                            ref={skillTagList[idx]}
                            className="skill-text"
                          ></input>
                        </>
                      ) : (
                        <>
                          <div className="skill-text">{Data.skills[idx]}</div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="play">
              <div className="play-a">
                <div className="label">Play</div>
                {EditMode ? (
                  <>
                    <input className="text" ref={playTag}></input>
                  </>
                ) : (
                  <>
                    <div className="text">{Data.play[0]}</div>
                  </>
                )}
              </div>
              <div className="play-b">
                <div className="label">Enemy</div>
                {EditMode ? (
                  <>
                    <input className="text" ref={enemyTag}></input>
                  </>
                ) : (
                  <>
                    <div className="text">{Data.play[1]}</div>
                  </>
                )}
              </div>
              <div className="play-c">
                <div className="label">etc</div>
                {EditMode ? (
                  <>
                    <input className="text" ref={etcTag}></input>
                  </>
                ) : (
                  <>
                    <div className="text">{Data.etc}</div>
                  </>
                )}
              </div>
            </div>

            {/* <div className="title">{Data?.title}</div>
            <div className="title">{Data?.title}</div> */}
          </div>
          <div className="date-data">
            <div className="created">Created : {created}</div>
            <div className="updated">Updated : {updated}</div>
          </div>
          <div className="btn-wrapper">
            {EditMode ? (
              <>
                <button onClick={clickEditCancel} type="button">
                  Cancel
                </button>
                <button onClick={clickConfirm} type="button">
                  Confirm
                </button>
              </>
            ) : (
              <>
                <button
                  className="font-red"
                  onClick={clickDelete}
                  type="button"
                >
                  Delete
                </button>
                <button onClick={clickEdit} type="button">
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModal;
