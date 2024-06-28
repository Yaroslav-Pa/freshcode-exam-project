import { Link } from 'react-router-dom';
import styles from './WaysToUseBox.module.sass';
import { BsArrowRight } from "react-icons/bs";

function WaysToUseBox({ imageUrl, mainText, descriptionText, linkUrl, linkText }) {
  return (
    <section className={styles.useBox}>
      <div className={styles.useBoxContainer}>
        <div className={styles.useBoxTextContainer}>
          <img src={imageUrl} alt="containerImage" className={styles.useBoxIcon} />
          <h3 className={styles.useBoxMainText}>{mainText}</h3>
          <p className={styles.useBoxDescriptionText}>{descriptionText}</p>
        </div>
        <Link to={linkUrl} className={styles.button}>
          {linkText} <BsArrowRight size={"25px"} className={styles.buttonArrow}/>
        </Link>
      </div>
    </section>
  );
}

export default WaysToUseBox;
