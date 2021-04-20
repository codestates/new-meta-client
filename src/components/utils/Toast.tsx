import React, { ReactElement, useEffect, useRef } from "react";

interface Props {
  ToastMessage: { success: string; fail: string };
  setToastMessage: (ToastMessage: { success: string; fail: string }) => void;
  closeModal: () => void;
}

function Toast({
  ToastMessage,
  setToastMessage,
  closeModal,
}: Props): ReactElement {
  const toastElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toastEl = toastElRef.current;
    const toastCloseHandler = (e: { target: any }) => {
      if (toastEl && !toastEl.contains(e.target)) {
        setToastMessage({ success: "", fail: "" });
      }
    };
    if (ToastMessage.success || ToastMessage.fail) {
      window.addEventListener("click", toastCloseHandler);
    }
    return () => {
      window.removeEventListener("click", toastCloseHandler);
    };
  }, [ToastMessage.fail, ToastMessage.success, setToastMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToastMessage({ success: "", fail: "" });
      if (ToastMessage.success) {
        closeModal();
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [ToastMessage.success, closeModal, setToastMessage]);

  return (
    <div className="toast-wrapper" ref={toastElRef}>
      {ToastMessage.success ? (
        <div className="toast toast-success">
          <span className="toast-msg">{ToastMessage.success}</span>
          <span className="toast-close-icon">
            <i
              className="icon-cross"
              onClick={() => {
                setToastMessage({ success: "", fail: "" });
                closeModal();
              }}
              aria-hidden="true"
            />
          </span>
        </div>
      ) : (
        <div className="toast toast-error">
          <span className="toast-msg">{ToastMessage.fail}</span>
          <span className="toast-close-icon">
            <i
              className="icon-cross"
              onClick={() => {
                setToastMessage({ success: "", fail: "" });
              }}
              aria-hidden="true"
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default Toast;
