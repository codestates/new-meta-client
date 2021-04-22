import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql";
import Popup from "./Popup";

export default (SpecificComponent: ComponentType, option: boolean) => {
  function Auth(props: any): ReactElement {
    const currentUser = useQuery(GET_CURRENT_USER);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const popupMessage = "로그인이 필요한 페이지입니다.";
    const btnMessage = "메인으로 돌아가기";

    useEffect(() => {
      if (!currentUser.data.token && option) {
        setIsPopupOpen(true);
      }
    }, [IsPopupOpen, currentUser, props]);

    return IsPopupOpen ? (
      <Popup
        popupMessage={popupMessage}
        btnMessage={btnMessage}
        IsPopupOpen={IsPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    ) : (
      <SpecificComponent />
    );
  }
  return Auth;
};
