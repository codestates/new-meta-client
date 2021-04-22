/* eslint-disable no-nested-ternary */
import React, { ReactElement, useState, useEffect } from "react";
import BRONZE from "../../../../assets/image/emblem/Bronze.png";
import CHALLENGER from "../../../../assets/image/emblem/Challenger.png";
import DIAMOND from "../../../../assets/image/emblem/Diamond.png";
import GOLD from "../../../../assets/image/emblem/Gold.png";
import GRANDMASTER from "../../../../assets/image/emblem/Grandmaster.png";
import IRON from "../../../../assets/image/emblem/Iron.png";
import MASTER from "../../../../assets/image/emblem/Master.png";
import PLATINUM from "../../../../assets/image/emblem/Platinum.png";
import SILVER from "../../../../assets/image/emblem/Silver.png";
import { LeagueInfo } from "../interface";

interface Props {
  userData: string;
}
function TierIcon(props: Props): ReactElement {
  const { userData } = props;

  return (
    <>
      {userData === "BRONZE" ? (
        <img src={BRONZE} alt="" className="tier-icon" />
      ) : userData === "CHALLENGER" ? (
        <img src={CHALLENGER} alt="" className="tier-icon" />
      ) : userData === "DIAMOND" ? (
        <img src={DIAMOND} alt="" className="tier-icon" />
      ) : userData === "GOLD" ? (
        <img src={GOLD} alt="" className="tier-icon" />
      ) : userData === "GRANDMASTER" ? (
        <img src={GRANDMASTER} alt="" className="tier-icon" />
      ) : userData === "IRON" ? (
        <img src={IRON} alt="" className="tier-icon" />
      ) : userData === "MASTER" ? (
        <img src={MASTER} alt="" className="tier-icon" />
      ) : userData === "PLATINUM" ? (
        <img src={PLATINUM} alt="" className="tier-icon" />
      ) : (
        <img src={SILVER} alt="" className="tier-icon" />
      )}
    </>
  );
}

export default TierIcon;
