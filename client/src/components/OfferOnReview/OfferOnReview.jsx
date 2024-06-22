import { useState } from 'react';
import CONSTANTS from '../../constants';
import OfferBox from '../OfferBox/OfferBox';
import styles from './OfferOnReview.module.sass';
import classNames from 'classnames';

function OfferOnReview({ offer, setStatus }) {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const offerBoxClassnames = classNames(styles.offerBox, {
    [styles.offerRejected]: isRejected,
    [styles.offerApproved]: isApproved,
  });
  return (
    <section className={offerBoxClassnames} key={offer._id}>
      <OfferBox
        isForModerator={true}
        data={offer}
        needButtons={false}
        contestType={offer.fileName !== null ? CONSTANTS.LOGO_CONTEST : null}
      />
      <div className={styles.buttonContainer}>
        <button
          className={styles.approveButton}
          onClick={() => {
            setIsApproved(true);
            setStatus(offer.id, CONSTANTS.OFFER_STATUS_PENDING);
          }}
        >
          Approve
        </button>
        <button
          className={styles.rejectButton}
          onClick={() => {
            setIsRejected(true);
            setStatus(offer.id, CONSTANTS.OFFER_STATUS_FAIL_REVIEW);
          }}
        >
          Reject
        </button>
      </div>
    </section>
  );
}

export default OfferOnReview;
