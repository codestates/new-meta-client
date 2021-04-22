import React, { ComponentType, ReactElement, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql";

export default (SpecificComponent: ComponentType, option: boolean) => {
  function Auth(props: any): ReactElement {
    const currentUser = useQuery(GET_CURRENT_USER);

    useEffect(() => {
      if (!currentUser.data.token && option) {
        props.history.push("/");
      }
    }, [currentUser, props]);

    return <SpecificComponent />;
  }
  return Auth;
};
