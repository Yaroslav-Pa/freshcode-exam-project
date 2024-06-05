import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import MenuSection from '../MenuSection/MenuSection';
import LoginButtons from '../LoginButtons/LoginButtons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

//TODO if have time: create some king of button to open nav on phones

function Header({ data, getUser, isFetching, clearUserStore, history }) {
  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, []);

  const AllMenuSections = CONSTANTS.SECTION_LIST.map(({ menuName, list }) => (
    <MenuSection menuName={menuName} pagesList={list} role={data?.role} key={menuName}/>
  ));

  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    history.replace('/login');
  };

  const startContests = () => {
    history.push('/startContest');
  };

  if (isFetching) {
    return null;
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <a href={`tel:${CONSTANTS.TELEPHONE}`} className={styles.phoneNumb}>
            {CONSTANTS.TELEPHONE}
          </a>
        </div>
        <LoginButtons data={data} logOut={logOut} />
      </div>
      <div className={styles.navContainer}>
        <Link to={'/'}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>

        <div className={styles.leftNav}>
          <nav className={styles.nav}>
            <ul className={styles.navItemsList}>{AllMenuSections}</ul>
          </nav>
          {data && data.role !== CONSTANTS.CREATOR && (
            <div className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
