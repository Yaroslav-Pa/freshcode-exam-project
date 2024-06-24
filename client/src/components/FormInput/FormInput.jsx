import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

const FormInput = ({
  classes,
  label,
  withLable = false,
  labelText = null,
  name,
  ...rest
}) => (
  <Field name={name}>
    {(props) => {
      const {
        field,
        meta: { touched, error },
      } = props;

      const inputClassName = classNames(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <div className={classes.container}>
          {withLable && (
            <label className={classes.lableOfInput}>
              {labelText ? labelText : label}
            </label>
          )}
          <input
            type="text"
            {...field}
            placeholder={label}
            className={inputClassName}
            autoComplete="on"
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

export default FormInput;
