import styles from './Event.module.sass';
import { toZonedTime } from 'date-fns-tz';
import CONSTANTS from '../../constants';
import { IoCloseSharp } from 'react-icons/io5';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { removeEvent } from '../../store/slices/eventSlice';

function Event({
  name,
  endTime,
  creationTime,
  currentTime,
  getTimePercentage,
  getFromatedDate,
  isOver,
  isRemind,
}) {
  const dispatch = useDispatch();
  const eventClassnames = classNames(
    styles.event,
    { [styles.eventOver]: isOver },
    { [styles.eventRemind]: isRemind }
  );
  const eventProgressClassnames = classNames(
    styles.progressBar,
    { [styles.progressOver]: isOver },
    { [styles.progressRemind]: isRemind }
  );
  const timeTextClassnames = classNames(styles.time, {
    [styles.timeOver]: isOver,
  });

  const timeDateText = endTime
    ? getFromatedDate(toZonedTime(endTime, CONSTANTS.TIMEZONE), currentTime)
    : '';
  const percentage =
    creationTime && endTime
      ? getTimePercentage(creationTime, endTime, currentTime)
      : 0;

  return (
    <div className={eventClassnames}>
      <div
        className={eventProgressClassnames}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
      <h3 className={styles.mainText}>{name}</h3>
      <p className={timeTextClassnames}>{timeDateText}</p>
      <button
        className={styles.closeButton}
        onClick={() => {
          dispatch(removeEvent(creationTime));
        }}
      >
        <IoCloseSharp className={styles.cross} />
      </button>
    </div>
  );
}

export default Event;
