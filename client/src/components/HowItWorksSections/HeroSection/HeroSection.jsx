import CONSTANTS from '../../../constants';
import styles from './HeroSection.module.sass';
import { FaPlay } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.fullHeroContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.textContainer}>
            <h4 className={styles.tag}>World's #1 Naming Platform</h4>
            <h1 className={styles.heroMainText}>How Does Atom Work?</h1>
            <p className={styles.descriptionText}>
              Atom helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </div>
          <a href="https://vimeo.com/826948811" className={styles.button}>
            <FaPlay /> Play Video
          </a>
        </div>
        <img
          className={styles.heroImage}
          src={CONSTANTS.HERO_SECTION_IMAGE_PATH}
          alt="appUser"
        />
      </div>
    </section>
  );
}

export default HeroSection;
