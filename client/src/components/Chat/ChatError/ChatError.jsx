import React, { useEffect } from 'react';
import styles from './ChatError.module.sass';
import CONSTANTS from '../../../constants';
import { useDispatch } from 'react-redux';
import { clearChatError } from '../../../store/slices/chatSlice';
import { redirectToLogin } from '../../../utils/redirectFunctions';
import history from '../../../browserHistory';

const ChatError = ({ getData, error }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      error?.data === CONSTANTS.TOKEN_ERROR.DATA &&
      error?.status === CONSTANTS.TOKEN_ERROR.STATUS
    ) {
      dispatch(clearChatError());
      redirectToLogin(history);
    }
  }, [error, dispatch]);

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
