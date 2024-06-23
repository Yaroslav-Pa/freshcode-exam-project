import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from './OfferReview.module.sass';
import OfferOnReview from '../../components/OfferOnReview/OfferOnReview';
import TryAgain from '../../components/TryAgain/TryAgain';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearOffers,
  getOffers,
} from '../../store/slices/moderatedOffersSlice';
import Spinner from '../../components/Spinner/Spinner';

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
    dispatch(clearOffers());
    dispatch(getOffers());
  }, []);

  useEffect(() => {
    if (haveMore && offers.length !== 0 && offers.length < 5) {
      dispatch(getOffers(offers.length));
    }
  }, [offers]);

  const reviewingOffersList = offers.map((offer) => (
    <OfferOnReview key={offer.id} offer={offer} />
  ));

  const containerClassnames = classNames(styles.container, {
    [styles.containerError]: error,
  });

  const renderErrorOrOffers = () => {
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
    return offers.length !== 0
      ? reviewingOffersList
      : !isFetching && <p className={styles.emptyText}>No offers to review</p>;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={containerClassnames}>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.refresh}
              onClick={() => {
                dispatch(getOffers(offers.length));
              }}
            >
              Refresh
            </button>
          </div>
          {renderErrorOrOffers()}
          {isFetching && <Spinner />}
        </section>
      </main>
    </>
  );
}

export default OfferReview;
