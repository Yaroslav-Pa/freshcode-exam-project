import React from 'react';
import styles from './OfferList.module.sass';
import OfferBox from '../OfferBox/OfferBox';
import { sortOffers } from '../../utils/contestFunctions';
import CONSTANTS from '../../constants';

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
    <div className={styles.notFound}>
      {contestData.status !== CONSTANTS.CONTEST_STATUS_FINISHED
        ? 'There is no suggestion at this moment'
        : "You didn't participate in this contest"}
    </div>
  );
};

export default OfferList;
