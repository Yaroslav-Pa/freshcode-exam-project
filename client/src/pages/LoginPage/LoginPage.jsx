import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import LoginRegisterHeader from '../../components/LoginRegisterHeader/LoginRegisterHeader';

const LoginPage = (props) => (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <LoginRegisterHeader buttonText={'Signup'} url={'/registration'} />
      <div className={styles.loginFormContainer}>
        <LoginForm history={props.history} />
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
