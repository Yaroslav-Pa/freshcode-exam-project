import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';

const SLICE_NAME = 'events';

const initialState = {
  events: [
    // { name: 'Create contest', time: new Date(), remiderTime: new Date() },
  ],
};

const eventSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearEvents: () => initialState,
    addEvent: (state, { payload }) => {
      state.events.push(payload);
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

export const { clearEvents, addEvent, getEvents, saveEvents } = actions;

export default eventReducer;
