import CONSTANTS from '../constants';

export const redirectToLogin = (history) => {
  window.localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
  history.replace({
    pathname: '/login',
    search: '?isTokenExpired=true',
  });
  history.go();
};
