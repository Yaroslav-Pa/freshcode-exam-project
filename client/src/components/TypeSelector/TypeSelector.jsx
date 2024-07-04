import styles from './TypeSelector.module.sass';
const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const TypeSelector = ({ changePredicate, creatorFilter }) => {
  const array = [];
  types.forEach(
    (el, i) =>
      !i ||
      array.push(
        <option key={i - 1} value={el}>
          {el}
        </option>
      )
  );
  return (
    <select
      onChange={({ target }) =>
        changePredicate({
          name: 'typeIndex',
          value: types.indexOf(target.value),
        })
      }
      name={'typeIndex'}
      value={types[creatorFilter.typeIndex]}
      className={styles.input}
    >
      {array}
    </select>
  );
};

export default TypeSelector;
