import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';
import { removeDuplicates } from '../../utils/contestFunctions';

const MODERATED_OFFERS_SLICE_NAME = 'moderatedOffers';

const initialState = {
  isFetching: false,
  offers: [],
  error: null,
  haveMore: true,
};

export const getOffers = decorateAsyncThunk({
  key: `${MODERATED_OFFERS_SLICE_NAME}/getOffers`,
  thunk: async (offset) => {
    const nowOffset = offset || 0;
    const { data } = await restController.getOffersOnReview({
      limit: 8 - nowOffset,
      offset: nowOffset,
    });
    return data;
  },
});

export const setStatus = decorateAsyncThunk({
  key: `${MODERATED_OFFERS_SLICE_NAME}/setStatus`,
  thunk: async (props) => {
    const { data } = await restController.setReviewStatus(props);
    return data;
  },
});

const extraReducers = (builder) => {
  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers = removeDuplicates(state.offers, payload.offers);
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getOffers.rejected, (state, { payload }) => {
    state.error = payload;
    state.offers = [];
  });

  builder.addCase(setStatus.pending, (state) => {
    state.error = null;
  });
  builder.addCase(setStatus.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers = state.offers.filter((offer) => {
      if (offer.id === payload.id) {
        offer.updatedStatus = payload.status;
      }
      return offer;
    });
  });
  builder.addCase(setStatus.rejected, (state, { payload }) => {
    state.error = payload;
    state.offers = [];
  });
};

const reducers = {
  removeOffer: (state, { payload }) => {
    state.offers = state.offers.filter((offer) => offer.id !== payload);
  },
  clearOffers: (state) => {
    state.offers = [];
  },
};

const moderatedOffersSlice = createSlice({
  name: MODERATED_OFFERS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = moderatedOffersSlice;

export const { removeOffer, clearOffers } = actions;

export default reducer;
