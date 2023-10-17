import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, postData } from '../../utils/crud';
import { propertiesURL } from '../../constants';

const initialState = {
  loading: true,
  properties: null,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ queryString, headers }) =>
    fetchData({ url: `${propertiesURL}?${queryString}`, headers })
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProperties.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.isError) {
          // server responded with an error object
          state.error = payload;
        } else state.properties = payload;
      })
      .addCase(fetchProperties.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {} = propertySlice.actions;

export const selectProperties = state => state.properties;

export default propertySlice.reducer;
