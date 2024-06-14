import Header from '../../components/Header/Header';
import styles from './HowItWorks.module.sass';
import { FaPlay } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import WaysToUseBox from '../../components/WaysToUseBox/WaysToUseBox';
import HowNamingWorksBox from '../../components/HowNamingWorksBox/HowNamingWorksBox';
import { replaceSpace } from '../../utils/textFormating';
import QuestionAnswerCollapsible from '../../components/QuestionAnswerCollapsible/QuestionAnswerCollapsible';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';

const {
  POPULAR_SEARCHES,
  WAYS_TO_USE_BOXES,
  HOW_NAMING_WORKS_BOXES,
  FAQ_SECTIONS,
} = CONSTANTS;

const HowItWorks = () => {
  const listOfWaysToUseBoxes = WAYS_TO_USE_BOXES.map((box) => (
    <WaysToUseBox {...box} key={box.mainText} />
  ));

  const listOfHowWorksBoxes = HOW_NAMING_WORKS_BOXES.map((box, index) => (
    <HowNamingWorksBox
      key={box.text}
      {...box}
      stepIndex={index + 1}
      isLast={HOW_NAMING_WORKS_BOXES.length === index + 1}
    />
  ));

  const faqNavButtonList = FAQ_SECTIONS.map(({ sectionName }) => (
    //TODO! why Link not working correctly here? ( Temporarily replaced to just <a>)
    <a
      href={`#${replaceSpace(sectionName)}`}
      key={sectionName}
      className={styles.faqNavButton}
    >
      {sectionName}
    </a>
  ));

  const faqSectionsList = FAQ_SECTIONS.map(({ sectionName, content }) => (
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
  ));

  const popularSearchesList = POPULAR_SEARCHES.map((text) => (
    <Link to="#" className={styles.searches} key={text}>
      {text}
    </Link>
  ));

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.fullHeroContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.textContainer}>
              <h4 className={styles.tag}>World's #1 Naming Platform</h4>
              <h1 className={styles.heroMainText}>How Does Atom Work?</h1>
              <p className={styles.descriptionText}>
                Atom helps you come up with a great name for your business by
                combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
            </div>
            <a href="https://vimeo.com/826948811" className={styles.button}>
              <FaPlay /> Play Video
            </a>
          </div>
          <img
            className={styles.heroImage}
            src="https://www.atom.com/resources/assets/svg/illustrations/app-user.svg"
            alt="appUser"
          />
        </div>
      </section>
      {/* Ways To Use Section */}
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
      {/* How Contests Work Section */}
      <section className={styles.workSection}>
        <div className={styles.workContainer}>
          <div className={styles.workTextContainer}>
            <img
              src="https://www.atom.com/resources/assets/svg/icons/icon-27.svg"
              alt="workImg"
              className={styles.workImg}
            />
            <h1 className={styles.workMainText}>
              How Do Naming Contests Work?
            </h1>
          </div>
          <article className={styles.workBoxsContainer}>
            {listOfHowWorksBoxes}
          </article>
        </div>
      </section>
      {/* Frequently Asked Questions */}
      <section className={styles.faqSection}>
        <div className={styles.faqNavContainer}>
          <h1 className={styles.faqMainText}>Frequently Asked Questions</h1>
          <nav className={styles.faqNavButtonContainer}>{faqNavButtonList}</nav>
        </div>
        <section className={styles.questionContainer}>
          {faqSectionsList}
        </section>
      </section>
      {/* Search Section*/}
      <section className={styles.searchSection}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={'Search Over 200,000+ Premium Names'}
          />
          <HiMagnifyingGlass className={styles.searchInputGlass} />
          <button className={styles.searchInputButton}>
            <BsArrowRight className={styles.searchInputButtonArrow} />
          </button>
        </div>

        <div className={styles.searchesContainer}>
          <p className={styles.searchesText}>Popular searches</p>
          <div className={styles.listContainer}>{popularSearchesList}</div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
