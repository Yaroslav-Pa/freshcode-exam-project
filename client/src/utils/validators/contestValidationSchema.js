import * as yup from 'yup';
import CONSTANTS from '../../constants';

const ContestSchem = yup.object({
  nameVenture: yup
    .string()
    .min(3, 'Venture must be at least 3 characters')
    .when('contestType', {
      is: (value) => CONSTANTS.CONTEST_VENTURE_REQUIRED.includes(value),
      then: yup.string().required('Venture is required'),
    }),
  contestType: yup
    .string()
    .matches(/(name|tagline|logo)/)
    .required(),
  title: yup
    .string()
    .test(
      'test-title',
      'required',
      (value) => value && value.trim().length >= 1
    )
    .required('title of contest required'),
  industry: yup.string().required('industry required'),
  focusOfWork: yup
    .string()
    .test(
      'test-focusOfWork',
      'required',
      (value) => value && value.trim().length >= 1
    )
    .required('focus of work required'),
  targetCustomer: yup
    .string()
    .test(
      'test-targetCustomer',
      'required',
      (value) => value && value.trim().length >= 1
    )
    .required('target customers required'),
  styleName: yup.string().min(1),
  typeOfName: yup.string().min(1),
  typeOfTagline: yup.string().min(1),
  brandStyle: yup.string().min(1),
  matchingDomain: yup.string().min(1),
  file: yup.mixed(),
});

export default ContestSchem;
