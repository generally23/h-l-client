import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/crud';

const initialState = {
  loading: true,
  properties: null,
  error: null,
};

// const baseURL = 'http://192.168.1.196:9090/api/v1/properties';
const baseURL = 'http://localhost:9090/api/v1/properties';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  fetchData(baseURL)
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
