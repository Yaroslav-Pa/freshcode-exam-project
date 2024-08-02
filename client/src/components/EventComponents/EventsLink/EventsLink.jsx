import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { MdEventNote } from 'react-icons/md';
import styles from './EventsLink.module.sass';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectCountsAndRole } from '../../../utils/reselect/eventsReselect';
import CONSTANTS from '../../../constants';

function EventsLink() {
  const location = useLocation();
  const {
    overCount: isOverCount,
    remindCount: isRemindCount,
    role,
  } = useSelector(selectCountsAndRole);

  const isRemindCountNotNull = isRemindCount !== 0;
  const isOverCountNotNull = isOverCount !== 0;

  const remindClassnames = classNames({
    [styles.remindCount]: isRemindCountNotNull,
  });
  const overClassnames = classNames({
    [styles.overCount]: isOverCountNotNull,
  });

  if (
    role !== CONSTANTS.CUSTOMER ||
    location.pathname === '/events' ||
    location.pathname === '/payment'
  ) {
    return null;
  }

  return (
    <section className={styles.container}>
      <Link to={'/events'}>
        <button className={styles.button}>
          <MdEventNote className={styles.icon} />
          {isOverCountNotNull && (
            <span className={overClassnames}>{isOverCount}</span>
          )}
          {isRemindCountNotNull && (
            <span className={remindClassnames}>{isRemindCount}</span>
          )}
        </button>
      </Link>
    </section>
  );
}

export default EventsLink;
