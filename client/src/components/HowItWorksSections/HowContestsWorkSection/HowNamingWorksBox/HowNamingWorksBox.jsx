import styles from './HowNamingWorksBox.module.sass';
import { BsArrowRight } from "react-icons/bs";
function HowNamingWorksBox({stepIndex, text, isLast}) {
  return (
    <section className={styles.box}>
      <div className={styles.step}>Step {stepIndex}</div>
      <p className={styles.text}>{text}</p>
      {!isLast && <BsArrowRight className={styles.arrow} size={'28px'}/>}
    </section>
  );
}

export default HowNamingWorksBox;
