import styles from './EventsListing.module.sass';
import { BsClockHistory } from 'react-icons/bs';

function EventsListing({ events }) {

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
        <div className={styles.event}>
          <div
            className={styles.eventProgress}
            style={{ width: `50%` }}
          ></div>
          <h3 className={styles.eventText}>Event name</h3>
          <p className={styles.eventText}>Remaining time</p>
        </div>
      </section>
    </section>
  );
}

export default EventsListing;
