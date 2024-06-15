import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import { isAfter } from 'date-fns';

const SLICE_NAME = 'events';

const initialState = {
  events: [],
  overCount: 0,
  remindCount: 0,
};

const eventSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateCounters: (state) => {
      const counters = state.events.reduce(
        (acc, event) => {
          if (event.isOver) {
            acc.overCounter++;
          } else if (event.isRemind && !event.isOver) {
            acc.remindCounter++;
          }
          return acc;
        },
        { overCounter: 0, remindCounter: 0 }
      );
      state.overCount = counters.overCounter;
      state.remindCount = counters.remindCounter;
    },
    checkTime: (state, { payload }) => {
      state.overCount = 0;
      state.remindCount = 0;

      state.events.forEach((event) => {
        if (event?.endTime && event?.remiderTime) {
          event.isOver = isAfter(payload, event.endTime);
          event.isRemind = isAfter(payload, event.remiderTime);
        }
        if (event.isOver) state.overCount++;
        if (event.isRemind && !event.isOver) state.remindCount++;
      });
    },
    addEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    removeEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => {
        if (event.isOver) state.overCount--;
        if (event.isRemind && !event.isOver) state.remindCounter--;
        return event?.creationTime !== payload;
      });
    },
    getEvents: (state) => {
      const storedEvents = JSON.parse(
        window.localStorage.getItem(CONSTANTS.EVENTS_TOKEN)
      );
      if (storedEvents !== null) state.events = storedEvents;
    },
    saveEvents: (state) => {
      window.localStorage.setItem(
        CONSTANTS.EVENTS_TOKEN,
        JSON.stringify(state.events)
      );
    },
  },
});

const { actions, reducer: eventReducer } = eventSlice;

export const {
  clearEvents,
  addEvent,
  getEvents,
  saveEvents,
  checkTime,
  removeEvent,
  updateCounters,
} = actions;

export default eventReducer;
