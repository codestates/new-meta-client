import React, { ReactElement, useState, useEffect } from "react";
import Bronze from "../../../../assets/image/emblem/Bronze.png";
import Challenger from "../../../../assets/image/emblem/Challenger.png";
import Diamond from "../../../../assets/image/emblem/Diamond.png";
import Gold from "../../../../assets/image/emblem/Gold.png";
import Grandmaster from "../../../../assets/image/emblem/Grandmaster.png";
import Iron from "../../../../assets/image/emblem/Iron.png";
import Master from "../../../../assets/image/emblem/Master.png";
import Platinum from "../../../../assets/image/emblem/Platinum.png";
import Silver from "../../../../assets/image/emblem/Silver.png";
import { LeagueInfo } from "../interface";

interface Props {
  userData: LeagueInfo;
}
function TierIcon(props: Props): ReactElement {
  const { userData } = props;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [props]);

  return <div></div>;
}

export default TierIcon;
