import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import ContestsContainer from '../Contest/ContestsContainer/ContestsContainer';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import IndustryTypeSelect from '../IndustryTypeSelect/IndustryTypeSelect';
import TypeSelector from '../TypeSelector/TypeSelector';
import { contestList, getGoToExtended } from '../../utils/contestFunctions';

function CreatorDashboard(props) {
  const prevSearchRef = useRef(props.location.search);

  useEffect(() => {
    if (prevSearchRef.current !== props.location.search) {
      prevSearchRef.current = props.location.search;
      if (props.location.search) {
        parseUrlForParams(props.location.search);
      }
    }
  }, [props.location.search]);

  useEffect(() => {
    props.getDataForContest();
    parseUrlForParams(props.location.search);
    return () => {
      props.clearContestsList();
    };
  }, []);

  const goToExtended = getGoToExtended(props.history);

  const getContests = (filter) => {
    props.getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  const changePredicate = ({ name, value }) => {
    const { creatorFilter } = props;
    props.newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    props.history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const parseUrlForParams = (search) => {
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
    props.newFilter(filter);
    props.clearContestsList();
    getContests(filter);
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    const { creatorFilter } = props;
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    props.getContests({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const tryLoadAgain = () => {
    props.clearContestsList();
    props.getContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  const { error, haveMore, creatorFilter } = props;
  const { isFetching } = props.dataForContest;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
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
              changePredicate({
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
              changePredicate={changePredicate}
              creatorFilter={props.creatorFilter}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target: { value } }) => {
                if (/^\d*$/.test(value)) {
                  return changePredicate({
                    name: 'contestId',
                    value: value,
                  });
                }
              }}
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              <IndustryTypeSelect
                changePredicate={changePredicate}
                creatorFilter={props.creatorFilter}
                dataForContest={props.dataForContest}
              />
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              name={'awardSort'}
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
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ContestsContainer
          isFetching={props.isFetching}
          loadMore={loadMore}
          history={props.history}
          haveMore={haveMore}
        >
          {contestList(props.contests, goToExtended)}
        </ContestsContainer>
      )}
    </div>
  );
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
