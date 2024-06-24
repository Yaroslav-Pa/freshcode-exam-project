import CONSTANTS from '../../constants';
import HowNamingWorksBox from '../HowNamingWorksBox/HowNamingWorksBox';
import styles from './HowContestsWorkSection.module.sass';

function HowContestsWorkSection() {
  const listOfHowWorksBoxes = CONSTANTS.HOW_NAMING_WORKS_BOXES.map((box, index) => (
    <HowNamingWorksBox
      key={box.text}
      {...box}
      stepIndex={index + 1}
      isLast={CONSTANTS.HOW_NAMING_WORKS_BOXES.length === index + 1}
    />
  ));
  
  return (
    <section className={styles.workSection}>
      <div className={styles.workContainer}>
        <div className={styles.workTextContainer}>
          <img
            src={CONSTANTS.NAMING_CONTESTS_IMAGE_PATH}
            alt="workImg"
            className={styles.workImg}
          />
          <h1 className={styles.workMainText}>How Do Naming Contests Work?</h1>
        </div>
        <article className={styles.workBoxsContainer}>
          {listOfHowWorksBoxes}
        </article>
      </div>
    </section>
  );
}

export default HowContestsWorkSection;
