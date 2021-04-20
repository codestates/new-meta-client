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

function PostModal(props: Props): ReactElement {
  const { closeModal } = props;
  const basicModalRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="modal-background post-modal-background">
        <div className="modal-box post-modal" ref={basicModalRef}>
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn-close"
            type="button"
          >
            <i className="icon-cross"></i>
          </button>

          <div className="btn-wrapper">
            <button type="button">Delete</button>
            <button type="button">Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModal;
