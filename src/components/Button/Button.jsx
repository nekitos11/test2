import styles from "./Button.module.scss";

export const Button = ({
  label,
  wrapperClassname = "",
  ...buttonProps
}) => {
  return (
    <button className={`${styles.buttonWrapper} ${wrapperClassname}`} {...buttonProps}>
      {label}
    </button>
  );
};
