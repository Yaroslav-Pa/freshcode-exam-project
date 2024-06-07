import * as yup from 'yup';
import valid from 'card-validator';
import CONSTANTS from '../../constants';

//TODO if have time spread to different validator files, dont think its good leave it like this

const Schems = {
  ContestSchem: yup.object({
    nameVenture: yup
      .string()
      .min(3, "Venture must be at least 3 characters")
      .when('contestType', {
        is: value => CONSTANTS.CONTEST_VENTURE_REQUIRED.includes(value),
        then: yup.string().required('Venture is required')
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
    file: yup.mixed(),
  }),
  filterSchem: yup.object().shape({
    typeIndex: yup.number().oneOf[(1, 2, 3, 4, 5, 6, 7)],
    contestId: yup.string(),
    awardSort: yup.string().matches(/(desc|asc)/),
    industry: yup.string(),
  }),
  LogoOfferSchema: yup.object().shape({
    offerData: yup.mixed().required('required'),
  }),
  TextOfferSchema: yup.object().shape({
    offerData: yup
      .string()
      .test(
        'test-offerData',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('suggestion is required'),
  }),
  PaymentSchema: yup.object().shape({
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        (value) => valid.number(value).isValid
      )
      .required('required'),
    name: yup
      .string()
      .min(1, 'required atleast one symbol')
      .required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        (value) => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  CashoutSchema: yup.object().shape({
    sum: yup.number().min(5, 'min sum is 5$').required('required'),
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        (value) => valid.number(value).isValid
      )
      .required('required'),
    name: yup.string().min(1).required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        (value) => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  UpdateUserSchema: yup.object().shape({
    firstName: yup
      .string()
      .test(
        'test-firstName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
    file: yup.mixed(),
  }),
  MessageSchema: yup.object({
    message: yup
      .string()
      .test(
        'test-message',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
  }),
  CatalogSchema: yup.object({
    catalogName: yup
      .string()
      .test(
        'test-catalogName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
  }),
};

export default Schems;
