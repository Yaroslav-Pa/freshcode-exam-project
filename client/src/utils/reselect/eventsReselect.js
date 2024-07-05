import { createSelector } from 'reselect';

const selectEventStore = (state) => state.eventStore;

export const selectEvents = createSelector(
  [selectEventStore],
  (eventStore) => eventStore.events
);

export const selectCounts = createSelector(
  [selectEventStore],
  (eventStore) => ({
    overCount: eventStore.overCount,
    remindCount: eventStore.remindCount,
  })
);