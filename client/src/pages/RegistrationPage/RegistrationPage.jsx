import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import LoginRegisterHeader from '../../components/LoginRegisterHeader/LoginRegisterHeader';
import RegistrationFooter from '../../components/RegistrationFooter/RegistrationFooter';

const RegistrationPage = ({ history, clearError }) => {
  useEffect(() => {
    clearError();
  }, []);

  return (
    <section className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <LoginRegisterHeader buttonText="Login" url="/login" />
        <RegistrationForm history={history} />
      </div>
      <RegistrationFooter />
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
