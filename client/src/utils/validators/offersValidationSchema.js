import * as yup from 'yup';

const Schems = {
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
};

export default Schems;
