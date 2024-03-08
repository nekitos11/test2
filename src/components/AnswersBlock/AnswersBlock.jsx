import styles from "./AnswersBlock.module.scss";
import { Button } from "../Button/index.js";
import { useState } from "react";
import { ModalPolicy } from "../ModalPolicy/index.js";
import { createPortal } from "react-dom";
import { ModalUserInfoForm } from "../ModalUserInfoForm/index.js";
import { FormWrapper } from "../FormWrapper/index.js";

const questions = [
  {
    title: "Write down the final score of the derby",
    subText: "",
    placeholder: "Insert final score",
    id: 1,
  },
  {
    id: 2,
    placeholder: "Insert who will score",
    title: "Who will score for East Bengal FC?",
    subText:
      "(write “Nobody” if you think that our team will not be able to score against the opponent)",
  },
  {
    id: 3,
    placeholder: "Insert minute",
    title: "At what minute will the match score open?",
    subText: "(if you think the game will end with the score 0:0, write so)",
  },
];
export const AnswersBlock = () => {
  const [form, setForm] = useState({});

  const [showPolicyModal, setShowPolicyModal] = useState();
  const [showUserInfoModal, setShowUserInfoModal] = useState();
  const onFieldChange =
    (name, selector = (e) => e.target?.value) =>
    (e) => {
      setForm((prev) => ({
        ...prev,
        [name]: selector(e),
      }));
    };

  return (
    <>
      {showPolicyModal &&
        createPortal(
          <ModalPolicy
            onClose={() => setShowPolicyModal(false)}
            onClickDone={() => {
              setShowPolicyModal(false);
              onFieldChange("confirm", (e) => e)(true);
            }}
          />,
          document.body
        )}
      {showUserInfoModal &&
        createPortal(
          <ModalUserInfoForm
            onClose={() => setShowUserInfoModal(false)}
            onClickDone={() => {
              setShowUserInfoModal(false);
              // onFieldChange("confirm", (e) => e)(true);
            }}
            confirmPolicy={form.confirm}
            setShowPolicyModal={setShowPolicyModal}
            form={form}
            onFieldChange={onFieldChange}
          />,
          document.body
        )}

      <FormWrapper
        formWrapperClassName={styles.answersBlock}
        fields={questions}
        title={"Answer the questions"}
        isValid={(form) => form[1] && form[2] && form[3]}
        onSubmit={() => {
          setShowUserInfoModal(true);
        }}
        form={form}
        onFieldChange={onFieldChange}
        submitLabel="CONTINUE"
        id="answerForm"
      />
    </>
  );
};
