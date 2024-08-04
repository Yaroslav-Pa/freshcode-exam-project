import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
  setNewMessageOff,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import { format, isSameDay, parseISO } from 'date-fns';

const Dialog = ({
  getDialog,
  setNewMessageOff,
  clearMessageList,
  chatData,
  messages,
  userId,
  interlocutor,
}) => {
  const messagesEnd = useRef();

  const scrollToBottom = useCallback(() => {
    if (messagesEnd?.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (chatData?._id) setNewMessageOff(chatData._id);
    return () => {
      clearMessageList();
    };
  }, [chatData?._id, clearMessageList, setNewMessageOff]);

  useEffect(() => {
    if (interlocutor?.id) {
      getDialog({ interlocutorId: interlocutor.id });
    }
  }, [interlocutor?.id, getDialog]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = new Date();
    messages.forEach((message, i) => {
      if (!isSameDay(currentTime, message.createdAt)) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {format(message.createdAt, 'MMMM dd, yyyy')}
          </div>
        );
        currentTime = parseISO(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {format(message.createdAt, 'HH:mm')}
          </span>
          <div ref={messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput />
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
  setNewMessageOff: (id) => dispatch(setNewMessageOff(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
