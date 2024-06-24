import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import IndustryTypeSelect from '../IndustryTypeSelect/IndustryTypeSelect';
import TypeSelector from '../TypeSelector/TypeSelector';
import { contestList, getGoToExtended } from '../../utils/contestFunctions';

class CreatorDashboard extends React.Component {
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.search !== this.props.location.search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  componentDidMount() {
    this.props.getDataForContest();
    if (
      this.parseUrlForParams(this.props.location.search) &&
      !this.props.contests.length
    )
      this.getContests(this.props.creatorFilter);
  }

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  goToExtended = getGoToExtended(this.props.history);

  getContests = (filter) => {
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  changePredicate = ({ name, value }) => {
    const { creatorFilter } = this.props;
    this.props.newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    this.parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    this.props.history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      onlyActiveStatus: obj.onlyActiveStatus === 'true',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, this.props.creatorFilter)) {
      this.props.newFilter(filter);
      this.props.clearContestsList();
      this.getContests(filter);
      return false;
    }
    return true;
  };

  getPredicateOfRequest = () => {
    const obj = {};
    const { creatorFilter } = this.props;
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest(),
    });
  };

  tryLoadAgain = () => {
    this.props.clearContestsList();
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...this.getPredicateOfRequest(),
    });
  };

  render() {
    const { error, haveMore, creatorFilter } = this.props;
    const { isFetching } = this.props.dataForContest;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
              onClick={() =>
                this.changePredicate({
                  name: 'ownEntries',
                  value: !creatorFilter.ownEntries,
                })
              }
              className={classNames(styles.button, {
                [styles.activeButton]: creatorFilter.ownEntries,
              })}
            >
              My Entries
            </div>
            <div
              onClick={() =>
                this.changePredicate({
                  name: 'onlyActiveStatus',
                  value: !creatorFilter.onlyActiveStatus,
                })
              }
              className={classNames(styles.button, {
                [styles.activeButton]: creatorFilter.onlyActiveStatus,
              })}
            >
              Only Active
            </div>
            <div className={styles.inputContainer}>
              <span>By contest type</span>
              <TypeSelector
                changePredicate={this.changePredicate}
                creatorFilter={this.props.creatorFilter}
              />
            </div>
            <div className={styles.inputContainer}>
              <span>By contest ID</span>
              <input
                type="text"
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'contestId',
                    value: target.value,
                  })
                }
                name="contestId"
                value={creatorFilter.contestId}
                className={styles.input}
              />
            </div>
            {!isFetching && (
              <div className={styles.inputContainer}>
                <span>By industry</span>
                <IndustryTypeSelect
                  changePredicate={this.changePredicate}
                  creatorFilter={this.props.creatorFilter}
                  dataForContest={this.props.dataForContest}
                />
              </div>
            )}
            <div className={styles.inputContainer}>
              <span>By amount award</span>
              <select
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'awardSort',
                    value: target.value,
                  })
                }
                value={creatorFilter.awardSort}
                className={styles.input}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        {error ? (
          <div className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </div>
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
    );
  }
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
