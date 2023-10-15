import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchData, postData, updateData } from '../../utils/crud';

const baseURL = 'http://localhost:9090/api/v1/accounts';

export const pending = state => ({ ...initialState, loading: true });

export const fulfilled = (state, payload) => {
  if (payload.isError) return { ...initialState, error: payload };

  return { ...initialState, account: payload };
};

export const rejected = (state, payload) => ({
  ...initialState,
  error: payload,
});

const initialState = {
  loading: false,
  account: null,
  error: null,
};

export const authenticate = createAsyncThunk(
  'authentication/authenticate',
  async () => await fetchData({ url: `${baseURL}/my-account` })
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(authenticate.pending, pending)
      .addCase(authenticate.fulfilled, (state, { payload }) =>
        fulfilled(state, payload)
      )
      .addCase(authenticate.rejected, (state, { payload }) =>
        rejected(state, payload)
      );
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
