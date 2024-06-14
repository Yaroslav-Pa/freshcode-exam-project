import { HiMagnifyingGlass } from 'react-icons/hi2';
import CONSTANTS from '../../constants';
import styles from './SearchSection.module.sass';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

function SearchSection() {
  const popularSearchesList = CONSTANTS.POPULAR_SEARCHES.map((text) => (
    <Link to="#" className={styles.searches} key={text}>
      {text}
    </Link>
  ));

  return (
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
  );
}

export default SearchSection;
