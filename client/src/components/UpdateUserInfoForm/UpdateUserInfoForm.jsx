import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../store/slices/userSlice';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';
import CONSTANTS from '../../constants';

function UpdateUserInfoForm({
  onSubmit,
  submitting,
  error,
  clearUserError,
  initialValues,
}) {

  const changeFildsList = CONSTANTS.USER_INFO_TO_CHANGE.map(({ label, name }) => (
    <section className={styles.container} key={label}>
      <span className={styles.label}>{label}</span>
      <FormInput
        name={name}
        type="text"
        label={label}
        maxLength={CONSTANTS.MAX_LENGTH.USER_INPUTS}
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.error,
          notValid: styles.notValid,
        }}
      />
    </section>
  ));

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        {changeFildsList}
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
