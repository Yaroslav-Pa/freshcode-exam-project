import { formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import Event from '../Event/Event';
import styles from './EventsListing.module.sass';
import { BsClockHistory } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { checkTime } from '../../store/slices/eventSlice';
import {
  getFromatedDate,
  getTimePercentage,
  sortClosestTime,
} from '../../utils/eventsFunctions';

function EventsListing({ events }) {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    //TODO!  massive сrutch for component rerender
    setCurrentTime(formatISO(new Date()));
    const intervalId = setInterval(
      () => setCurrentTime(formatISO(new Date())),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(checkTime(currentTime));
  }, [currentTime]);

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
        {sortClosestTime(events, currentTime).map((event) => (
          <Event
            key={event?.creationTime}
            {...event}
            currentTime={currentTime}
            getTimePercentage={getTimePercentage}
            getFromatedDate={getFromatedDate}
          />
        ))}
      </section>
    </section>
  );
}

export default EventsListing;
