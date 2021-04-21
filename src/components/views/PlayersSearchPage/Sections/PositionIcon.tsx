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
  MainPosition: string;
}
function PositionIcon(props: Props): ReactElement {
  const { userData, MainPosition } = props;
  useEffect(() => {
    console.log(MainPosition);
    return () => {};
  }, [userData, MainPosition]);

  return (
    <>
      {MainPosition === "JUNGLE" ? (
        <img src={JUNGLE} alt="" width="80" className="position-icon" />
      ) : MainPosition === "TOP" ? (
        <img src={TOP} alt="" width="80" className="position-icon" />
      ) : MainPosition === "MID" ? (
        <img src={MID} alt="" width="80" className="position-icon" />
      ) : MainPosition === "AD_CARRY" ? (
        <img src={AD_CARRY} alt="" width="80" className="position-icon" />
      ) : (
        <img src={SUPPORT} alt="" width="80" className="position-icon" />
      )}
    </>
  );
}

export default PositionIcon;
