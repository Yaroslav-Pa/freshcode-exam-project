import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

const FormTimeInput = ({ classes, label, name, ...rest }) => (
  <Field name={name}>
    {({ field, meta: { touched, error } }) => {
      const inputClassName = classNames(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <div className={classes.container}>
          <label className={classes.lableOfInput}>{label}</label>
          <input
            type="datetime-local"
            {...field}
            placeholder={label}
            className={inputClassName}
            {...rest}
          />

          <ErrorMessage
            name={name}
            component="span"
            className={classes.warning}
          />
        </div>
      );
    }}
  </Field>
);

export default FormTimeInput;
