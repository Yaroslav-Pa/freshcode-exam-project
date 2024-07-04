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
import Lightbox from 'react-18-image-lightbox';
import CONSTANTS from '../../constants';
import { changeShowImage } from '../../store/slices/contestByIdSlice';
import {
  selectContestById,
  selectModeratedOffers,
} from '../../utils/reselect/moderatorReselect';

function OfferReview() {
  const dispatch = useDispatch();
  const { isFetching, error, offers, haveMore } = useSelector(
    selectModeratedOffers
  );

  const { isShowOnFull, imagePath } = useSelector(selectContestById);

  useEffect(() => {
    dispatch(clearOffers());
    dispatch(getOffers());
  }, [dispatch]);

  useEffect(() => {
    if (haveMore && offers.length !== 0 && offers.length === 5) {
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
      {isShowOnFull && (
        <Lightbox
          mainSrc={`${CONSTANTS.PUBLIC_CONTESTS_URL}${imagePath}`}
          onCloseRequest={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      <main className={styles.main}>
        <section className={containerClassnames}>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.refresh}
              onClick={() => {
                dispatch(clearOffers());
                dispatch(getOffers());
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
