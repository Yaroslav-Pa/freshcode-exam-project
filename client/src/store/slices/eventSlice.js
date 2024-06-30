import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import { formatISO, isAfter } from 'date-fns';

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
    checkTime: (state, { payload = formatISO(new Date()) }) => {
      const time = formatISO(payload);
      state.overCount = 0;
      state.remindCount = 0;

      state.events.forEach((event) => {
        if (event?.endTime && event?.remiderTime) {
          event.isOver = isAfter(time, event.endTime);
          event.isRemind = isAfter(time, event.remiderTime);
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
        if (event?.creationTime === payload) {
          if (event.isOver) state.overCount--;
          if (event.isRemind && !event.isOver) state.remindCount--;
          return false;
        }
        return true;
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
