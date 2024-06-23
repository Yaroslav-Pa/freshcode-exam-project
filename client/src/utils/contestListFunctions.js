import ContestBox from '../components/ContestBox/ContestBox';

export const getGoToExtended = (history) => {
  const goToExtended = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };
  return goToExtended;
};

export const contestList = (contests, goToExtended) => {
  const array = [];
  contests.forEach((contest) => {
    array.push(
      <ContestBox data={contest} key={contest.id} goToExtended={goToExtended} />
    );
  });
  return array;
};
