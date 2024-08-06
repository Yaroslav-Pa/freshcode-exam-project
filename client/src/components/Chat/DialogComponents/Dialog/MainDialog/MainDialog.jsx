import classNames from "classnames";
import { format, isSameDay, parseISO } from "date-fns";
import styles from './MainDialog.module.sass'
const MainDialog = ({messages, userId, messagesEnd }) => {
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
        className={classNames(
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

export default MainDialog;