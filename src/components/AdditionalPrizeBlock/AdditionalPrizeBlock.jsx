import styles from "./AdditionalPrizeBlock.module.scss";

export const AdditionalPrizeBlock = () => (
  <section className={styles.additionalPrizeBlock}>
    <div className={`${styles.item} ${styles.mainItem}`}>
      First 100 participants get tickets for the game!
    </div>

    <div className={styles.arrowItemWrapper}>
      <div className={styles.arrowItemWrapper__arrow}></div>
      <div className={`${styles.item}`}>First 15 get VIP tickets!</div>
      <div className={styles.arrowItemWrapper__arrow}></div>
    </div>
  </section>
);
