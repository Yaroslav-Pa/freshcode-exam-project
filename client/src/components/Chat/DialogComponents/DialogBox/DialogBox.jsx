import React from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';
import { isSameDay, isSameWeek, isSameYear, format } from 'date-fns';
import NewMessagePoint from '../../../NewMessagePoint/NewMessagePoint';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const {
    favoriteList,
    participants,
    blackList,
    _id,
    text,
    createAt,
    isNewMessage,
  } = chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];

  const getFormatedTimeIfSame = (time) => {
    const currentTime = new Date();
    if (isSameDay(time, currentTime)) return format(time, 'HH:mm');
    if (isSameWeek(time, currentTime)) return format(time, 'E');
    if (isSameYear(time, currentTime)) return format(time, 'MMM dd');
    return format(time, 'MMM dd, y');
  };

  return (
    <section
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            _id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <div className={styles.userIconContainer}>
        <img
          className={styles.userIcon}
          src={
            interlocutor.avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.publicImagesURL}${interlocutor.avatar}`
          }
          alt="user"
        />
        <NewMessagePoint isNewMessage={isNewMessage} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <p className={styles.interlocutorName}>{interlocutor.firstName}</p>
          <p className={styles.interlocutorMessage}>{text}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <p className={styles.time}>{getFormatedTimeIfSame(createAt)}</p>
          <i
            onClick={(event) =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
          />
          <i
            onClick={(event) =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
                event
              )
            }
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
          />
          <i
            onClick={(event) => catalogOperation(event, _id)}
            className={classNames({
              'far fa-plus-square':
                chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle':
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </section>
  );
};

export default DialogBox;
