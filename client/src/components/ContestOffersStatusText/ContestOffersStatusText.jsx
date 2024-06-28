import CONSTANTS from '../../constants';
import styles from './ContestOffersStatusText.module.sass';

function ContestOffersStatusText({ contestData, role }) {
  return (
    <section className={styles.offersPendingText}>
      <div className={styles.offersPendingBox}>
        {contestData?.reviewCount > 0 && (
          <p>
            <span className={styles.pendingText}>
              {contestData.reviewCount} offers pending
            </span>{' '}
            on review
          </p>
        )}
        {role === CONSTANTS.CREATOR && contestData?.failReviewCount > 0 && (
          <p>
            <span className={styles.failedText}>
              {contestData.failReviewCount} offers failed
            </span>{' '}
            review
          </p>
        )}
      </div>
    </section>
  );
}

export default ContestOffersStatusText;
