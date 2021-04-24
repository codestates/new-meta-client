import React, { ReactElement, useState, useEffect, useRef } from "react";

interface Props {
  IsLogin: boolean;
}

function Hamburger({ IsLogin }: Props): ReactElement {
  const dropdownRef = useRef<HTMLElement>(null);
  const [IsHamburgerOpen, setIsHamburgerOpen] = useState(false);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const hamburgerHandler = (e: { target: any }) => {
      if (dropdown && !dropdown.contains(e.target)) {
        setIsHamburgerOpen(!IsHamburgerOpen);
      }
    };
    if (IsHamburgerOpen) {
      window.addEventListener("click", hamburgerHandler);
    }
    return () => {
      window.removeEventListener("click", hamburgerHandler);
    };
  }, [IsHamburgerOpen]);

  return (
    <>
      <div className="hamburger">
        <button
          onClick={() => setIsHamburgerOpen(!IsHamburgerOpen)}
          className="menu-trigger"
          type="button"
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${IsHamburgerOpen ? "open" : "close"}`}
        >
          <ul>
            <li>
              <a href="players">Player</a>
            </li>
            <li>
              <a href="board">Champ</a>
            </li>
            {IsLogin ? (
              <li>
                <a href="mypage">Mypage</a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Hamburger;
