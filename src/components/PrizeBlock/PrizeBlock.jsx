import styles from "./PrizeBlock.module.scss";

export const PrizeBlock = () => (
  <section className={styles.prizeBlock}>
    <div className={styles.item}>
      <h2>A brand new smartphone!</h2>
      <img src="@assets/images/prize1.png" />
      <p>Samsung Galaxy Z Flip5</p>
      <div className={styles.item__decoration}>
        <div />
        <div />
      </div>
    </div>
    <div className={styles.item}>
      <h2>Custom Jersey</h2>
      <img src="@assets/images/prize2.PNG" />
      <p>Custom East Bengal FC jersey with your name</p>
      <div className={`${styles.item__decoration_top}`}>
        <div />
        <div />
      </div>
    </div>
  </section>
);
