import { createSelector } from 'reselect';

const selectStores = (state) => ({
  eventStore: state.eventStore,
  userStore: state.userStore,
});

export const selectEvents = createSelector(
  [selectStores],
  ({ eventStore }) => eventStore.events
);

export const selectCountsAndRole = createSelector(
  [selectStores],
  ({ eventStore, userStore }) => ({
    overCount: eventStore.overCount,
    remindCount: eventStore.remindCount,
    role: userStore.data?.role,
  })
);
