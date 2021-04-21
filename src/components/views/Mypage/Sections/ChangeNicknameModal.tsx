import { gql, useMutation } from "@apollo/client";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

interface Props {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

function ChangeNicknameModal(props: Props): ReactElement {
  const { closeModal } = props;
  const basicModalRef = useRef<HTMLDivElement>(null);
  const inputTag = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

  const CHANGE = gql`
    mutation Change($newNickname: String!) {
      changeNickname(newNickname: $newNickname) {
        nickname
      }
    }
  `;

  const [changeQuery] = useMutation(CHANGE, {
    refetchQueries: [
      {
        query: gql`
          {
            myInfo {
              user {
                nickname
                email
              }
            }
          }
        `,
      },
    ],
  });

  const clickChange = () => {
    if (inputTag.current) {
      const inputData = inputTag.current?.value;
      if (inputData.length > 0) {
        changeQuery({
          variables: {
            newNickname: inputTag.current?.value,
          },
        })
          .then((res) => {
            closeModal(false);
          })
          .catch((err) => {
            console.log("error:", err);
          });
      }
    }
  };

  return (
    <>
      <div className="modal-background">
        <div className="modal modal-box change-modal" ref={basicModalRef}>
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn-close"
            type="button"
          >
            <i className="icon-cross"></i>
          </button>
          <div className="text">Enter a new nickname</div>
          <input ref={inputTag} type="text"></input>
          <div className="btn-wrapper">
            <button
              onClick={() => {
                closeModal(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button onClick={clickChange} type="button">
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeNicknameModal;
