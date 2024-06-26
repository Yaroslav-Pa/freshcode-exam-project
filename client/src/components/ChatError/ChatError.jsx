import React, { useEffect } from 'react';
import styles from './ChatError.module.sass';
import CONSTANTS from '../../constants';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearChatError } from '../../store/slices/chatSlice';

const ChatError = ({ getData, error }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      error?.data === CONSTANTS.TOKEN_ERROR.DATA &&
      error?.status === CONSTANTS.TOKEN_ERROR.STATUS
    ) {
      history.replace('/login');
      toast('Apologies, session token timed out. Please re-enter to continue.');
      dispatch(clearChatError());
    }
  }, [error, history, dispatch]);

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
