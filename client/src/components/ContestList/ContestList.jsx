import ContestBox from '../ContestBox/ContestBox';
import styles from './ContestList.module.sass';
const ContestList = ({ contests, goToExtended, isFetching }) => {
  if (!isFetching && contests.length === 0) {
    return <div className={styles.notFound}>Nothing found</div>;
  }
  return contests.map((contest) => (
    <ContestBox data={contest} key={contest.id} goToExtended={goToExtended} />
  ));
};

export default ContestList;
