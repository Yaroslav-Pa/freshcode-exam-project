import React from 'react';
import styles from './OfferList.module.sass';
import OfferBox from '../OfferBox/OfferBox';
import { sortOffers } from '../../utils/contestFunctions';

const OfferList = ({ offers, contestData, needButtons, setOfferStatus }) => {
  const sortedOffers = sortOffers(offers);

  return sortedOffers.length !== 0 ? (
    sortedOffers.map((offer) => (
      <OfferBox
        data={offer}
        key={offer.id}
        needButtons={needButtons}
        setOfferStatus={setOfferStatus}
        contestType={contestData.contestType}
      />
    ))
  ) : (
    <div className={styles.notFound}>There is no suggestion at this moment</div>
  );
};

export default OfferList;
