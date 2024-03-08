import styles from "./Banner.module.scss";
import { Button } from "../Button/index.js";

export const Banner = () => {
  const onJoinClick = () => {
    const answerForm = document.getElementById("answerForm");
    window.scrollTo({
      top: window.scrollY + answerForm.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };
  return (
    <section className={styles.banner}>
      <div className={styles.promo}>
        <h3>10 March</h3>
        <div className={styles.promo__info}>
          Predict the result of the Kolkata derby and win prizes!
        </div>
        <Button
          onClick={onJoinClick}
          wrapperClassname={styles.promo__join}
          label="JOIN NOW"
        />
      </div>
    </section>
  );
};
