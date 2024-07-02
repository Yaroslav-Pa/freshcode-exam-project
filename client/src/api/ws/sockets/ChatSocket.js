import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore,
} from '../../../store/slices/chatSlice';
import store from '../../../store';
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
      const userId = store.getState().userStore.data.id;
      this.dispatch(addMessage({ ...data.message, userId }));
    });
  };

  subscribeChat = (id) => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = (id) => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
