import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './OfferReview.module.sass';
import {
  getOffersOnReview,
  setReviewStatus,
} from '../../api/rest/restController';
import OfferOnReview from '../../components/OfferOnReview/OfferOnReview';
import TryAgain from '../../components/TryAgain/TryAgain';
import classNames from 'classnames';
const errorInitState = { isError: false, message: '' };

function OfferReview() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(errorInitState);

  const getOffers = async () => {
    try {
      setError(errorInitState);
      const { data } = await getOffersOnReview();
      setOffers(data);
    } catch (error) {
      setError({ isError: true, message: error.response.data });
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

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

  const reviewingOffersList = offers.map((offer) => (
    <OfferOnReview key={offer.id} offer={offer} setStatus={setStatus} />
  ));

  const containerClassnames = classNames(styles.container, {
    [styles.containerError]: error?.isError,
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={containerClassnames}>
          {!error?.isError &&
            (offers.length !== 0 ? (
              reviewingOffersList
            ) : (
              <p className={styles.emptyText}>No offers to review</p>
            ))}
          {error?.isError && (
            <>
              <TryAgain
                getData={() => {
                  getOffers();
                }}
              />
              <p className={styles.emptyText}>{error?.message}</p>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default OfferReview;
