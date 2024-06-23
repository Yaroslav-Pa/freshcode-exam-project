import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';
import { getContestById } from '../../store/slices/contestByIdSlice';
import { useDispatch } from 'react-redux';
const Notification = ({ message, history, contestId }) => {
  const dispatch = useDispatch();

  const clickHendler = () => {
    const conntestPath = `/contest/${contestId}`;
    if (window.location.pathname === conntestPath) {
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
