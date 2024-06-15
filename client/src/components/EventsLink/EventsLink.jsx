import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MdEventNote } from 'react-icons/md';
import styles from './EventsLink.module.sass';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  getCounters,
} from '../../utils/eventsFunctions';

function EventsLink({ history }) {
  const [counters, setConters] = useState({});
  useEffect(() => {
    setConters(getCounters());
  }, []);
  const remindClassnames = classNames({
    [styles.remindCount]: counters?.isRemindCount !== 0,
  });
  const overClassnames = classNames({
    [styles.overCount]: counters?.isOverCount !== 0,
  });

  return (
    <section className={styles.container}>
      <button className={styles.button}>
        <Link to={'/events'}>
          <MdEventNote className={styles.icon} />
        </Link>
        {counters?.isOverCount && (
          <p className={overClassnames}>{counters.isOverCount}</p>
        )}
        {counters?.isRemindCount && (
          <p className={remindClassnames}>{counters.isRemindCount}</p>
        )}
      </button>
    </section>
  );
}

export default EventsLink;
