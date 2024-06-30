import styles from './FAQSection.module.sass';
import { HashLink } from 'react-router-hash-link';
import classNames from 'classnames';
import QuestionAnswerCollapsible from './QuestionAnswerCollapsible/QuestionAnswerCollapsible';
import {
  replaceSpace,
  scrollWithOffset,
} from '../../../utils/scrollAndFormatFunctions';
import TEXT_CONTANTS from '../../../textConstanst';

function FAQSection() {
  const faqNavButtonClasnames = (buttonsHesh) =>
    classNames(styles.faqNavButton, {
      [styles.faqNavButtonActive]: window.location.hash === buttonsHesh,
    });

  const faqNavButtonList = TEXT_CONTANTS.FAQ_SECTIONS.map(({ sectionName }) =>
    //TODO Link was not working correctly, so used founded replacement
    {
      const buttonHesh = `#${replaceSpace(sectionName)}`;
      return (
        <HashLink
          to={buttonHesh}
          key={sectionName}
          scroll={(el) => scrollWithOffset(el)}
          smooth
          className={faqNavButtonClasnames(buttonHesh)}
        >
          {sectionName}
        </HashLink>
      );
    }
  );

  const faqSectionsList = TEXT_CONTANTS.FAQ_SECTIONS.map(
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
