import { gql, useMutation } from "@apollo/client";
import { RouteComponentProps, withRouter } from "react-router-dom";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { TokenVar } from "../../../../graphql";

interface Props extends RouteComponentProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  AccountType: string;
}

function LeaveModal(props: Props): ReactElement {
  const { closeModal, AccountType } = props;
  const basicModalRef = useRef<HTMLDivElement>(null);
  const password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const basicModal = basicModalRef.current;
    const handleClickOutside = (e: { target: any }) => {
      if (basicModal && !basicModal.contains(e.target)) {
        closeModal(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LEAVE = gql`
    mutation Leave($password: String!) {
      deleteAccount(password: $password)
    }
  `;

  const [leaveQuery] = useMutation(LEAVE);

  const clickLeave = () => {
    leaveQuery({
      variables: {
        password: password.current?.value,
      },
    })
      .then((res) => {
        TokenVar(null);
        localStorage.clear();
        props.history.push("/");
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  return (
    <>
      <div className="modal-background">
        <div className="modal modal-box leave-modal" ref={basicModalRef}>
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn-close"
            type="button"
          >
            <i className="icon-cross"></i>
          </button>
          <div className="text">Are you really leaving?</div>

          {AccountType === "local" ? (
            <>
              <input
                ref={password}
                placeholder="Enter your paassword"
                className="password"
                type="password"
              ></input>
              <div className="btn-wrapper">
                <button onClick={clickLeave} className="font-red" type="button">
                  Leave
                </button>
                <button
                  onClick={() => {
                    closeModal(false);
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="btn-wrapper auth-btn-wrapper">
              <button onClick={clickLeave} className="font-red" type="button">
                Leave
              </button>
              <button
                onClick={() => {
                  closeModal(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withRouter(LeaveModal);
