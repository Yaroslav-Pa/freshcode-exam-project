import styles from './UserInfoBlock.module.sass';

function UserInfoBlock({ label, info }) {
  return (
    <div className={styles.infoBlock}>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.info}>{info}</p>
    </div>
  );
}

export default UserInfoBlock;
