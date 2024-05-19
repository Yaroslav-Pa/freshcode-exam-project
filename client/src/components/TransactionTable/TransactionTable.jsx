import styles from './TransactionTable.module.sass';

function TransactionTable({ transactionHistory }) {
  return (
    <section>
      <h1 className={styles.MainText}>Your transaction history</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Transaction type</th>
            <th scope="col">Sum</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory
            .toReversed()
            .map(({ id, operationType, sum, createdAt: date }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{operationType.toLowerCase()}</td>
                <td>{sum}</td>
                <td>{new Date(date).toUTCString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionTable;
