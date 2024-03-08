import styles from "./Select.module.scss";

export const Select = ({
  label,
  wrapperClassname = "",
  options,
  inputValue,
  ...selectProps
}) => {
  return (
    <select
      className={`${styles.select} ${wrapperClassname}`}
      value={inputValue}
      {...selectProps}
    >
      {options.map(({ value, label }) => (
        <option selected={value === inputValue} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
