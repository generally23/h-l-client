import { configureStore } from '@reduxjs/toolkit';
// slice for all properties
import propertiesSlice from './Properties/propertiesSlice';
// slice for a specific property
import propertySlice from './Properties/propertySlice';
// slice for properties owned by logged in account
import myPropertiesSlice from './Properties/myPropertiesSlice';
// authentication slice
import authSlice from './Auth/appAuthSlice';
import filtersSlice from './Filters';

const store = configureStore({
  reducer: {
    authentication: authSlice,
    properties: propertiesSlice,
    property: propertySlice,
    myProperties: myPropertiesSlice,
    filters: filtersSlice,
  },
});

export default store;
