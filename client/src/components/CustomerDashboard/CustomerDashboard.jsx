import React from 'react';
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

class CustomerDashboard extends React.Component {
  componentDidMount() {
    this.getContests();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }
  
  componentWillUnmount() {
    this.props.clearContestsList();
  }

  goToExtended = getGoToExtended(this.props.history);

  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  handleFilterChange = (filter) => {
    if (this.props.customerFilter !== filter) {
      this.props.newFilter(filter);
    }
  };

  render() {
    const { error, haveMore } = this.props;
    const { customerFilter } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() =>
              this.handleFilterChange(CONSTANTS.CONTEST_STATUS_ACTIVE)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() =>
              this.handleFilterChange(CONSTANTS.CONTEST_STATUS_FINISHED)
            }
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
            onClick={() =>
              this.handleFilterChange(CONSTANTS.CONTEST_STATUS_PENDING)
            }
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
            <TryAgain getData={this.tryToGetContest} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}
            >
              {contestList(this.props.contests, this.goToExtended)}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
