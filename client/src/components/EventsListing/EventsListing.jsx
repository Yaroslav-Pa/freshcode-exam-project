import {
  addMilliseconds,
  differenceInHours,
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  formatISO,
  startOfDay,
} from 'date-fns';
import { useEffect, useState } from 'react';
import Event from '../Event/Event';
import styles from './EventsListing.module.sass';
import { BsClockHistory } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { checkTime } from '../../store/slices/eventSlice';

function EventsListing({ events }) {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentTime(formatISO(new Date())),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(checkTime(currentTime));
  }, [currentTime]);

  const getFromatedDate = (endDate, currentDate = new Date()) => {
    const timeDifference = differenceInMilliseconds(endDate, currentDate);
    const hoursDiff = differenceInHours(endDate, currentDate);

    if (hoursDiff >= 24) {
      return formatDistanceToNowStrict(endDate);
    } else {
      const durationDate = addMilliseconds(
        startOfDay(currentDate),
        timeDifference
      );

      return hoursDiff > 0
        ? format(durationDate, 'HH:mm:ss')
        : format(durationDate, 'mm:ss');
    }
  };

  function getTimePercentage(startDate, endDate, currentDate = new Date()) {
    const totalDuration = differenceInMilliseconds(endDate, startDate);
    const elapsedDuration = differenceInMilliseconds(currentDate, startDate);
    const percentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

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
          events.map((event) => (
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
