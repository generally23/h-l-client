import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './Auth/accountsSlice';
import propertiesSlice from './Properties/propertiesSlice';
import propertySlice from './Properties/propertySlice';

const store = configureStore({
  reducer: {
    account: accountSlice,
    properties: propertiesSlice,
    property: propertySlice,
  },
});

export default store;
