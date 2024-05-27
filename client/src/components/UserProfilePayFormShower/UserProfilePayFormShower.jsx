import Error from '../Error/Error';
import PayForm from '../PayForm/PayForm';
import styles from './UserProfilePayFormShower.module.sass';

function UserProfilePayFormShower({
  balance,
  error,
  clearPaymentStore,
  cashOut,
}) {
  const pay = ({ number, expiry, cvc, sum }) => {
    cashOut({
      number,
      expiry,
      cvc,
      sum,
    });
  };

  return (
    <section className={styles.container}>
      {parseInt(balance) === 0 ? (
        <span className={styles.notMoney}>
          There is no money on your balance
        </span>
      ) : (
        <div>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}
          <PayForm sendRequest={pay} />
        </div>
      )}
    </section>
  );
}

export default UserProfilePayFormShower;
