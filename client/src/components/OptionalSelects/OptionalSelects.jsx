import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../InputComponents/SelectInput/SelectInput';
import FormInput from '../InputComponents/FormInput/FormInput';
import styles from '../Contest/ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import ButtonGroup from '../InputComponents/ButtonGroup/ButtonGroup';
import TEXT_CONTANTS from '../../textConstanst';

const OptionalSelects = ({ contestType, isFetching, dataForContest }) => {
  if (isFetching) {
    return <Spinner />;
  }
  switch (contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <ButtonGroup
            name="matchingDomain"
            buttons={TEXT_CONTANTS.BUTTON_GROUP}
            classes={{
              header: styles.buttonGroupHeader,
              container: styles.buttonGroupContainer,
              warning: styles.warning,
            }}
          />
          <SelectInput
            name="typeOfName"
            header="Type of company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={dataForContest.data.typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={dataForContest.data.nameStyle}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
                notValid: styles.notValid,
                valid: styles.valid,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Brand Style"
            optionsArray={dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
                notValid: styles.notValid,
                valid: styles.valid,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Type tagline"
            optionsArray={dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
    default:
      return;
  }
};

export default OptionalSelects;
