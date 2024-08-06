import { useEffect } from 'react';
import CONSTANTS from '../../constants';
import OfferBox from '../OfferBox/OfferBox';
import styles from './OfferOnReview.module.sass';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import {
  removeOffer,
  setStatus,
} from '../../store/slices/moderatedOffersSlice';

function OfferOnReview({ offer }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (offer.updatedStatus) {
      setTimeout(() => {
        dispatch(removeOffer(offer.id));
      }, 300);
    }
  }, [offer, dispatch]);

  const offerBoxClassnames = classNames(styles.offerBox, {
    [styles.offerRejected]:
      offer.updatedStatus &&
      offer.updatedStatus === CONSTANTS.OFFER_STATUS_FAIL_REVIEW,
    [styles.offerApproved]:
      offer.updatedStatus &&
      offer.updatedStatus === CONSTANTS.OFFER_STATUS_PENDING,
  });

  const buttonClickHendler = (status) => {
    dispatch(setStatus({ offerId: offer.id, status }));
  };
  return (
    <section className={offerBoxClassnames}>
      <OfferBox
        data={offer}
        needButtons={false}
        contestType={offer.fileName !== null ? CONSTANTS.LOGO_CONTEST : null}
      />
      <div className={styles.buttonContainer}>
        <button
          className={styles.approveButton}
          onClick={() => {
            buttonClickHendler(CONSTANTS.OFFER_STATUS_PENDING);
          }}
        >
          Approve
        </button>
        <button
          className={styles.rejectButton}
          onClick={() => {
            buttonClickHendler(CONSTANTS.OFFER_STATUS_FAIL_REVIEW);
          }}
        >
          Reject
        </button>
      </div>
    </section>
  );
}

export default OfferOnReview;
