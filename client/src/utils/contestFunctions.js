import CONSTANTS from "../constants";
import ContestBox from '../components/ContestBox/ContestBox';
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const getFormatedGoingTimeStr = (data) => {
  const diff = formatDistanceToNow(
    toZonedTime(data, CONSTANTS.TIMEZONE)
  );
  if (diff.includes('minute')) {
    return 'less than one hour';
  }
  return diff;
};

export const sortOffers = (offersToSort) => {
  return [...offersToSort].sort((a, b) => {
    if (
      a.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW &&
      b.status !== CONSTANTS.OFFER_STATUS_FAIL_REVIEW
    ) {
      return 1;
    }
    if (
      a.status !== CONSTANTS.OFFER_STATUS_FAIL_REVIEW &&
      b.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW
    ) {
      return -1;
    }
    if (
      a.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW &&
      b.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW
    ) {
      return 0;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const getGoToExtended = (history) => {
  const goToExtended = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };
  return goToExtended;
};

export const contestList = (contests, goToExtended) => {
  const array = [];
  contests.forEach((contest) => {
    array.push(
      <ContestBox data={contest} key={contest.id} goToExtended={goToExtended} />
    );
  });
  return array;
};
