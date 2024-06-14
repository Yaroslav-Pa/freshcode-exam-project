import * as yup from 'yup';

// name: '',
// time: '',
// remiderTime: '',

export const eventCreateValidationSchem = yup.object({
  name: yup
    .string()
    .min(3, 'Event name must be at least 3 characters')
    .max(50, 'Event name must be 50 characters maximum')
    .required('Event name required'),
  time: yup
    .date()
    .min(new Date(), 'Event time must be in future')
    .required('Event time required'),
  remiderTime: yup
    .date()
    .min(new Date(), 'Event reminder time must be in future')
    .test(
      'is-before',
      'Event reminder  time must be before event time',
      function (value) {
        const { time } = this.parent;
        return value < time;
      }
    )
    .required('Event reminder time required'),
});
