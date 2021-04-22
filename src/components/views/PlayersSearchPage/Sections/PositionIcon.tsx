/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-restricted-syntax */
import React, { ReactElement, useEffect, useState } from "react";
import TOP from "../../../../assets/image/position/icon-top.png";
import JUNGLE from "../../../../assets/image/position/icon-jng.png";
import MID from "../../../../assets/image/position/icon-mid.png";
import SUPPORT from "../../../../assets/image/position/icon-spt.png";
import AD_CARRY from "../../../../assets/image/position/icon-adc.png";
import { LaneInfo } from "../interface";

interface Props {
  userData: LaneInfo;
}
function PositionIcon(props: Props): ReactElement {
  const { userData } = props;

  function getMainPosition(object: LaneInfo): string {
    const max = Object.values(object).reduce((acc, cur) => {
      return acc > cur ? acc : cur;
    });

    const array = ["TOP", "JUNGLE", "MID", "AD_CARRY", "SUPPORT"];
    let mainPosition = "";
    for (const el of array) {
      if (object[el] === max) {
        mainPosition = el;
      }
    }
    return mainPosition;
  }

  const MainPosition = getMainPosition(userData);

  return (
    <>
      {MainPosition === "JUNGLE" ? (
        <img src={JUNGLE} alt="" className="position-icon" width="64" />
      ) : MainPosition === "TOP" ? (
        <img src={TOP} alt="" className="position-icon" width="64" />
      ) : MainPosition === "MID" ? (
        <img src={MID} alt="" className="position-icon" width="64" />
      ) : MainPosition === "AD_CARRY" ? (
        <img src={AD_CARRY} alt="" className="position-icon" width="64" />
      ) : (
        <img src={SUPPORT} alt="" className="position-icon" width="64" />
      )}
    </>
  );
}

export default PositionIcon;
