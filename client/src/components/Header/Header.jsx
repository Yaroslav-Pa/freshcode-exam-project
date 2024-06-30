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
import Logo from '../Logo';
import { controller } from '../../api/ws/socketController';
import { clearChatDataToInitial } from '../../store/slices/chatSlice';
import TEXT_CONTANTS from '../../textConstanst';
import { formatISO } from 'date-fns';
import { checkTime } from '../../store/slices/eventSlice';

function Header({
  data,
  getUser,
  isFetching,
  clearUserStore,
  clearChatData,
  history,
  eventCount,
  checkTime,
}) {
  useEffect(() => {
    if (!data && localStorage.hasOwnProperty(CONSTANTS.ACCESS_TOKEN)) {
      getUser();
    }
    if (eventCount) {
      checkTime(new Date());
    }
  }, []);

  const AllMenuSections = TEXT_CONTANTS.SECTION_LIST.map(
    ({ menuName, list }) => (
      <MenuSection
        menuName={menuName}
        pagesList={list}
        role={data?.role}
        key={menuName}
      />
    )
  );

  const logOut = () => {
    controller.unsubsctibe(data.id);
    localStorage.clear();
    clearUserStore();
    clearChatData();
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
        <p className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </p>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <section className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <a href={`tel:${CONSTANTS.TELEPHONE}`} className={styles.phoneNumb}>
            {CONSTANTS.TELEPHONE}
          </a>
        </div>
        <section className={styles.userButtonsContainer}>
          <LoginButtons data={data} logOut={logOut} />
        </section>
      </section>
      <section className={styles.navContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.leftNav}>
          <nav className={styles.nav}>
            <ul className={styles.navItemsList}>{AllMenuSections}</ul>
          </nav>
          {data && data.role === CONSTANTS.CUSTOMER && (
            <button className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </button>
          )}
          {data && data.role === CONSTANTS.MODERATOR && (
            <Link className={styles.startContestBtn} to={'/offersReview'}>
              {'Review offers'.toUpperCase()}
            </Link>
          )}
        </div>
      </section>
    </header>
  );
}

const mapStateToProps = (state) => ({
  ...state.userStore,
  eventCount: state.eventStore.events.length,
});
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  checkTime: (data) => dispatch(checkTime(formatISO(data))),
  clearUserStore: () => dispatch(clearUserStore()),
  clearChatData: () => dispatch(clearChatDataToInitial()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
