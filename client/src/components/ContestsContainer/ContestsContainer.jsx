import React from 'react';
import { withRouter } from 'react-router';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

class ContestsContainer extends React.Component {
  componentDidMount () {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (this.props.haveMore) {
        this.props.loadMore(this.props.children.length);
      }
    }
  };

  render () {
    const { isFetching } = this.props;
    return (
      <div className={styles.container}>
        {this.props.children}
        {isFetching && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default ContestsContainer;
