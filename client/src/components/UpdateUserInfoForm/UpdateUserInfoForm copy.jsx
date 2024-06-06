import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../store/slices/userSlice';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

function UpdateUserInfoForm({
  onSubmit,
  submitting,
  error,
  clearUserError,
  initialValues,
}) {

  //TODO! not shure about this
  const userInfoToChangeArr = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Display Name', name: 'displayName' },
  ];

  const changeFildsList = userInfoToChangeArr.map(({ label, name }) => (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <FormInput
        name={name}
        type="text"
        label={label}
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.error,
          notValid: styles.notValid,
        }}
      />
    </div>
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
