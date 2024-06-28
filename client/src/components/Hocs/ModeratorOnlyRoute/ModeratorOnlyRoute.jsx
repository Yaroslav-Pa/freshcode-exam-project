import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';
import CONSTANTS from '../../../constants';
//TODO test, dont allow to view even if technikly allowed

const ModeratorOnlyRoute = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount() {
      if (
        !this.props.data &&
        localStorage.hasOwnProperty(CONSTANTS.ACCESS_TOKEN)
      ) {
        this.props.getUser();
      }
    }

    render() {
      if (this.props.isFetching) {
        return <Spinner />;
      }

      if (
        !this.props.isFetching &&
        (!this.props.data || this.props.data?.role !== CONSTANTS.MODERATOR)
      ) {
        return <Redirect to="/login" />;
      }

      return (
        <Component
          history={this.props.history}
          match={this.props.match}
          {...props}
        />
      );
    }
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default ModeratorOnlyRoute;
