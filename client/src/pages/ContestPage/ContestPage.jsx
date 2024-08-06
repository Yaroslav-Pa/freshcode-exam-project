import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/Contest/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';
import OfferList from '../../components/OfferList/OfferList';
import ContestOffersStatusText from '../../components/Contest/ContestOffersStatusText/ContestOffersStatusText';

const ContestPage = ({
  goToExpandedDialog,
  getDataRedux,
  setOfferStatusRedux,
  match,
  userStore,
  chatStore,
  clearSetOfferStatusError,
  changeEditContest,
  contestByIdStore,
  changeShowImage,
  changeContestViewMode,
}) => {
  const getData = useCallback(() => {
    const { params } = match;
    getDataRedux({ contestId: params.id });
  }, [getDataRedux, match]);

  useEffect(() => {
    getData();
    return () => {
      clearSetOfferStatusError();
      changeEditContest(false);
    };
  }, [getData, clearSetOfferStatusError, changeEditContest]);

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestByIdStore.contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestByIdStore.contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const setOfferStatus = (creatorId, offerId, command) => {
    clearSetOfferStatusError();
    const { id, orderId, priority } = contestByIdStore.contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    setOfferStatusRedux(obj);
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = contestByIdStore.contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  const { role } = userStore.data;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.PUBLIC_CONTESTS_URL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={getData} additionalText={error.data} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => changeContestViewMode(true)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => changeContestViewMode(false)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                <ContestOffersStatusText
                  contestData={contestData}
                  role={role}
                />
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>
                  <OfferList
                    contestData={contestByIdStore.contestData}
                    offers={contestByIdStore.offers}
                    needButtons={needButtons}
                    setOfferStatus={setOfferStatus}
                  />
                </div>
              </div>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getDataRedux: (data) => dispatch(getContestById(data)),
  setOfferStatusRedux: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
