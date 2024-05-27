import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk, rejectedReducer } from '../../utils/store';

const USER_PROFILE_SLICE_NAME = 'userProfile';

const initialState = {
  profileViewMode: CONSTANTS.USER_INFO_MODE,
  isEdit: false,
  isFetching: false,
  transactionHistory: null,
  error: null,
};

export const getTransactionHistory = decorateAsyncThunk({
  key: `${USER_PROFILE_SLICE_NAME}/getTransactionHistory`,
  thunk: async () => {
    return await restController.getTransactionHistory();
  },
});

const extraReducers = (builder) => {
  builder.addCase(getTransactionHistory.pending, (state) => {
    state.isFetching = true;
    state.transactionHistory = null;
    state.error = null;
  });
  builder.addCase(getTransactionHistory.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.transactionHistory = payload?.data;
  });
  builder.addCase(getTransactionHistory.rejected, rejectedReducer);
};

const reducers = {
  changeProfileViewMode: (state, { payload }) => {
    state.profileViewMode = payload;
  },
  changeEditModeOnUserProfile: (state, { payload }) => {
    state.isEdit = payload;
  },
};

const userProfileSlice = createSlice({
  name: USER_PROFILE_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userProfileSlice;

export const { changeProfileViewMode, changeEditModeOnUserProfile } = actions;

export default reducer;
