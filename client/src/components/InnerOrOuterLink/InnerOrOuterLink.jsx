import { Link } from 'react-router-dom';
import styles from './InnerOrOuterLink.module.sass';
function InnerOrOuterLink({ url, name, isInnerLink = false, index, linkStyle }) {
  return isInnerLink ? (
    <Link to={url} className={styles.menuLink}>
      <p className={linkStyle(index)}>{name.toUpperCase()}</p>
    </Link>
  ) : (
    <a href={url} className={styles.menuLink}>
      <p className={linkStyle(index)}>{name.toUpperCase()}</p>
    </a>
  );
}

export default InnerOrOuterLink;
