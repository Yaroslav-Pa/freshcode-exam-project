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

const OfferBox = (props) => {
  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
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
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMark = (value) => {
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
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
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  const chatIconClassnames = classNames(styles.chatIcon, {
    [styles.chatIconForModerator]: props.isForModerator,
  });

  const { data, role, id, contestType } = props;
  const { avatar, firstName, lastName, email, rating } = props.data.User;
  const offerContainerClassnames = classNames(styles.offerContainer, {
    [styles.offerContainerReview]:
      props.data.status === CONSTANTS.OFFER_STATUS_REVIEW &&
      !props.isForModerator,
    [styles.offerContainerFailReview]:
      props.data.status === CONSTANTS.OFFER_STATUS_FAIL_REVIEW &&
      !props.isForModerator,
    [styles.moderatorStyles]: props.isForModerator,
    [styles.offerContainerSmallerPadding]:
      props.isForModerator || role === CONSTANTS.CUSTOMER,
  });

  const mainInfoContainerClassnames = classNames(styles.mainInfoContainer, {
    [styles.mainInfoContainerModerator]: props.isForModerator,
  });

  return (
    <div className={offerContainerClassnames}>
      {offerStatus()}
      <div className={mainInfoContainerClassnames}>
        {!props.isForModerator && (
          <div className={styles.userInfo}>
            <div className={styles.creativeInfoContainer}>
              <img
                src={
                  avatar === 'anon.png'
                    ? CONSTANTS.ANONYM_IMAGE_PATH
                    : `${CONSTANTS.PUBLIC_IMAGES_URL}${avatar}`
                }
                alt="user"
              />
              <div className={styles.nameAndEmail}>
                <span>{`${firstName} ${lastName}`}</span>
                <span>{email}</span>
              </div>
            </div>
            <div className={styles.creativeRating}>
              <span className={styles.userScoreLabel}>Creative Rating </span>
              <Rating
                initialRating={rating}
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
                    alt="star-outline"
                  />
                }
                readonly
              />
            </div>
          </div>
        )}
        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
            <img
              onClick={() =>
                props.changeShowImage({
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
          {!props.isForModerator && data.User.id !== id && (
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
        {role !== CONSTANTS.CREATOR && (
          <i
            onClick={goChat}
            className={'fas fa-comments ' + chatIconClassnames}
          />
        )}
      </div>
      {props.needButtons && props.needButtons(data.status) && (
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
  changeMark: (data) => dispatch(changeMark(data)),
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
