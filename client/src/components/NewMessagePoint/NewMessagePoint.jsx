import classNames from 'classnames';
import styles from './NewMessagePoint.module.sass';

function NewMessagePoint({ isNewMessage, right = '-5px', top = `2px` }) {
  const newMessageClassnames = classNames(styles.newMessage, {
    [styles.newMessageActive]: isNewMessage,
  });

  return (
    (
      <div
        className={newMessageClassnames}
        style={{ right: `${right}`, top: `${top}` }}
      />
    )
  );
}

export default NewMessagePoint;
