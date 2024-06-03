import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import CONSTANTS from "../constants";


export const getFormatedGoingTimeStr = (data) => {
  const diff = formatDistanceToNow(
    toZonedTime(data, CONSTANTS.TIMEZONE)
  );
  if (diff.includes('minute')) {
    return 'less than one hour';
  }
  return diff;
};