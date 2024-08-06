import CONSTANTS from '../constants';
import ContestBox from '../components/Contest/ContestBox/ContestBox';
import { formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import _ from 'lodash';

export const getFormatedGoingTimeStr = (data) => {
  const diff = formatDistanceToNow(toZonedTime(data, CONSTANTS.TIMEZONE));
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

export const removeDuplicates = (array1, array2) => {
  return _.uniqWith([...array1, ...array2], _.isEqual);
};

export const getContestStyle = (contest) => {
  if (contest.contest_type === CONSTANTS.NAME_CONTEST) {
    return `Style name: ${contest.style_name}`;
  }
  if (contest.contest_type === CONSTANTS.LOGO_CONTEST) {
    return `Brand style: ${contest.brand_style}`;
  }
  if (contest.contest_type === CONSTANTS.TAGLINE_CONTEST) {
    return `Type of tagline: ${contest.type_of_tagline}`;
  }
  return null;
};
