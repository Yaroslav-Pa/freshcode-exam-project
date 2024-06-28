import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';
import CONSTANTS from '../../../constants';

const OnlyNotAuthorizedUserHoc = (Component) => {
  class HocForLoginSignUp extends React.Component {
    componentDidMount() {
      if (localStorage.hasOwnProperty(CONSTANTS.ACCESS_TOKEN)) {
        this.props.checkAuth(this.props.history.replace);
      }
    }

    render() {
      if (this.props.isFetching) {
        return <Spinner />;
      }
      if (!this.props.data) {
        return <Component history={this.props.history} />;
      }
      return null;
    }
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (replace) => dispatch(getUser(replace)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
