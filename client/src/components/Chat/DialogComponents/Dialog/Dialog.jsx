import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getDialogMessages,
  clearMessageList,
  setNewMessageOff,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import BlockMessage from './BlockMessage/BlockMessage';
import MainDialog from './MainDialog/MainDialog';

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

  return (
    <>
      <ChatHeader userId={userId} />
      <MainDialog
        messages={messages}
        userId={userId}
        messagesEnd={messagesEnd}
      />
      <div ref={messagesEnd} />
      {chatData && chatData.blackList.includes(true) ? (
        <BlockMessage userId={userId} chatData={chatData} />
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
