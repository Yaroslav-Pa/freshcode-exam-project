import React from 'react';
import { Field, ErrorMessage } from 'formik';
import NameContestButton from '../../NameContestButton/NameContestButton';

const ButtonGroup = ({ classes, buttons, ...rest }) => (
  <Field {...rest}>
    {({ field, form: { setFieldValue } }) => {
      const { container, warning, header } = classes;

      const handleClick = (value) => {
        setFieldValue(field.name, value);
      };

      return (
        <>
          <p className={header}>
            Do you want a matching domain (.com URL) with your name?
          </p>
          <div className={container}>
            {buttons.map((button, index) => (
              <NameContestButton
                key={index}
                answer={button.answer}
                details={button.details}
                isRecommended={button.isRecommended}
                isActive={field.value === button.value}
                onClick={() => handleClick(button.value)}
              />
            ))}
            <ErrorMessage
              name={field.name}
              component="span"
              className={warning}
            />
          </div>
        </>
      );
    }}
  </Field>
);

export default ButtonGroup;
