import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';
import { getContestById } from '../../store/slices/contestByIdSlice';
import { useDispatch } from 'react-redux';
import { addUserBalance } from '../../store/slices/userSlice';

const Notification = ({ message, history, contestId, prize = null }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (prize) {
      dispatch(addUserBalance(prize));
    }
  }, [dispatch, prize]);

  const clickHendler = () => {
    const conntestPath = `/contest/${contestId}`;
    const contestPathPattern = /^\/contest\/\d+$/;
    if (contestPathPattern.test(window.location.pathname)) {
      dispatch(getContestById({ contestId }));
    }
    history.push(conntestPath);
  };
  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId && (
        <span onClick={clickHendler} className={styles.goToContest}>
          Go to contest
        </span>
      )}
    </div>
  );
};

export default withRouter(Notification);
