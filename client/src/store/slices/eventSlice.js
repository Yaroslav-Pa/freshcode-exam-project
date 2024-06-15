import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import { isAfter } from 'date-fns';

const SLICE_NAME = 'events';

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    checkTime: (state, { payload }) => {
      state.events.forEach((event) => {
        if (event?.endTime && event?.remiderTime) {
          event.isOver = isAfter(payload, event.endTime);
          event.isRemind = isAfter(payload, event.remiderTime);
        }
      });
    },
    addEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    removeEvent: (state, { payload }) => {
      state.events = state.events.filter(
        (event) => event?.creationTime !== payload
      );
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
} = actions;

export default eventReducer;
