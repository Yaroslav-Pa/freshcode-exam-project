import React from 'react';
import styles from './ChatError.module.sass';
import CONSTANTS from '../../constants';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChatError = ({ getData, error }) => {
  const history = useHistory();
  if (
    error?.data === CONSTANTS.TOKEN_ERROR.DATA &&
    error?.status === CONSTANTS.TOKEN_ERROR.STATUS
  ) {
    history.replace('/login');
    toast('Apologies, session token timed out. Please re-enter to continue.');
  }
  return (
    <div className={styles.errorContainer} onClick={() => getData()}>
      <div className={styles.container}>
        <p>Server Error</p>
        <i className="fas fa-redo" />
      </div>
    </div>
  );
};

export default ChatError;
