import React, { ReactElement } from "react";
import { withRouter } from "react-router";

function Popup(props: any): ReactElement {
  const { popupMessage, btnMessage, IsPopupOpen, setIsPopupOpen } = props;

  return (
    <>
      {IsPopupOpen ? (
        <div className="basic-popup-background">
          <div className="basic-popup-box">
            <div className="result-message">{popupMessage}</div>
            <div className="btn-wrapper popup">
              <button
                className="close-btn"
                onClick={() => {
                  setIsPopupOpen(false);
                  props.history.push("/");
                }}
                type="button"
              >
                {btnMessage}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default withRouter(Popup);
