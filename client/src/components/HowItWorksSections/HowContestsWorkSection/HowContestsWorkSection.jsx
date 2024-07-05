import CONSTANTS from '../../../constants';
import HowNamingWorksBox from './HowNamingWorksBox/HowNamingWorksBox';
import styles from './HowContestsWorkSection.module.sass';
import TEXT_CONTANTS from '../../../textConstanst';

function HowContestsWorkSection() {
  const listOfHowWorksBoxes = TEXT_CONTANTS.HOW_NAMING_WORKS_BOXES.map(
    (text, index) => (
      <HowNamingWorksBox
        key={text}
        text={text}
        stepIndex={index + 1}
        isLast={TEXT_CONTANTS.HOW_NAMING_WORKS_BOXES.length === index + 1}
      />
    )
  );

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
