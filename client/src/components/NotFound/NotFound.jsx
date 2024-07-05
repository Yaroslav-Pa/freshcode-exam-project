import React from 'react';
import styles from './NotFound.module.sass';
import Logo from '../Logo';

const NotFound = () => (
  <>
    <div className={styles.header}>
      <Logo />
    </div>
    <div className={styles.container}>
      <span>Not Found</span>
    </div>
  </>
);

export default NotFound;
