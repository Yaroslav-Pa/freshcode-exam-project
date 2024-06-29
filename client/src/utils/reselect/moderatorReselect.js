import { createSelector } from 'reselect';

const selectModeratedOffersStore = (state) => state.moderatedOffersStore;
const selectContestByIdStore = (state) => state.contestByIdStore;

export const selectModeratedOffers = createSelector(
  [selectModeratedOffersStore],
  (moderatedOffersStore) => ({
    isFetching: moderatedOffersStore.isFetching,
    error: moderatedOffersStore.error,
    offers: moderatedOffersStore.offers,
    haveMore: moderatedOffersStore.haveMore,
  })
);

export const selectContestById = createSelector(
  [selectContestByIdStore],
  (contestByIdStore) => ({
    isShowOnFull: contestByIdStore.isShowOnFull,
    imagePath: contestByIdStore.imagePath,
  })
);