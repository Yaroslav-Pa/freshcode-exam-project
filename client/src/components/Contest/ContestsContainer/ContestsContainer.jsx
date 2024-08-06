import React, { useCallback, useEffect } from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../../Spinner/Spinner';

const ContestsContainer = ({ haveMore, loadMore, isFetching, children }) => {
  const scrollHandler = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        loadMore(children.length);
      }
    }
  }, [children.length, haveMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  if (!isFetching && children.length === 0) {
    return <div className={styles.notFound}>Nothing found</div>;
  }
  return (
    <div className={styles.container}>
      {children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ContestsContainer;
