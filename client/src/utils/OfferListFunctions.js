import CONSTANTS from "../constants";

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