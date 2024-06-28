import React from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import { format, isSameDay, parseISO } from 'date-fns';

class Dialog extends React.Component {
  messagesEnd = React.createRef();

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  componentDidMount() {
    this.props.getDialog({ interlocutorId: this.props.interlocutor.id });
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.clearMessageList();
  }

  componentDidUpdate(prevProps) {
    if (this.messagesEnd.current) this.scrollToBottom();
    if (this.props.interlocutor?.id !== prevProps.interlocutor?.id) {
      this.props.getDialog({ interlocutorId: this.props.interlocutor.id });
    }
  }

  renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = this.props;
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
          <div ref={this.messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  blockMessage = () => {
    const { userId, chatData } = this.props;
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

  render() {
    const { chatData, userId } = this.props;
    return (
      <>
        <ChatHeader userId={userId} />
        {this.renderMainDialog()}
        <div ref={this.messagesEnd} />
        {chatData && chatData.blackList.includes(true) ? (
          this.blockMessage()
        ) : (
          <ChatInput />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
