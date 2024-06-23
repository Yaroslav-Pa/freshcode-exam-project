import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from './OfferReview.module.sass';
import OfferOnReview from '../../components/OfferOnReview/OfferOnReview';
import TryAgain from '../../components/TryAgain/TryAgain';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers } from '../../store/slices/moderatedOffersSlice';
import Spinner from '../../components/Spinner/Spinner';

//! Залишилось зробити 3) limit offset

function OfferReview() {
  const dispatch = useDispatch();
  const isFetching = useSelector(
    ({ moderatedOffersStore }) => moderatedOffersStore.isFetching
  );
  const error = useSelector(
    ({ moderatedOffersStore }) => moderatedOffersStore.error
  );
  const offers = useSelector(
    ({ moderatedOffersStore }) => moderatedOffersStore.offers
  );
  const haveMore = useSelector(
    ({ moderatedOffersStore }) => moderatedOffersStore.haveMore
  );

  useEffect(() => {
    dispatch(getOffers());
  }, []);

  const reviewingOffersList = offers.map((offer) => (
    <OfferOnReview key={offer.id} offer={offer} />
  ));

  const containerClassnames = classNames(styles.container, {
    [styles.containerError]: error,
  });

  const renderErrorOrOffers = () => {
    if (isFetching) {
      return <Spinner />;
    }
    if (error) {
      return (
        <>
          <TryAgain
            getData={() => {
              dispatch(getOffers());
            }}
          />
          <p className={styles.emptyText}>{error?.data}</p>
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
