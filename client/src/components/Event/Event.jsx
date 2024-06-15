import {
  addMilliseconds,
  differenceInHours,
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  startOfDay,
} from 'date-fns';
import styles from './Event.module.sass';
import { toZonedTime } from 'date-fns-tz';
import CONSTANTS from '../../constants';

function Event({ name, endTime, remiderTime, creationTime, currentTime }) {
  const getFromatedDate = (date, currentDate = new Date()) => {
    const timeDifference = differenceInMilliseconds(date, currentDate);
    const hoursDiff = differenceInHours(date, currentDate);

    if (hoursDiff >= 24) {
      return formatDistanceToNowStrict(date);
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

  const percentage = getTimePercentage(creationTime, endTime, currentTime);

  return (
    <div className={styles.event}>
      <div
        className={styles.eventProgress}
        style={{ width: `${percentage}%` }}
      ></div>
      <h3 className={styles.eventText}>{name}</h3>
      <p className={styles.eventText}>
        {getFromatedDate(toZonedTime(endTime, CONSTANTS.TIMEZONE), currentTime)}
      </p>
    </div>
  );
}

export default Event;
