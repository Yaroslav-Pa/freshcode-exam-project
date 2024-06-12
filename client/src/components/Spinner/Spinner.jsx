import React from 'react';
import { ClipLoader } from 'react-spinners';
// import { css } from '@emotion/core';
import styles from './Spinner.module.sass';

/* const override = css`
  border-color: #46568a;
`; */
//TODO! only changed size to {'50px'}, so it will not show warnings
// it was like this before:
// sizeUnit='px'
// // css={override}
// size={50}
const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      // sizeUnit='px'
      // css={override}
      size={'50px'}
      color='#46568a'
      loading
    />
  </div>
);

export default SpinnerLoader;
