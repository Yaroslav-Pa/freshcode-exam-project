import ContestBox from '../components/ContestBox/ContestBox';

export const contestList = (contests, goToExtended) => {
  const array = [];
  for (let i = 0; i < contests.length; i++) {
    array.push(
      <ContestBox
        data={contests[i]}
        key={contests[i].id}
        goToExtended={goToExtended}
      />
    );
  }
  return array;
};
