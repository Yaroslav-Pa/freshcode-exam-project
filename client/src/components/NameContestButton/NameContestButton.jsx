import { FaCheck } from 'react-icons/fa';
import styles from './NameContestButton.module.sass';
import classNames from 'classnames';

function NameContestButton({
  answer,
  details,
  onClick,
  isRecommended = false,
  isActive = false,
}) {
  const buttonClassname = classNames(styles.button, {
    [styles.active]: isActive,
  });
  return (
    <button className={buttonClassname} onClick={onClick} type="button">
      <h3 className={styles.answer}>{answer}</h3>
      <p className={styles.description}>{details}</p>
      {isActive && <FaCheck className={styles.check} />}
      {isRecommended && <div className={styles.recommend}>Recommended</div>}
    </button>
  );
}

export default NameContestButton;
