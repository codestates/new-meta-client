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
  author: string;
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

function LikePostModal(props: Props): ReactElement {
  const { closeModal, data } = props;
  const [info, setinfo] = useState<any>(null);
  const [Data, setData] = useState<post>({
    ...data,
    play: JSON.parse(data.play),
    skills: JSON.parse(data.skills),
  });
  const basicModalRef = useRef<HTMLDivElement>(null);

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
                <div className="title">{Data.title}</div>
                <div className="description">{Data.description}</div>
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
                      <div className="skill-text">{Data.skills[idx]}</div>
                    </div>
                  );
                })}
            </div>
            <div className="play">
              <div className="play-a">
                <div className="label">Play</div>
                <div className="text">{Data.play[0]}</div>
              </div>
              <div className="play-b">
                <div className="label">Enemy</div>
                <div className="text">{Data.play[1]}</div>
              </div>
              <div className="play-c">
                <div className="label">etc</div>
                <div className="text">{Data.etc}</div>
              </div>
            </div>
          </div>
          <div className="date-data">
            <div className="created">Created : {created}</div>
            <div className="updated">Updated : {updated}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LikePostModal;
