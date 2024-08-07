import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CONSTANTS from '../../constants';
import styles from './LoginButtons.module.sass';
import TEXT_CONTANTS from '../../textConstanst';

function LoginButtons({ data, logOut }) {
  const LinkList = TEXT_CONTANTS.USER_INFO_LINK_LIST.map(({ text, url }) =>
    data?.role === CONSTANTS.MODERATOR &&
    CONSTANTS.UNAVAILABLE_PAGES_MODERATOR.includes(url) ? null : (
      <li key={text}>
        <Link to={url} className={styles.menuText}>
          {text}
        </Link>
      </li>
    )
  );

  if (data) {
    return (
      <>
        <div className={styles.userInfo}>
          <img
            src={
              data.avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.PUBLIC_IMAGES_URL}${data.avatar}`
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
            {LinkList}
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
      </>
    );
  }
  return (
    <>
      <Link to="/login" className={styles.loginAndRegistration}>
        LOGIN
      </Link>
      <Link to="/registration" className={styles.loginAndRegistration}>
        SIGN UP
      </Link>
    </>
  );
}

export default LoginButtons;
