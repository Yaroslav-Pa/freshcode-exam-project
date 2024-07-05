import classNames from 'classnames';
import styles from './UserProfileSectionButton.module.sass';

function UserProfileSectionButton({
  profileViewMode,
  changeProfileViewMode,
  text,
  mode,
}) {
  const buttonStyle = classNames(styles.optionContainer, {
    [styles.currentOption]: profileViewMode === mode,
  });

  return (
    <button className={buttonStyle} onClick={() => changeProfileViewMode(mode)}>
      {text}
    </button>
  );
}

export default UserProfileSectionButton;
