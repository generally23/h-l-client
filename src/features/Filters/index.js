import { createSlice } from '@reduxjs/toolkit';
import { toBoolean } from '../../utils/index';
import { inputNames } from '../../constants';

// default state, filters or filter object is empty
const defaultState = {};

// create a search params instance, neccessary and easy because useSearchParams only works inside Components
const searchParams = new URLSearchParams(window.location.search);

// helper function to get parameters easily
const getParam = name => searchParams.get(name);

//
const not = (value1, value2) => {
  // if (!value1) value2;
};

const rooms = getParam(inputNames.rooms);
const externalBathrooms = getParam(inputNames.externalBathrooms);
const internalBathrooms = getParam(inputNames.internalBathrooms);

const initialState = {
  type: getParam(inputNames.type),
  rooms,
  [inputNames.minRooms]: !rooms ? getParam(inputNames.minRooms) : null,
  externalBathrooms,
  internalBathrooms,
  [inputNames.minExternalBathrooms]: !externalBathrooms
    ? getParam(inputNames.minExternalBathrooms)
    : null,
  [inputNames.minInternalBathrooms]: !internalBathrooms
    ? getParam(inputNames.minInternalBathrooms)
    : null,
  fenced: toBoolean(getParam(inputNames.fenced)),
  hasGarage: toBoolean(getParam(inputNames.hasGarage)),
  hasCuisine: toBoolean(getParam(inputNames.asCuisine)),
  hasLivingRoom: toBoolean(getParam(inputNames.hasLivingRoom)),
  hasDiningRoom: toBoolean(getParam(inputNames.hasDiningRoom)),
  hasPool: toBoolean(getParam(inputNames.hasPool)),
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

export const selectFilters = state => state.filters;

export default filterSlice.reducer;
