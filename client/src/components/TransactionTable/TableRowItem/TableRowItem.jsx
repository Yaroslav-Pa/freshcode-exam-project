import style from './TableRowItem.module.sass';

function TableRowItem({ id, operationType, sum, createdAt }) {
  const textArray = [
    id,
    operationType.toLowerCase(),
    sum,
    new Date(createdAt).toUTCString(),
  ];
  return (
    <tr>
      {textArray.map((text) => (
        <td className={style.tableElement}>{text}</td>
      ))}
    </tr>
  );
}

export default TableRowItem;
