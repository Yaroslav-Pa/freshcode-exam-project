import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CONSTANTS from '../../constants';
import styles from './LoginButtons.module.sass';

//TODO прибрати повтори

function LoginButtons({ data, logOut }) {
  if (data) {
    return (
      <section className={styles.userButtonsContainer}>
        <div className={styles.userInfo}>
          <img
            src={
              data.avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicImagesURL}${data.avatar}`
            }
            className={styles.avatar}
            alt="user"
          />
          <p className={styles.helloText}>{`Hi, ${data.displayName}`}</p>
          <img
            className={styles.avatar}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
            alt="menu"
          />
          <ul className={styles.dropdownMenu}>
            <li>
              <Link to="/dashboard" className={styles.menuText}>
                View Dashboard
              </Link>
            </li>
            <li>
              <Link to="/account" className={styles.menuText}>
                My Account
              </Link>
            </li>
            <li>
              <Link to="http://www.google.com" className={styles.menuText}>
                Messages
              </Link>
            </li>
            <li>
              <Link to="http://www.google.com" className={styles.menuText}>
                Affiliate Dashboard
              </Link>
            </li>
            <li>
              <button className={styles.menuText} onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.emailIcon}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} alt="email" />
        </div>
      </section>
    );
  }
  return (
    <section className={styles.userButtonsContainer}>
      <Link to="/login" className={styles.loginAndRegistration}>
        LOGIN
      </Link>
      <Link to="/registration" className={styles.loginAndRegistration}>
        SIGN UP
      </Link>
    </section>
  );
}

export default LoginButtons;
