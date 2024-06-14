import { Form, Formik } from 'formik';
import styles from './CreateEventForm.module.sass';
import FormInput from '../FormInput/FormInput';
import FormTimeInput from '../FormTimeInput/FormTimeInput';
import { eventCreateValidationSchem } from '../../utils/validators/eventCreateValidationSchema';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../store/slices/eventSlice';
import { formatISO } from 'date-fns';

function CreateEventForm() {
  const formInputClasses = {
    input: styles.input,
    container: styles.inputContainer,
    notValid: styles.notValid,
    valid: styles.valid,
    warning: styles.fieldWarning,
    lableOfInput: styles.lableOfInput,
  };

  const dispatch = useDispatch();

  const submitHandler = (values, { resetForm }) => {
    dispatch(addEvent(values));
    resetForm();
  };

  return (
    <section className={styles.formContainer}>
      <Formik
        initialValues={{
          name: '',
          time: '',
          remiderTime: '',
        }}
        onSubmit={submitHandler}
        validationSchema={eventCreateValidationSchem}
      >
        <Form className={styles.form}>
          <FormInput
            withLable={true}
            classes={formInputClasses}
            name="name"
            type="text"
            labelText="Event name"
            label="Create logo on monday"
          />
          <FormTimeInput
            classes={formInputClasses}
            name="time"
            type="datetime-local"
            label="Event time"
          />
          <FormTimeInput
            classes={formInputClasses}
            name="remiderTime"
            type="datetime-local"
            label="Event remider time"
          />
          <button type="submit" className={styles.submitButton}>
            {'Create event'}
          </button>
        </Form>
      </Formik>
    </section>
  );
}

export default CreateEventForm;
