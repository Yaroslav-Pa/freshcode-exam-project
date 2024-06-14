import styles from './FAQSection.module.sass';
import CONSTANTS from '../../constants';
import { replaceSpace } from '../../utils/textFormating';
import { HashLink } from 'react-router-hash-link';
import classNames from 'classnames';
import QuestionAnswerCollapsible from '../QuestionAnswerCollapsible/QuestionAnswerCollapsible';

function FAQSection() {
  const faqNavButtonClasnames = (buttonsHesh) =>
    classNames(styles.faqNavButton, {
      [styles.faqNavButtonActive]: window.location.hash === buttonsHesh,
    });

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -50;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const faqNavButtonList = CONSTANTS.FAQ_SECTIONS.map(({ sectionName }) => (
    //TODO Link was not working correctly, so used founded replacement
    <HashLink
      to={`#${replaceSpace(sectionName)}`}
      key={sectionName}
      scroll={(el) => scrollWithOffset(el)}
      smooth
      className={faqNavButtonClasnames(`#${replaceSpace(sectionName)}`)}
    >
      {sectionName}
    </HashLink>
  ));

  const faqSectionsList = CONSTANTS.FAQ_SECTIONS.map(
    ({ sectionName, content }) => (
      <div
        key={sectionName}
        className={styles.qaSectionContainer}
        id={replaceSpace(sectionName)}
      >
        <h3 className={styles.qasectionName}>{sectionName}</h3>
        <div className={styles.collapsibleContainer}>
          {content.map((elemet) => (
            <QuestionAnswerCollapsible {...elemet} key={elemet.question} />
          ))}
        </div>
      </div>
    )
  );

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqNavContainer}>
        <h1 className={styles.faqMainText}>Frequently Asked Questions</h1>
        <nav className={styles.faqNavButtonContainer}>{faqNavButtonList}</nav>
      </div>
      <article className={styles.questionContainer}>{faqSectionsList}</article>
    </section>
  );
}

export default FAQSection;
