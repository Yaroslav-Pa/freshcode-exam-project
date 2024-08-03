import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { MdEventNote } from 'react-icons/md';
import styles from './EventsLink.module.sass';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  selectCountsAndRole,
  selectEvents,
} from '../../../utils/reselect/eventsReselect';
import CONSTANTS from '../../../constants';
import { useEffect } from 'react';
import { createTimeout } from '../../../utils/eventsFunctions';

function EventsLink() {
  const location = useLocation();
  const { overCount, remindCount, eventsCount, role } =
    useSelector(selectCountsAndRole);
  const events = useSelector(selectEvents);
  useEffect(() => {
    let timeoutId = null;
    if (eventsCount > 0) {
      timeoutId = createTimeout(events);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [events, eventsCount]);

  const isRemindCountNotNull = remindCount !== 0;
  const isOverCountNotNull = overCount !== 0;

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
            <span className={overClassnames}>{overCount}</span>
          )}
          {isRemindCountNotNull && (
            <span className={remindClassnames}>{remindCount}</span>
          )}
        </button>
      </Link>
    </section>
  );
}

export default EventsLink;
