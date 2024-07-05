import * as yup from 'yup';

const emailRequiredError = 'Email address is required.';
const emailValidationError = 'Enter a valid email (e.g. test@email.com).';
const passwordRequiredError = 'Password field is required.';
const passwordValidationError = 'Password must be 6+ chars.';
const StandartRequiredError = 'Required';

const registarationAndLoginSchems = {
  LoginSchem: yup.object().shape({
    email: yup
      .string()
      .email(emailValidationError)
      .required(emailRequiredError),
    password: yup
      .string()
      .test(
        'test-password',
        passwordValidationError,
        (value) => value && value.trim().length >= 6
      )
      .required(passwordRequiredError),
  }),
  RegistrationSchem: yup.object().shape({
    email: yup
      .string()
      .email(emailValidationError)
      .required(emailRequiredError),
    password: yup
      .string()
      .test(
        'test-password',
        passwordValidationError,
        (value) => value && value.trim().length >= 6
      )
      .required(passwordRequiredError),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Confirmation pass must match password'),
    firstName: yup
      .string()
      .test(
        'test-firstName',
        StandartRequiredError,
        (value) => value && value.trim().length >= 1
      )
      .required('First name is required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        StandartRequiredError,
        (value) => value && value.trim().length >= 1
      )
      .required('Last name is required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        StandartRequiredError,
        (value) => value && value.trim().length >= 1
      )
      .required('Display name is required'),
    role: yup
      .string()
      .matches(/(customer|creator)/)
      .required('Role is required'),
    agreeOfTerms: yup
      .boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  }),
};

export default registarationAndLoginSchems;
