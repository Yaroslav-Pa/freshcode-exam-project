import { Link } from 'react-router-dom';
import Logo from '../Logo';
import CONSTANTS from '../../constants';
import styles from './LoginRegisterHeader.module.sass';

function LoginRegisterHeader({ buttonText, url }) {
  return (
    <section className={styles.container}>
      <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
      <Link to={url} className={styles.link}>
        {buttonText}
      </Link>
    </section>
  );
}

export default LoginRegisterHeader;
