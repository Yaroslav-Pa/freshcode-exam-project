import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import ChatError from '../../ChatError/ChatError';
import NewMessagePoint from '../../../NewMessagePoint/NewMessagePoint';
import RenderDialogList from './RenderDialogList/RenderDialogList';

const Chat = ({
  id,
  getPreviewChat,
  changeShow,
  chatStore,
  setChatPreviewMode,
}) => {
  useEffect(() => {
    chatController.subscribeChat(id);
    getPreviewChat();
    return () => {
      chatController.unsubscribeChat(id);
    };
  }, [id, getPreviewChat]);

  const { isExpanded, isShow, isShowCatalogCreation, error } = chatStore;
  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={getPreviewChat} error={error} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? (
        <Dialog userId={id} />
      ) : (
        <RenderDialogList
          id={id}
          setChatPreviewMode={setChatPreviewMode}
          chatStore={chatStore}
        />
      )}
      <div className={styles.toggleChat} onClick={() => changeShow()}>
        {isShow ? 'Hide Chat' : 'Show Chat'}
        <NewMessagePoint
          isNewMessage={chatStore.isNewMessages && !chatStore.isShow}
          top="-6px"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    chatStore,
    userStore: {
      data: { id },
    },
  } = state;
  return { chatStore, id };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
