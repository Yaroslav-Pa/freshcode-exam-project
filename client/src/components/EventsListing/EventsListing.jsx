import { useEffect, useState } from 'react';
import Event from '../Event/Event';
import styles from './EventsListing.module.sass';
import { BsClockHistory } from 'react-icons/bs';

function EventsListing({ events }) {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
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
        {events.length !== 0 &&
          events.map((event) => <Event {...event} currentTime={currentTime} />)}
      </section>
    </section>
  );
}

export default EventsListing;
