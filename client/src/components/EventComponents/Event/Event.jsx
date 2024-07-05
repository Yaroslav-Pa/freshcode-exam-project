import styles from './Event.module.sass';
import { toZonedTime } from 'date-fns-tz';
import CONSTANTS from '../../../constants';
import { IoCloseSharp } from 'react-icons/io5';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { removeEvent } from '../../../store/slices/eventSlice';
import {
  getFromatedDate,
  getTimePercentage,
} from '../../../utils/eventsFunctions';
import { FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { useState } from 'react';

function Event({ name, remiderTime, endTime, creationTime, isOver, isRemind }) {
  const dispatch = useDispatch();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const timeFormat = 'HH:mm:ss, MMM do yyyy';
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
  const infoClassnames = classNames(styles.displayTimeInfo, {
    [styles.displayTimeInfoActive]: isInfoVisible,
  });

  const timeDateText = endTime
    ? getFromatedDate(toZonedTime(endTime, CONSTANTS.TIMEZONE))
    : '';
  const percentage =
    creationTime && endTime ? getTimePercentage(creationTime, endTime) : 0;

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
      <FaInfoCircle
        className={styles.info}
        onClick={() => {
          setIsInfoVisible(!isInfoVisible);
        }}
      />
      <section className={infoClassnames}>
        <p>Created at: {format(creationTime, timeFormat)}</p>
        <p>
          End{isOver ? 'ed' : 'ing'} at: {format(endTime, timeFormat)}
        </p>
        <p>
          Remind{isRemind ? 'ed' : 'er'} at: {format(remiderTime, timeFormat)}
        </p>
      </section>

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
