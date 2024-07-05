import React, { useCallback, useEffect } from 'react';
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

function CreatorDashboard({
  location: { search },
  history,
  error,
  haveMore,
  creatorFilter,
  dataForContest,
  isFetching,
  contests,
  getDataForContest,
  clearContestsList,
  getCreatorContests,
  newFilter,
}) {
  const getContests = useCallback(
    (filter) => {
      getCreatorContests({
        limit: 8,
        offset: 0,
        ...filter,
      });
    },
    [getCreatorContests]
  );

  const parseUrlForParams = useCallback(
    (search) => {
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
      newFilter(filter);
      clearContestsList();
      getContests(filter);
    },
    [clearContestsList, getContests, newFilter]
  );

  useEffect(() => {
    parseUrlForParams(search);
  }, [search, parseUrlForParams]);

  useEffect(() => {
    getDataForContest();
    return () => {
      clearContestsList();
    };
  }, [clearContestsList, getDataForContest]);

  const goToExtended = getGoToExtended(history);

  const changePredicate = ({ name, value }) => {
    newFilter({
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
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    getCreatorContests({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const tryLoadAgain = () => {
    clearContestsList();
    getCreatorContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  const { isFetching: isDataForContestFetching } = dataForContest;
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
              creatorFilter={creatorFilter}
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
          {!isDataForContestFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              <IndustryTypeSelect
                changePredicate={changePredicate}
                creatorFilter={creatorFilter}
                dataForContest={dataForContest}
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
          isFetching={isFetching}
          loadMore={loadMore}
          history={history}
          haveMore={haveMore}
        >
          {contestList(contests, goToExtended)}
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
  getCreatorContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
