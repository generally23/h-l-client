import { createSlice } from '@reduxjs/toolkit';
import { toBoolean } from '../../utils/index';

// default state, filters or filter object is empty
const defaultState = {};

// create a search params instance, neccessary and easy because useSearchParams only works inside Components
const searchParams = new URLSearchParams(window.location.search);

// helper function to get parameters easily
const getParam = name => searchParams.get(name);

const initialState = {
  type: getParam('type'),
  rooms: getParam('rooms'),
  externalBathrooms: getParam('externalBathrooms'),
  internalBathrooms: getParam('internalBathrooms'),
  fenced: toBoolean(getParam('fenced')),
  hasGarage: toBoolean(getParam('hasGarage')),
  hasCuisine: toBoolean(getParam('hasCuisine')),
  hasLivingRoom: toBoolean(getParam('hasLivingRoom')),
  hasDiningRoom: toBoolean(getParam('hasDiningRoom')),
  hasPool: toBoolean(getParam('hasPool')),
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFiltersToDefault: () => defaultState,
    updateFilters: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { resetFiltersToDefault, updateFilters } = filterSlice.actions;
export default filterSlice.reducer;
