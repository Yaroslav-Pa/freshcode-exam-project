import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../../store/slices/userProfileSlice';
import SpinnerLoader from '../Spinner/Spinner';
import styles from './UserProfileTransactionTable.module.sass';
import TransactionTable from '../TransactionTable/TransactionTable';

function UserProfileTransactionTable() {
  const dispatch = useDispatch();

  const { isFetching, transactionHistory, error } = useSelector((state) => ({
    ...state.userProfile,
  }));

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, []);

  return (
    <section className={styles.container}>
      {isFetching && <SpinnerLoader />}
      {error && (
        <p className={styles.ErrorText}>
          {error?.message || 'There was a error when fetching data from server'}
        </p>
      )}
      {transactionHistory && transactionHistory.length !== 0 ? (
        <TransactionTable transactionHistory={transactionHistory}/>
      ) : (
        <p className={styles.ErrorText}>
          Your transaction history is currently empty.
        </p>
      )}
    </section>
  );
}

export default UserProfileTransactionTable;
