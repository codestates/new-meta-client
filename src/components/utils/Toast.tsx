import React, { ReactElement } from "react";

interface Props {
  ToastMessage: { success: string; fail: string };
  setToastMessage: any;
}

function Toast({ ToastMessage, setToastMessage }: Props): ReactElement {
  const closeToast = () => {
    setToastMessage({});
  };

  if (ToastMessage.success || ToastMessage.fail) {
    setTimeout(() => {
      setToastMessage({});
    }, 5000);
  }

  return (
    <>
      {ToastMessage.success || ToastMessage.fail ? (
        <div className="toast-wrapper">
          {ToastMessage.success ? (
            <div className="toast toast-success">
              <span className="toast-msg">{ToastMessage.success}</span>
              <span className="toast-close-icon">
                <i
                  className="icon-cross"
                  onClick={closeToast}
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
                  onClick={closeToast}
                  aria-hidden="true"
                />
              </span>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Toast;
