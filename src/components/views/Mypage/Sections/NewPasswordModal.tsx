import { gql, useMutation } from "@apollo/client";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

interface Props {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

function NewPasswordModal(props: Props): ReactElement {
  const { closeModal } = props;
  const basicModalRef = useRef<HTMLDivElement>(null);
  const pw1 = useRef<HTMLInputElement>(null);
  const pw2 = useRef<HTMLInputElement>(null);

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

  const NEW_PASSWORD = gql`
    mutation pwCng($data: UpdatePasswordType!) {
      changePassword(data: $data) {
        id
      }
    }
  `;

  const [newPWQuery] = useMutation(NEW_PASSWORD);

  const clickConfirm = () => {
    if (pw1.current && pw2.current) {
      const pw1Data = pw1.current.value;
      const pw2Data = pw2.current.value;

      newPWQuery({
        variables: {
          data: {
            currentPassword: pw1Data,
            newPassword: pw2Data,
          },
        },
      })
        .then((res) => {
          // console.log(res);
          closeModal(false);
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
    //
  };

  return (
    <>
      <div className="modal-background">
        <div className="modal modal-box new-password-modal" ref={basicModalRef}>
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn-close"
            type="button"
          >
            <i className="icon-cross"></i>
          </button>
          <div className="text">Change Password</div>

          <div className="label">Current</div>
          <input
            ref={pw1}
            placeholder="Inter Current paassword"
            className="password1"
            type="password"
          ></input>
          <div className="label">New</div>
          <input
            ref={pw2}
            placeholder="Inter New password"
            className="password2"
            type="password"
          ></input>

          <div className="btn-wrapper">
            <button
              onClick={() => {
                closeModal(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button onClick={clickConfirm} type="button">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPasswordModal;
