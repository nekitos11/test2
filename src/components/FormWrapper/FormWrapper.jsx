import styles from "./FormWrapper.module.scss";
import { Button } from "../Button/index.js";
import { useState } from "react";
import { ModalPolicy } from "../ModalPolicy/index.js";
import { createPortal } from "react-dom";
import { ModalUserInfoForm } from "../ModalUserInfoForm/index.js";

const Field = ({
  title,
  number,
  subText,
  inputValue,
  fieldTitle,
  onChange,
  placeholder,
  error,
  Input,
}) => (
  <div
    className={`${styles.field} ${error && styles.field_error} ${
      fieldTitle === null && styles.field__emplyFieldTitle
    }`}
  >
    {fieldTitle !== null && (
      <div className={styles.field__fieldTitle}>
        {fieldTitle ?? "Question " + number}
      </div>
    )}
    {title && (
      <div className={styles.field__titleWrapper}>
        <div className={styles.field__title}>{title}</div>
        {subText && <div className={styles.field__subText}>{subText}</div>}
      </div>
    )}

    {Input ? (
      <div
        className={`${styles.field__input} ${
          fieldTitle !== null && styles.field__inputMargin
        }`}
      >
        <Input
          onChange={onChange}
          inputValue={inputValue}
          placeholder={placeholder}
          fieldTitle={fieldTitle}
        />
      </div>
    ) : (
      <input
        onChange={onChange}
        value={inputValue ?? ''}
        placeholder={placeholder ?? "Text"}
        className={`${styles.field__input} ${
          fieldTitle !== null && styles.field__inputMargin
        }`}
      />
    )}
  </div>
);

export const FormWrapper = ({
  title = "",
  fields,
  submitLabel = "",
  isValid = () => {},
  onSubmit,
  onError,
  formWrapperClassName = "",
  onFieldChange,
  form,
  ...rest
}) => {
  const [error, setError] = useState();

  return (
    <section className={`${styles.form} ${formWrapperClassName}`} {...rest}>
      <div className={styles.form__title}>{title}</div>
      <div className={styles.form__formWrapper}>
        {fields.map(({ AdditionalField, ...q }, index) => (
          <div key={q.id}>
            <Field
              key={q.id}
              error={error && !form[q.id]}
              inputValue={form[q.id]}
              onChange={onFieldChange(q.id)}
              {...q}
              number={index + 1}
            />
            {AdditionalField && (
              <AdditionalField key={q.id} onFieldChange={onFieldChange} form={form} />
            )}
          </div>
        ))}
      </div>
      {error && "Attention! Fill in all input fields."}
      <Button
        onClick={() => {
          if (isValid(form)) {
            onSubmit();
            setError(false);
          } else {
            onError?.();
            setError(true);
          }
        }}
        label={submitLabel}
        wrapperClassname={styles.form__submit}
      />
    </section>
  );
};
