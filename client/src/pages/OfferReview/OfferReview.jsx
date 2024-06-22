import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './OfferReview.module.sass';
import OfferOnReview from '../../components/OfferOnReview/OfferOnReview';
import TryAgain from '../../components/TryAgain/TryAgain';
import classNames from 'classnames';
import { getModeratorFunctions } from '../../utils/offerReviewFunctions';

function OfferReview() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState({ isError: false, message: '' });
  const [getOffers, setStatus] = getModeratorFunctions(setOffers, setError);

  useEffect(() => {
    getOffers();
  }, []);
  
  const reviewingOffersList = offers.map((offer) => (
    <OfferOnReview key={offer.id} offer={offer} setStatus={setStatus} />
  ));

  const containerClassnames = classNames(styles.container, {
    [styles.containerError]: error?.isError,
  });

  const renderErrorOrOffers = () => {
    if (error?.isError) {
      return (
        <>
          <TryAgain
            getData={() => {
              getOffers();
            }}
          />
          <p className={styles.emptyText}>{error?.message}</p>
        </>
      );
    }
    return offers.length !== 0 ? (
      reviewingOffersList
    ) : (
      <p className={styles.emptyText}>No offers to review</p>
    );
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={containerClassnames}>
          {renderErrorOrOffers()}
        </section>
      </main>
    </>
  );
}

export default OfferReview;
