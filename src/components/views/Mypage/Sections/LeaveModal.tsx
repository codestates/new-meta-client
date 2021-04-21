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

function LeaveModal(props: Props): ReactElement {
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
      <div className="modal-background">
        <div className="modal-box" ref={basicModalRef}>
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
            <button type="button">Leave</button>
            <button type="button">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaveModal;
