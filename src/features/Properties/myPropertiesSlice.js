import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/crud';

const baseURL = 'http://localhost:9090/api/v1/properties';

const initialState = {
  loading: false,
  properties: [],
  error: null,
};

export const fetchMyProperties = createAsyncThunk(
  'myProperties/fetchProperties',
  fetchData(`${baseURL}/my-properties`, { cors: true, withCredentials: true })
);

const myPropertiesSlice = createSlice({
  name: 'myProperties',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyProperties.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMyProperties.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.isError) {
          // server responded with an error object
          state.error = payload;
        } else state.properties = payload;
      })
      .addCase(fetchMyProperties.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectMyProperties = state => state.myProperties;

export const {} = myPropertiesSlice.actions;

export default myPropertiesSlice.reducer;
