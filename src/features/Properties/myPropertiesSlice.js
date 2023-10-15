import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, postData, updateData } from '../../utils/crud';
import axios from 'axios';
import { propertiesURL } from '../../constants';

const initialState = {
  loading: false,
  properties: [],
  error: null,
};

const deletePropertyImages = async ({ id, names }) => {
  // { names: ['img1', etc...]}
  const deleteOptions = {
    withCredentials: true,
    url: `${propertiesURL}/${id}/images/delete`,
    cors: true,
    data: { names },
    method: 'POST',
  };

  try {
    return await axios(deleteOptions);
  } catch (error) {
    error = error.response
      ? { ...error.response.data, isError: true }
      : { message: error.message, isError: true };

    // return error object
    return error.response ? error.response.data : error;
  }
};

const removeProperty = async propertyId => {
  const options = { withCredentials: true, cors: true, method: 'DELETE' };

  try {
    // send request to delete property with this id
    await axios(`${propertiesURL}/${propertyId}`, options);
    // since server respond with an empty object return propertyId to use and delete it from store
    return propertyId;
  } catch (error) {
    // log error
    console.error(error);
    /*  if error came from server this promise is considered fullfilled
        but axios catches it to help us better handle errors
    */
    /*  if (error.response) {
          // mark this error as a know error to help identify our payload during fullfilled state
          error.response.data.isError = true;
        }
        // this is an error from the client mostly a network error (rare)
        else error = { message: error.message, isError: true };
    */
    // simplified version of code above
    error = error.response
      ? { ...error.response.data, isError: true }
      : { message: error.message, isError: true };

    // return error object
    return error.response ? error.response.data : error;
  }
};

export const fetchMyProperties = createAsyncThunk(
  'myProperties/fetchProperties',
  async () => fetchData({ url: `${propertiesURL}/my-properties` })
);

export const createProperty = createAsyncThunk(
  'myProperties/createProperty',
  async data => {
    postData({ url: `${propertiesURL}`, data });
  }
);

export const addPropertyImages = createAsyncThunk(
  'myProperties/addPropertyImage'
  // async () => postData({url: `${propertiesURL}/`})
);

export const updateMyProperty = createAsyncThunk(
  'myProperties/updateMyProperty',
  async data => updateData({ url: `${propertiesURL}/${data.id}`, data })
);

export const deleteMyProperty = createAsyncThunk(
  'myProperties/deleteMyProperty',
  removeProperty
);

export const deleteMyPropertyImages = createAsyncThunk(
  'myProperties/deleteMyPropertyImages',
  deletePropertyImages
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
      })
      .addCase(createProperty.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(createProperty.fulfilled, (state, { payload }) => {
        // payload is either error or propertyId to delete
        if (payload.isError) {
          // server responded with an error object
          return { ...state, error: payload };
        }
        // add property to collection
        state.properties.push(payload);
      })
      .addCase(createProperty.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
      }))

      .addCase(updateMyProperty.pending, state => {
        state.loading = true;
      })
      .addCase(updateMyProperty.fulfilled, (state, { payload }) => {
        // payload is either error or propertyId to delete

        if (payload.isError) {
          // server responded with an error object
          return { ...initialState, error: payload };
        }
        // update old property with new property from array
        // const properties = state.properties.filter(({ id }) => id !== payload);
        return { ...initialState };
      })
      .addCase(updateMyProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(deleteMyProperty.pending, state => {
        state.loading = true;
      })
      .addCase(deleteMyProperty.fulfilled, (state, { payload }) => {
        // payload is either error or propertyId to delete

        if (payload.isError) {
          // server responded with an error object
          return { ...initialState, error: payload };
        }
        // remove proerty from array
        const properties = state.properties.filter(({ id }) => id !== payload);
        return { ...initialState, properties };
      })
      .addCase(deleteMyProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(deleteMyPropertyImages.pending, state => {
        state.loading = true;
      })
      .addCase(deleteMyPropertyImages.fulfilled, (state, { payload }) => {
        // payload is either error or propertyId to delete

        if (payload.isError) {
          // server responded with an error object
          return { ...initialState, error: payload };
        }
        // remove proerty from array
        // const properties = state.properties.filter(({ id }) => id !== payload);
        return { ...initialState };
      })
      .addCase(deleteMyPropertyImages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(addPropertyImages.pending, state => {
        state.loading = true;
      })
      .addCase(addPropertyImages.fulfilled, (state, { payload }) => {
        // payload is either error or propertyId to delete

        if (payload.isError) {
          // server responded with an error object
          return { ...initialState, error: payload };
        }
        // remove proerty from array
        // const properties = state.properties.filter(({ id }) => id !== payload);
        return { ...initialState };
      })
      .addCase(addPropertyImages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectMyProperties = state => state.myProperties;

export const {} = myPropertiesSlice.actions;

export default myPropertiesSlice.reducer;
