import {
  addMilliseconds,
  differenceInHours,
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  formatISO,
  startOfDay,
} from 'date-fns';
import store from '../store';
import { checkTime, getEvents, updateCounters } from '../store/slices/eventSlice';

export const getFromatedDate = (endDate, currentDate = new Date()) => {
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
  currentDate = new Date()
) {
  const totalDuration = differenceInMilliseconds(endDate, startDate);
  const elapsedDuration = differenceInMilliseconds(currentDate, startDate);
  const percentage = (elapsedDuration / totalDuration) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}

export const sortClosestTime = (array, currentTime) => {
  const copy = [...array];

  return copy.sort(
    (a, b) =>
      differenceInMilliseconds(a.endTime, currentTime) -
      differenceInMilliseconds(b.endTime, currentTime)
  );
};

export const getGetAndUpdateEvents = () => {
  const dispatch = store.dispatch;
  dispatch(getEvents());
  dispatch(checkTime(formatISO(new Date())));
  dispatch(updateCounters());
};