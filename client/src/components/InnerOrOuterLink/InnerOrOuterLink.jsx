import { Link } from 'react-router-dom';
import styles from './InnerOrOuterLink.module.sass';
function InnerOrOuterLink({
  url = 'https://google.com',
  text,
  isInnerLink = false,
  index,
  linkStyle,
}) {
  return isInnerLink ? (
    <Link to={url} className={styles.menuLink}>
      <p className={linkStyle(index)}>{text.toUpperCase()}</p>
    </Link>
  ) : (
    <a href={url} className={styles.menuLink}>
      <p className={linkStyle(index)}>{text.toUpperCase()}</p>
    </a>
  );
}

export default InnerOrOuterLink;
