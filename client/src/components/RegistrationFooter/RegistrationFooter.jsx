import styles from './RegistrationFooter.module.sass';
import TEXT_CONTANTS from '../../textConstanst';

const splitTexts = (texts, splitIndex) => {
  return [texts.slice(0, splitIndex), texts.slice(splitIndex)];
};

const textList = (arr) =>
  arr.map(({ theme, text, isInnerHtml = false }) => (
    <div key={theme}>
      <h1 className={styles.headerArticle}>{theme}</h1>
      <p
        className={styles.article}
        {...(isInnerHtml
          ? { dangerouslySetInnerHTML: { __html: text } }
          : { children: text })}
      ></p>
    </div>
  ));

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
