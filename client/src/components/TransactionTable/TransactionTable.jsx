import TableRowItem from './TableRowItem/TableRowItem';
import style from './TransactionTable.module.sass';

function TransactionTable({ transactionHistory }) {
  return (
    <section className={style.tableContainer}>
      <h1 className={style.mainText}>Your transaction history</h1>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Transaction type</th>
            <th>Sum</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory
            ?.toReversed()
            .map(({ id, operationType, sum, createdAt }) => (
              <tr>
                <td className={style.tableElement}>{id}</td>
                <td className={style.tableElement}>
                  {operationType.toLowerCase()}
                </td>
                <td className={style.tableElement}>{sum}</td>
                <td className={style.tableElement}>
                  {new Date(createdAt).toUTCString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionTable;
