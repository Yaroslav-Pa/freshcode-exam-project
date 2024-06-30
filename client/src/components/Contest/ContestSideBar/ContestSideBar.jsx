import React from 'react';
import { connect } from 'react-redux';
import styles from './ContestSideBar.module.sass';
import CONSTANTS from '../../../constants';
import { getFormatedGoingTimeStr } from '../../../utils/contestFunctions';

const ContestSideBar = (props) => {
  const renderContestInfo = () => {
    const { totalEntries } = props;
    const { User, prize } = props.contestData;
    return (
      <div className={styles.contestSideBarInfo}>
        <div className={styles.contestInfo}>
          <div className={styles.awardAndTimeContainer}>
            <div className={styles.prizeContainer}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}big-diamond.png`}
                alt="diamond"
              />
              <span>{`$ ${prize}`}</span>
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.timeDesc}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
                  alt="clock"
                />
                <span>
                  {props.contestData.status ===
                    CONSTANTS.CONTEST_STATUS_ACTIVE && 'Going'}
                  {props.contestData.status ===
                    CONSTANTS.CONTEST_STATUS_FINISHED && 'Finshed'}
                  {props.contestData.status ===
                    CONSTANTS.CONTEST_STATUS_PENDING && 'Pending'}
                </span>
              </div>
              <span className={styles.time}>
                {getFormatedGoingTimeStr(props.contestData.createdAt)}
              </span>
            </div>
            <div className={styles.guaranteedPrize}>
              <div>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                  alt="check"
                />
              </div>
              <span>Guaranteed prize</span>
            </div>
          </div>
          <div className={styles.contestStats}>
            <span>Contest Stats</span>
            <div className={styles.totalEntrie}>
              <span className={styles.totalEntriesLabel}>Total Entries</span>
              <span>{totalEntries}</span>
            </div>
          </div>
        </div>
        {props.data.id !== User.id && (
          <div className={styles.infoCustomerContainer}>
            <span className={styles.labelCustomerInfo}>
              About Contest Holder
            </span>
            <div className={styles.customerInfo}>
              <img
                src={
                  User.avatar === 'anon.png'
                    ? CONSTANTS.ANONYM_IMAGE_PATH
                    : `${CONSTANTS.PUBLIC_IMAGES_URL}${User.avatar}`
                }
                alt="user"
              />
              <div className={styles.customerNameContainer}>
                <span>{`${User.firstName} ${User.lastName}`}</span>
                <span>{User.displayName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderContestInfo();
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ContestSideBar);