import { useEffect, useState } from 'react';
import Event from '../Event/Event';
import styles from './EventsListing.module.sass';
import { BsClockHistory } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { checkTime } from '../../../store/slices/eventSlice';
import { sortClosestTime } from '../../../utils/eventsFunctions';
import { formatISO } from 'date-fns';

function EventsListing({ events }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(formatISO(new Date()));

  useEffect(() => {
    setTime(formatISO(new Date()));
    dispatch(checkTime(time));
    const intervalId = setInterval(() => {
      setTime(formatISO(new Date()));
      dispatch(checkTime(time));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.mainText}>Live upcomming checks</h2>
        <div className={styles.rightContainer}>
          <p className={styles.timeText}>Remaining time</p>
          <BsClockHistory className={styles.clock} />
        </div>
      </div>
      <section className={styles.eventContainer}>
        {sortClosestTime(events).map((event) => (
          <Event key={event?.creationTime} {...event} />
        ))}
      </section>
    </section>
  );
}

export default EventsListing;
