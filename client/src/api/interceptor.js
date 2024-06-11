import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const instance = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => {
    if (response.data.token) {
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  err => {
    //TODO! choose
    //* V1
    // const history = createBrowserHistory();
    // history.location.pathname
    //* V2
    const location = window.location.pathname;
    if (
      err.response.status === 408 &&
      location !== '/login' &&
      location !== '/registration' &&
      location !== '/'
    ) {
      //*V1
      // history.replace('/login');
      // history.go();
      //*V2
      window.location.pathname = '/login';
    }
    return Promise.reject(err);
  }
);

export default instance;
