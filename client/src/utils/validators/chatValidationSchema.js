import * as yup from 'yup';

const Schems = {
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
