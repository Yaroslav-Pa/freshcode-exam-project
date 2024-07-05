import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../../../constants';
import {
  goToExpandedDialog,
  changeChatFavorite,
  changeChatBlock,
  changeShowAddChatToCatalogMenu,
} from '../../../../store/slices/chatSlice';
import DialogBox from '../DialogBox/DialogBox';
import styles from './DialogList.module.sass';
import classNames from 'classnames';

const DialogList = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (event, chatId) => {
    props.changeShowAddChatToCatalogMenu(chatId);
    event.stopPropagation();
  };

  const onlyFavoriteDialogs = (chatPreview, userId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview, userId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const renderPreview = (filterFunc) => {
    const arrayList = [];
    const {
      isLonger,
      userId,
      preview,
      goToExpandedDialog,
      chatMode,
      removeChat,
    } = props;
    const sortedPreview = [...preview].sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    sortedPreview.forEach((chatPreview, index) => {
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          changeFavorite={changeFavorite}
          changeBlackList={changeBlackList}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE
              ? removeChat
              : changeShowCatalogCreation
          }
          goToExpandedDialog={goToExpandedDialog}
        />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });
    const previewClassnames = classNames(styles.previewContainer, {
      [styles.longerPreviewContainer]: isLonger,
    });
    const notFoundClassnames = classNames(styles.notFound, {
      [styles.loverNotFound]: isLonger,
    });

    return arrayList.length ? (
      <div className={previewClassnames}>{arrayList}</div>
    ) : (
      <p className={notFoundClassnames}>Not found</p>
    );
  };

  const renderChatPreview = () => {
    const { chatMode } = props;
    if (chatMode === CONSTANTS.FAVORITE_PREVIEW_CHAT_MODE)
      return renderPreview(onlyFavoriteDialogs);
    if (chatMode === CONSTANTS.BLOCKED_PREVIEW_CHAT_MODE)
      return renderPreview(onlyBlockDialogs);
    return renderPreview();
  };

  return renderChatPreview();
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
  changeShowAddChatToCatalogMenu: (data) =>
    dispatch(changeShowAddChatToCatalogMenu(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
