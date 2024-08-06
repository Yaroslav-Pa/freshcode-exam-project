import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  changeMark,
  clearChangeMarkError,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import OfferUserInfo from './OfferUserInfo/OfferUserInfo';

const OfferBox = ({
  setOfferStatus,
  data,
  clearError,
  changeMarkRedux,
  goToExpandedDialog,
  changeShowImage,
  needButtons,
  ...restProps
}) => {
  const createConfirmAlert = (command) => ({
    title: `Confirm ${command}`,
    message: 'Are you sure?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => setOfferStatus(data.User.id, data.id, command),
      },
      {
        label: 'No',
      },
    ],
  });

  const findConversationInfo = () => {
    const { messagesPreview, id } = restProps;
    const participants = [id, data.User.id];
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

  const resolveOffer = () => {
    confirmAlert(createConfirmAlert('resolve'));
  };

  const rejectOffer = () => {
    confirmAlert(createConfirmAlert('reject'));
  };

  const changeMark = (value) => {
    clearError();
    changeMarkRedux({
      mark: value,
      offerId: data.id,
      isFirst: !data.mark,
      creatorId: data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = data;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (status === CONSTANTS.OFFER_STATUS_WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  const goChat = () => {
    goToExpandedDialog({
      interlocutor: data.User,
      conversationData: findConversationInfo(),
    });
  };

  const { role, id, contestType } = restProps;
  const isForModerator = role === CONSTANTS.MODERATOR;

  const chatIconClassnames = classNames(styles.chatIcon, {
    [styles.chatIconForModerator]: isForModerator,
  });

  const offerContainerClassnames = classNames(styles.offerContainer, {
    [styles.offerContainerReview]:
      data.status === CONSTANTS.OFFER_STATUS_REVIEW && !isForModerator,
    [styles.offerContainerFailReview]:
      data.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW && !isForModerator,
    [styles.moderatorStyles]: isForModerator,
    [styles.offerContainerSmallerPadding]:
      isForModerator || role === CONSTANTS.CUSTOMER,
  });

  const mainInfoContainerClassnames = classNames(styles.mainInfoContainer, {
    [styles.mainInfoContainerModerator]: isForModerator,
  });

  return (
    <div className={offerContainerClassnames}>
      {offerStatus()}
      <div className={mainInfoContainerClassnames}>
        {!isForModerator && <OfferUserInfo data={data} />}
        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
            <img
              onClick={() =>
                changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.PUBLIC_CONTESTS_URL}${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {data?.User?.id !== id && !isForModerator && (
            <Rating
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star"
                />
              }
              onClick={changeMark}
              placeholderRating={data.mark}
            />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && !isForModerator && (
          <i
            onClick={goChat}
            className={'fas fa-comments ' + chatIconClassnames}
          />
        )}
      </div>
      {needButtons && needButtons(data.status) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeMarkRedux: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

const mapStateToProps = (state) => {
  const { changeMarkError } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
);
