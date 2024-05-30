import React from 'react';
import styles from './ContestBox.module.sass';
import CONSTANTS from '../../constants';
import { toZonedTime } from 'date-fns-tz';
import { formatDistanceToNow } from 'date-fns';

const ContestBox = (props) => {
  const getTimeStr = () => {
    const diff = formatDistanceToNow(
      //getting new Date() for system time
      toZonedTime(props.data.createdAt, CONSTANTS.TIMEZONE)
    );
    if (diff.includes('minute')) {
      return 'less than one hour';
    }
    return diff;
  };

  const getPreferenceContest = () => {
    const { data } = props;
    if (data.contestType === CONSTANTS.NAME_CONTEST) return data.typeOfName;
    if (data.contestType === CONSTANTS.LOGO_CONTEST) return data.brandStyle;
    return data.typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const { id, title, contestType, prize, count, goToExtended } = props.data;
  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => props.goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}diamond.png`}
              alt="diamond"
            />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}entrieImage.png`}
              alt="logo"
            />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          {/* //TODO можливо цю функцію переробити щоб вона отримувала у пропси час а не хардоджено */}
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
