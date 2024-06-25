import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore,
} from '../../../store/slices/chatSlice';
//TODO! delete console.log
class ChatSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, (data) => {
      this.dispatch(changeBlockStatusInStore(data.message));
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', (data) => {
      this.dispatch(addMessage(data.message));
    });
  };

  subscribeChat = (id) => {
    console.log(`Chat = subscribe ${id}`);
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = (id) => {
    console.log(`Chat = unsubscribe ${id}`);
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
