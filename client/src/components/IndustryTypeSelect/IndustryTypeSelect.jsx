import styles from './IndustryTypeSelect.module.sass';

const IndustryTypeSelect = ({
  changePredicate,
  creatorFilter,
  dataForContest,
}) => {
  if (!dataForContest.data || !dataForContest.data.industry) {
    return <p>Error geting industry types</p>;
  }
  const { industry } = dataForContest.data;
  const array = [];
  array.push(
    <option key={0} value={''}>
      Choose industry
    </option>
  );
  industry.forEach((industry, i) =>
    array.push(
      <option key={i + 1} value={industry}>
        {industry}
      </option>
    )
  );
  return (
    <select
      onChange={({ target }) =>
        changePredicate({
          name: 'industry',
          value: target.value,
        })
      }
      name={'industry'}
      value={creatorFilter.industry}
      className={styles.input}
    >
      {array}
    </select>
  );
};

export default IndustryTypeSelect;
