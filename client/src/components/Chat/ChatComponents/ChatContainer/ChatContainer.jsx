import React from 'react';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import CONSTANTS from '../../../../constants';

const ChatContainer = (props) => {
  const { data } = props;
  if (data?.role === CONSTANTS.MODERATOR || !data) return null;
  return <Chat />;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(ChatContainer);
