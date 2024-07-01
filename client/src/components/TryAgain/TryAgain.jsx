import React from 'react';
import styles from './TryAgain.module.sass';

const TryAgain = ({ getData, additionalText }) => {
  return (
    <div className={styles.container}>
      <p onClick={() => getData()} className={styles.tryAgainText}>
        Server Error. Try again
      </p>
      {additionalText && (
        <p className={styles.additionalText}>{additionalText}</p>
      )}
      <i className="fas fa-redo" onClick={() => getData()} />
    </div>
  );
};

export default TryAgain;
