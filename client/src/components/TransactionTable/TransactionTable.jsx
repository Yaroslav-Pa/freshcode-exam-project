import style from './TransactionTable.module.sass';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import CONSTANTS from '../../constants';

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
            .map(({ id, operationType, sum, createdAt }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{operationType.toLowerCase()}</td>
                  <td>{sum}</td>
                  <td>
                    {format(
                      toZonedTime(createdAt, CONSTANTS.TIMEZONE),
                      'do MMMM yyyy, HH:mm'
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionTable;
