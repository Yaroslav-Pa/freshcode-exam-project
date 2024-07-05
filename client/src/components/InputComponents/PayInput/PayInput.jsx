import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = ({ label, changeFocus, classes, isInputMask, mask, name }) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  const fieldProps = {
    ...field,
    value: field.value || '',
  };

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...fieldProps}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
        />
        {touched && error && <span className={classes.error}>{error}!</span>}
      </div>
    );
  }
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...fieldProps}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          onFocus={() => changeFocus(field.name)}
        />
        {touched && error && <span className={classes.error}>{error}!</span>}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...fieldProps}
        placeholder={label}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name)}
      />
      {touched && error && <span className={classes.error}>{error}!</span>}
    </div>
  );
};

export default PayInput;
