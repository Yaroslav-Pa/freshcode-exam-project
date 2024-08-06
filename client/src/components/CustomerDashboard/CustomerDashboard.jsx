import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../Contest/ContestsContainer/ContestsContainer';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import { contestList, getGoToExtended } from '../../utils/contestFunctions';

const CustomerDashboard = ({
  getContestsRedux,
  clearContestsList,
  newFilter,
  customerFilter,
  error,
  haveMore,
  history,
  isFetching,
  contests,
}) => {
  const getContests = useCallback(() => {
    getContestsRedux({
      limit: 8,
      contestStatus: customerFilter,
    });
  }, [customerFilter, getContestsRedux]);

  useEffect(() => {
    getContests();
    return () => {
      clearContestsList();
    };
  }, [getContests, customerFilter, clearContestsList]);

  const goToExtended = getGoToExtended(history);

  const loadMore = (startFrom) => {
    getContestsRedux({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContests();
  };

  const handleFilterChange = (filter) => {
    if (customerFilter !== filter) {
      newFilter(filter);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() => handleFilterChange(CONSTANTS.CONTEST_STATUS_ACTIVE)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]: CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          onClick={() => handleFilterChange(CONSTANTS.CONTEST_STATUS_FINISHED)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() => handleFilterChange(CONSTANTS.CONTEST_STATUS_PENDING)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            history={history}
            haveMore={haveMore}
          >
            {contestList(contests, goToExtended)}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContestsRedux: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
