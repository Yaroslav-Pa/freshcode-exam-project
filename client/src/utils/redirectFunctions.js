import CONSTANTS from '../constants';
import store from '../store';
import { clearChatDataToInitial } from '../store/slices/chatSlice';
import { clearUserStore } from '../store/slices/userSlice';

export const redirectToLogin = (history) => {
  const dispatch = store.dispatch;
  window.localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
  dispatch(clearUserStore());
  dispatch(clearChatDataToInitial());
  history.replace({
    pathname: '/login',
    search: '?isTokenExpired=true',
  });
  history.go();
};
