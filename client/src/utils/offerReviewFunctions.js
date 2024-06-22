import { getOffersOnReview, setReviewStatus } from '../api/rest/restController';

export const getModeratorFunctions = (setOffers, setError) => {
  const getOffers = async () => {
    try {
      setError({ isError: false, message: '' });
      const { data } = await getOffersOnReview();
      setOffers(data);
    } catch (error) {
      setError({ isError: true, message: error.response.data });
    }
  };

  const setStatus = async (offerId, status) => {
    try {
      const res = await setReviewStatus({ offerId, status });
      if (res.status === 200) {
        setTimeout(() => {
          setOffers((offers) => offers.filter((offer) => offer.id !== offerId));
        }, 500);
      }
    } catch (error) {
      setError({ isError: true, message: error.response.data });
    }
  };

  return [getOffers, setStatus];
};
