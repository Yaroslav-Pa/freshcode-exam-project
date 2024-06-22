import CONSTANTS from "../../constants";
import OfferBox from "../OfferBox/OfferBox";
import styles from './OfferOnReview.module.sass'

function OfferOnReview({offer, approveOffer, rejectOffer}) {
  return (
    <section className={styles.offerBox} key={offer._id}>
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
            approveOffer(offer.id);
          }}
        >
          Approve
        </button>
        <button
          className={styles.rejectButton}
          onClick={() => {
            rejectOffer(offer.id);
          }}
        >
          Reject
        </button>
      </div>
    </section>
  );
}

export default OfferOnReview;
