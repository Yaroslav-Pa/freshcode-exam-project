import styles from './RegistrationFooter.module.sass';
import CONSTANTS from '../../constants';
const { REGISTRATION_FAQ, REGISTRATION_FAQ_SPLIT_INDEX } = CONSTANTS;

const splitTexts = (texts, splitIndex) => {
  return [texts.slice(0, splitIndex), texts.slice(splitIndex)];
};

const textList = (arr) =>
  arr.map(({ theme, text }) => (
    <div key={theme}>
      <h1 className={styles.headerArticle}>{theme}</h1>
      <p className={styles.article}>{text}</p>
    </div>
  ));

function RegistrationFooter() {
  const [firstColumn, secondColumn] = splitTexts(
    REGISTRATION_FAQ,
    REGISTRATION_FAQ_SPLIT_INDEX
  );

  return (
    <footer className={styles.footer}>
      <section className={styles.articlesMainContainer}>
        <article className={styles.columnContainer}>
          {textList(firstColumn)}
        </article>
        <article className={styles.columnContainer}>
          {textList(secondColumn)}
        </article>
      </section>
    </footer>
  );
}

export default RegistrationFooter;
