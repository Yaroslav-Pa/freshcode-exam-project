import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';
import CONSTANTS from '../../../constants';

const OnlyNotAuthorizedUserHoc = (Component) => {
  function HocForLoginSignUp({ history, checkAuth, isFetching, data }) {
    useEffect(() => {
      if (localStorage.hasOwnProperty(CONSTANTS.ACCESS_TOKEN)) {
        checkAuth(history.replace);
      }
    }, [checkAuth, history.replace]);

    if (isFetching) {
      return <Spinner />;
    }
    if (!data) {
      return <Component history={history} />;
    }
    return null;
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (replace) => dispatch(getUser(replace)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
