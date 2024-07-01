import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';
import CONSTANTS from '../../../constants';

const UsersOnlyRoute = (Component, props) => {
  const Redirector = ({ data, getUser, isFetching, history, match }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!data && localStorage.hasOwnProperty(CONSTANTS.ACCESS_TOKEN)) {
        getUser();
      }
      setIsLoading(false);
    }, []);

    if (isLoading || isFetching) {
      return <Spinner />;
    }

    if (!isFetching && (!data || data?.role === CONSTANTS.MODERATOR)) {
      return <Redirect to="/login" />;
    }

    return <Component history={history} match={match} {...props} />;
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Redirector);
};

export default UsersOnlyRoute;
