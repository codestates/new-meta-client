import React, { ReactElement, useEffect, useRef } from "react";

// interface Props {}

function Modal(): ReactElement {
  const basicModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const basicModal = basicModalRef.current;
    const handleClickOutside = (e: { target: any }) => {
      if (basicModal && !basicModal.contains(e.target)) {
        // state 내려받아서 모달 닫기
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="modal-background">
        <div className="modal-box" ref={basicModalRef}>
          <button className="btn-close" type="button">
            <i className="icon-cross"></i>
          </button>
          <br />
          <h2>Title</h2>
          <form>
            <div className="user-box login-email">
              <input className="input-email" placeholder="Email" type="email" />
            </div>
            <div className="user-box login-password">
              <input
                className="input-password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="btn-wrapper">
              <button type="submit">Button</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
