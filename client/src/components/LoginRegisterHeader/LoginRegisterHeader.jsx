import { Link } from 'react-router-dom';
import Logo from '../Logo';
import CONSTANTS from '../../constants';
import styles from './LoginRegisterHeader.module.sass';

//TODO* "button" jumps a litle between Login and Regist because of page scroll on Regist
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
