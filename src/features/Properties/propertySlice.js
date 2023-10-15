import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/crud';
import { propertiesURL } from '../../constants';

const initialState = {
  loading: false,
  property: null,
  error: null,
};

export const fetchProperty = createAsyncThunk(
  'property/fetchProperty',

  async propertyId => fetchData({ url: `${propertiesURL}/${propertyId}` })
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProperty.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProperty.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.isError) {
          // server responded with an error object
          state.error = payload;
        } else state.property = payload;
      })
      .addCase(fetchProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectProperty = state => state.property;

export const {} = propertySlice.actions;

export default propertySlice.reducer;
