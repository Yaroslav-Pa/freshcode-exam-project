import { Link } from 'react-router-dom';
import styles from './UserLink.module.sass';
function UserLink({ url, text, isLocal }) {
  if (isLocal)
    return (
      <Link to={url} className={styles.menuText}>
        {text}
      </Link>
    );
  return (
    <a href={url} className={styles.menuText}>
      {text}
    </a>
  );
}

export default UserLink;
