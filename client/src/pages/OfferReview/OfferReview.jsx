import Header from '../../components/Header/Header';
import OfferBox from '../../components/OfferBox/OfferBox';
import constants from '../../constants';
import styles from './OfferReview.module.sass';
const testOffers = [
  {
    id: 1,
    text: '123123',
    fileName: null,
    originalFileName: null,
    status: 'pending',
    User: {
      id: 225556,
      firstName: 'create',
      lastName: 'create',
      displayName: 'create',
      email: 'create@gmail.com',
      avatar: 'anon.png',
      rating: 0,
    },
  },
];
function OfferReview() {
  const approveOffer = () => {};
  const rejectOffer = () => {};

  const reviewingOffersList = testOffers.map((offer) => (
    <div className={styles.offerBox} key={offer._id}>
      <OfferBox
        isForModerator={true}
        data={offer}
        needButtons={false}
        contestType={offer.fileName !== null ? constants.LOGO_CONTEST : null}
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
    </div>
  ));

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>{reviewingOffersList}</section>
      </main>
    </>
  );
}

export default OfferReview;
