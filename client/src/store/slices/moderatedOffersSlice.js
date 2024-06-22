import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk } from '../../utils/store';

const MODERATED_OFFERS_SLICE_NAME = 'moderatedOffers';

const initialState = {
  isFetching: false,
  offers: [],
  error: null,
  hasMore: true,
};

export const getOffers = decorateAsyncThunk({
  key: `${MODERATED_OFFERS_SLICE_NAME}/getOffers`,
  thunk: async (offset) => {
    const { data } = await restController.getOffersOnReview({
      limit: null,
      offset: offset || 0,
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
  builder.addCase(getOffers.pending, (state) => {
    state.isFetching = true;
    state.error = null;
    state.offers = [];
  });
  builder.addCase(
    getOffers.fulfilled,
    (state, { payload: { offers, hasMore } }) => {
      state.isFetching = false;
      state.error = null;
      state.offers = [...state.offers, ...offers];
      state.hasMore = hasMore;
      console.log('getOffers');
      console.log(state.offers);
    }
  );
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
    console.log('removedId ' + payload);
    state.offers = state.offers.filter((offer) => offer.id !== payload);
  },
};

const moderatedOffersSlice = createSlice({
  name: MODERATED_OFFERS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = moderatedOffersSlice;

export const { removeOffer } = actions;

export default reducer;
