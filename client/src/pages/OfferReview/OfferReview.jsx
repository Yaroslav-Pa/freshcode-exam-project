import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './OfferReview.module.sass';
import { getOffersOnReview } from '../../api/rest/restController';
import OfferOnReview from '../../components/OfferOnReview/OfferOnReview';

function OfferReview() {
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    try {
      const { data } = await getOffersOnReview();
      console.log(data);
      setOffers(data);
    } catch (error) {
      throw new Error('Failed to fetch offers', error);
    }
  };

  useEffect(() => {
    getOffers();
    console.log(offers);
  }, []);

  const approveOffer = () => {};
  const rejectOffer = () => {};

  const reviewingOffersList = offers.map((offer) => (
    <OfferOnReview
      key={offer.id}
      offer={offer}
      approveOffer={approveOffer}
      rejectOffer={rejectOffer}
    />
  ));

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          {offers.length !== 0 ? (
            reviewingOffersList
          ) : (
            <p>No offers to review</p>
          )}
        </section>
      </main>
    </>
  );
}

export default OfferReview;
