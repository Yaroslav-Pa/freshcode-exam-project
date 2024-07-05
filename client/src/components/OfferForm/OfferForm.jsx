import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import CONTANTS from '../../constants';
import {
  addOffer,
  clearAddOfferError,
} from '../../store/slices/contestByIdSlice';
import styles from './OfferForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../InputComponents/FormInput/FormInput';
import Schems from '../../utils/validators/offersValidationSchema';
import Error from '../Error/Error';

const OfferForm = ({
  clearOfferError,
  addOfferError,
  contestId,
  contestType,
  customerId,
  createNewOffer,
}) => {
  useEffect(() => () => clearOfferError(), [clearOfferError]);

  const renderOfferInput = () => {
    if (contestType === CONTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    clearOfferError();
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    createNewOffer(data);
    resetForm();
  };

  const validationSchema =
    contestType === CONTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          }
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createNewOffer: (data) => dispatch(addOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
