import { configureStore } from '@reduxjs/toolkit';
// slice for accounts
import accountSlice from './Auth/accountsSlice';
// slice for all properties
import propertiesSlice from './Properties/propertiesSlice';
// slice for a specific property
import propertySlice from './Properties/propertySlice';
// slice for properties owned by logged in account
import myPropertiesSlice from './Properties/myPropertiesSlice';
import authSlice from './Auth/appAuthSlice';

const store = configureStore({
  reducer: {
    account: accountSlice,
    authentication: authSlice,
    properties: propertiesSlice,
    property: propertySlice,
    myProperties: myPropertiesSlice,
  },
});

export default store;
