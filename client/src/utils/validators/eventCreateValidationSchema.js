import * as yup from 'yup';

export const eventCreateValidationSchem = yup.object({
  name: yup
    .string()
    .min(3, 'Event name must be at least 3 characters')
    .max(100, 'Event name must be 100 characters maximum')
    .required('Event name required'),
  endTime: yup
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
        const { endTime } = this.parent;
        return value < endTime;
      }
    )
    .required('Event reminder time required'),
});
