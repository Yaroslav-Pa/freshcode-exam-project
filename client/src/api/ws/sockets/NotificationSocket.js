import React from 'react';
import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification/Notification';

class NotificationSocket extends WebSocket {
  constructor (dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      // console.log('Received changeMark notification');
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', message => {
      // console.log('Received changeOfferStatus notification:', message);
      toast(
        <Notification message={message.message} contestId={message.contestId} />
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      // console.log('Received onEntryCreated notification');
      toast('New Entry');
    });
  };

  subscribe = id => {
    // console.log('Subscribing to room:', id);
    this.socket.emit('subscribe', id);
  };

  unsubsctibe = id => {
    // console.log('Unsubscribing from room:', id);
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
