import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import LoginRegisterHeader from '../../components/LoginRegisterHeader/LoginRegisterHeader';

const LoginPage = ({ history }) => (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <LoginRegisterHeader buttonText={'Signup'} url={'/registration'} />
      <LoginForm history={history} />
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
