import React, { ReactElement } from "react";
import logo from "../../../assets/image/newmeta-logo-spell.png";

// interface Props {}

function Footer(): ReactElement {
  return (
    <div className="footer display-none">
      <div className="logo">
        <img src={logo} alt=""></img>
        <div className="text">
          We want to be happy every moment we enjoy the game.
        </div>
        <div className="policy-en">
          © 2021 new-meta isn’t endorsed by Riot Games and doesn’t reflect the
          views or opinions of Riot Games or anyone officially involved in
          producing or managing League of Legends. League of Legends and Riot
          Games are trademarks or registered trademarks of Riot Games, Inc.
          League of Legends © Riot Games, Inc.
        </div>
        <a
          href="https://support-leagueoflegends.riotgames.com/hc/en-us/articles/225266848"
          className="policy-ko"
        >
          라이엇 게임즈 공식 규정 준수
        </a>
        {/* <div className="copyright">2021 Copyright @ CHALLENGERS Team.</div> */}
      </div>
      <div className="info">
        <div className="label">QnA</div>
        <div className="mores">
          <a
            href="https://github.com/codestates/im26project08-client/wiki/Requirements"
            className="more"
          >
            Requirements
          </a>
          <a
            href="https://github.com/codestates/im26project08-client/wiki/DB-schema"
            className="more"
          >
            Schema
          </a>
          <a
            href="https://github.com/codestates/im26project08-client/wiki/Wireframe"
            className="more"
          >
            Wireframe
          </a>
          <a
            href="https://github.com/codestates/im26project08-client/wiki/FlowChart"
            className="more"
          >
            Flow Chart
          </a>
          <a
            href="https://github.com/codestates/im26project08-client/wiki/API"
            className="more"
          >
            API
          </a>
          <br />
          <a
            href="https://www.notion.so/5b77b8ec9b334d38b676f764c5ab8eed?v=6ad562ed027a4b1c83f5ea51096db317"
            className="more"
          >
            Reference
          </a>
        </div>
      </div>
      <div className="team">
        <div className="label">Team</div>
        <div className="members">
          <a href="https://github.com/osunguk" className="member">
            Oh Sung kook
          </a>
          <a href="https://github.com/jess-yon" className="member">
            Lee Yeon ju
          </a>
          <a href="https://github.com/nahsooyeon" className="member">
            Na Su yeon
          </a>
          <a href="https://github.com/chachagogogo" className="member">
            Yang Hae seung
          </a>
        </div>
      </div>
      <div className="connect">
        <div className="label">Connect</div>
        <div className="icons">
          <i
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              location.href = "https://github.com/codestates/new-meta-client";
              return null;
            }}
            aria-hidden
            className="icon-github"
          ></i>
          <i className="icon-facebook"></i>
          <i className="icon-google"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
