import React from 'react';
import styles from './Error.module.sass';

function Error({ clearError, status, data }) {
  const getMessage = () => {
    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank declined transaction';
      case 406:
        return data;
      default:
        return 'Server Error';
    }
  };

  return (
    <section className={styles.errorContainer}>
      <p className={styles.errorText}>
        {`Error ${status ?? ''}: ` + getMessage()}
      </p>
      <i
        className={'far fa-times-circle ' + styles.closeIcon}
        onClick={() => clearError()}
      />
    </section>
  );
}

export default Error;
