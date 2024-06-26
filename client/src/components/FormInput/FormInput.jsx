import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import CONSTANTS from '../../constants';

const FormInput = ({
  classes,
  label,
  withError = true,
  withLable = false,
  labelText = null,
  maxLength = CONSTANTS.MAX_LENGTH.OTHER,
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
            maxLength={maxLength}
            {...rest}
          />

          {withError && (
            <ErrorMessage
              name={name}
              component="span"
              className={classes.warning}
            />
          )}
        </div>
      );
    }}
  </Field>
);

export default FormInput;
