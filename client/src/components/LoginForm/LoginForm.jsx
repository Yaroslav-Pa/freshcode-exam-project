import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { checkAuth, clearAuth } from '../../store/slices/authSlice';
import styles from './LoginForm.module.sass';
import FormInput from '../InputComponents/FormInput/FormInput';
import Schems from '../../utils/validators/registrationAndLoginSchems';
import Error from '../Error/Error';
import CONSTANTS from '../../constants';

function LoginForm({ authClear, loginRequest, history, auth, submitting }) {
  useEffect(() => () => authClear(), [authClear]);

  const clicked = (values) => {
    loginRequest({ data: values, history: history });
  };

  const { error, isFetching } = auth;

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginFormContainer}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={authClear}
        />
      )}
      <h2 className={styles.mainText}>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={clicked}
        validationSchema={Schems.LoginSchem}
      >
        <Form className={styles.form}>
          <FormInput
            classes={formInputClasses}
            maxLength={CONSTANTS.MAX_LENGTH.USER_EMAIL}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitButton}
          >
            {isFetching ? 'Submitting...' : 'LOGIN'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: ({ data, history }) =>
    dispatch(checkAuth({ data, history, authMode: CONSTANTS.AUTH_MODE.LOGIN })),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
