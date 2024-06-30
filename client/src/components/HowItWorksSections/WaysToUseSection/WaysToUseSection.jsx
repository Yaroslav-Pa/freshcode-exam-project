import TEXT_CONTANTS from '../../../textConstanst';
import WaysToUseBox from './WaysToUseBox/WaysToUseBox';
import styles from './WaysToUseSection.module.sass';

const WaysToUseSection = () => {
  const listOfWaysToUseBoxes = TEXT_CONTANTS.WAYS_TO_USE_BOXES.map((box) => (
    <WaysToUseBox {...box} key={box.mainText} />
  ));

  return (
    <section className={styles.useSection}>
      <div className={styles.useContainer}>
        <div className={styles.useTextContainer}>
          <h4 className={styles.useTag}>Our Services</h4>
          <h1 className={styles.useMainText}>3 Ways To Use Atom</h1>
          <p className={styles.useDescriptionText}>
            Atom offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <article className={styles.useBoxsContainer}>
          {listOfWaysToUseBoxes}
        </article>
      </div>
    </section>
  );
};

export default WaysToUseSection;
