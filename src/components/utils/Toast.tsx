import React, { ReactElement, useEffect } from "react";

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
  const closeToast = () => {
    setToastMessage({ success: "", fail: "" });
  };

  if (ToastMessage.success || ToastMessage.fail) {
    setTimeout(() => {
      closeToast();
      if (ToastMessage.success) {
        closeModal();
      }
    }, 4000);
  }

  useEffect(() => {
    return () => {
      setToastMessage({
        success: "",
        fail: "",
      });
    };
  }, [setToastMessage]);

  return (
    <div className="toast-wrapper">
      {ToastMessage.success ? (
        <div className="toast toast-success">
          <span className="toast-msg">{ToastMessage.success}</span>
          <span className="toast-close-icon">
            <i
              className="icon-cross"
              onClick={() => {
                closeToast();
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
            <i className="icon-cross" onClick={closeToast} aria-hidden="true" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Toast;
