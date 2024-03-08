import styles from "./HeaderFooter.module.scss";

export const HeaderFooter = () => (
  <header className={styles.header}>
    <img className={styles.logo} alt="logo" />
  </header>
);
