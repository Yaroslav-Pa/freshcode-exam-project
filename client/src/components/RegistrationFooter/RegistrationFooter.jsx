import styles from './RegistrationFooter.module.sass';
import TEXT_CONTANTS from '../../textConstanst';

const splitTexts = (texts, splitIndex) => {
  return [texts.slice(0, splitIndex), texts.slice(splitIndex)];
};

const textList = (arr) =>
  arr.map(({ theme, text }) => (
    <div key={theme}>
      <h1 className={styles.headerArticle}>{theme}</h1>
      <p
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
    </div>
  ));

//TODO some word where selected in last paragraf of secondColumn

function RegistrationFooter() {
  const [firstColumn, secondColumn] = splitTexts(
    TEXT_CONTANTS.REGISTRATION_FAQ.items,
    TEXT_CONTANTS.REGISTRATION_FAQ.splitIndex
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
