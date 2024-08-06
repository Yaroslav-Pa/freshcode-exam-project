import {
  addMilliseconds,
  differenceInHours,
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  formatISO,
  startOfDay,
} from 'date-fns';
import { checkTime } from '../store/slices/eventSlice';
import store from '../store';

export const getFromatedDate = (
  endDate,
  currentDate = formatISO(new Date())
) => {
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

export function getTimePercentage(
  startDate,
  endDate,
  currentDate = formatISO(new Date())
) {
  const totalDuration = differenceInMilliseconds(endDate, startDate);
  const elapsedDuration = differenceInMilliseconds(currentDate, startDate);
  const percentage = (elapsedDuration / totalDuration) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}

export const sortClosestTime = (array, currentTime = formatISO(new Date())) => {
  return [...array].sort(
    (a, b) =>
      differenceInMilliseconds(a.endTime, currentTime) -
      differenceInMilliseconds(b.endTime, currentTime)
  );
};

const millisecondsRemaining = (dateRemider, dateEnd, isRemind, isOver) => {
  const nowTime = Date.now();
  const reminderTime = differenceInMilliseconds(dateRemider, nowTime);
  const endTime = differenceInMilliseconds(dateEnd, nowTime);
  if (!isRemind && reminderTime > 0) return reminderTime;
  if (!isOver && endTime > 0) return endTime;
  return null;
};

export const createTimeout = (events) => {
  if (events) {
    const eventsTimeRemaining = events.map((event) =>
      millisecondsRemaining(
        event.remiderTime,
        event.endTime,
        event.isRemind,
        event.isOver
      )
    );
    const filteredRemainingTime = eventsTimeRemaining.filter(
      (time) => time !== null
    );
    if (filteredRemainingTime.length !== 0) {
      const smallestTime = Math.min(...filteredRemainingTime);
      return setTimeout(() => {
        store.dispatch(checkTime(Date.now() + 1000));
        createTimeout(events);
      }, smallestTime);
    }
  }
  return null;
};
