import React, { useEffect, useState } from 'react';
import RangeSlider from '../../../../customComponents/Range.jsx';
import { Close, FilterAlt } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { InputAdornment, Slider, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, updateFilters } from '../../../Filters/index.js';
import { inputNames } from '../../../../constants.js';

const FilterButtons = ({ sourceObject, state, onSingleValueChange }) => {
  const { commonName, buttons } = sourceObject;

  return buttons.map(({ name, value, content, deleteParam }) => (
    <button
      key={value}
      type='button'
      className={`filter__btn capitalize ${
        state === value ? 'filter__btn--active' : ''
      }`}
      name={name ? name : commonName}
      value={value}
      // delete-param used to help maintain a single value for the rooms input
      data-delete-param={deleteParam || sourceObject.deleteParam}
      onClick={onSingleValueChange(state)}
    >
      {content || value}
    </button>
  ));
};

const FilterType = ({ onSingleValueChange }) => {
  const sourceObject = {
    commonName: inputNames.type,
    buttons: [
      { value: 'house', content: 'Maison' },
      { value: 'land', content: 'Terrain' },
    ],
  };

  const { type } = useSelector(selectFilters);

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Type</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <FilterButtons
          {...{ sourceObject, state: type, onSingleValueChange }}
        />
      </div>
    </li>
  );
};

const FilterPrice = () => {
  const {} = useSelector(selectFilters);
  const minPrice = 10_000_000; // 10 million
  const maxPrice = 10_000_000_000; // 10 billion
  const step = 5_000_000; // Step by 5 million

  const valueLabelFormat = value => {
    const priceLength = value.toString().length;
    // values < 10 numbers are million
    if (priceLength < 10) return value / 1_000_000 + 'M';
    // values > 10 numbers are billion
    return (value / 1_000_000_000).toFixed(1) + 'Mds';
  };

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Prix</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <div className='filter__value__textfields flex justify-between'>
          {/* Min Price */}

          {/* Max Price */}
        </div>
        {/* Slider */}
        <div className='slider px-3'>
          <RangeSlider
            minValue={minPrice}
            maxValue={maxPrice}
            {...{ valueLabelFormat, step }}
          />
        </div>
      </div>
    </li>
  );
};

const FilterRoom = ({ onSingleValueChange }) => {
  const { rooms, [inputNames.minRooms]: minRooms } = useSelector(selectFilters);

  // deleteParam used to help maintain a single value for the rooms input
  const sourceObject = {
    // used to avoid repeating rooms name for every button
    commonName: 'rooms',
    deleteParam: 'rooms[gte]',
    buttons: [
      { value: '1' },
      { value: '2' },
      { value: '3' },
      { value: '4' },
      { name: 'rooms[gte]', value: '5', content: '5+', deleteParam: 'rooms' },
    ],
  };

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Chambres</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <FilterButtons
          {...{
            sourceObject,
            state: rooms || minRooms,
            onSingleValueChange,
          }}
        />
      </div>
    </li>
  );
};

const FilterBathroom = ({ onSingleValueChange }) => {
  const filters = useSelector(selectFilters);
  const { externalBathrooms, internalBathrooms } = filters;

  // these are input names
  const { minExternalBathrooms, minInternalBathrooms } = inputNames;

  const minExtBath = filters[minExternalBathrooms];
  const minIntBath = filters[minInternalBathrooms];

  console.log('minExtBathroom: ', minExtBath);

  const externalBathButtons = {
    commonName: inputNames.externalBathrooms,
    deleteParam: minExternalBathrooms,
    buttons: [
      { value: '1' },
      { value: '2' },
      {
        name: minExternalBathrooms,
        value: '3',
        content: '3+',
        deleteParam: inputNames.externalBathrooms,
      },
    ],
  };

  const internalBathButtons = {
    commonName: inputNames.internalBathrooms,
    deleteParam: minInternalBathrooms,
    buttons: [
      { value: '1' },
      { value: '2' },
      {
        name: minInternalBathrooms,
        value: '3',
        content: '3+',
        deleteParam: inputNames.internalBathrooms,
      },
    ],
  };

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Douches</div>

      {/* Filter Values */}
      <ul className='filter__list--nest'>
        {/* Internal Bathrooms */}
        <li className='filter__list__item filter__list__item--nest'>
          {/* Filter Name */}
          <div className='filter__name filter__name--secondary'>
            Douches Externes
          </div>

          {/* Filter Values */}
          <div className='filter__value'>
            <FilterButtons
              {...{
                sourceObject: externalBathButtons,
                state: externalBathrooms || minExtBath,
                onSingleValueChange,
              }}
            />
          </div>
        </li>

        <li className='filter__list__item filter__list__item--nest'>
          <div className='filter__name filter__name--secondary'>
            Douches Internes
          </div>

          {/* Filter Values */}
          <div className='filter__value'>
            <FilterButtons
              {...{
                sourceObject: internalBathButtons,
                state: internalBathrooms || minIntBath,
                onSingleValueChange,
              }}
            />
          </div>
        </li>
      </ul>
    </li>
  );
};

const FilterArea = () => {
  const valueLabelFormat = value => {
    const length = value.toString().length;
    // values < 5 are metre square
    if (length < 5) return `${value}m²`;
    // values > 5 are in hectares
    return `${value / 10_000}hect`;
  };

  const {} = useSelector(state => state.filters);

  const minArea = 250;
  const maxArea = 10_000;
  const step = 50;

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Superficie</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <div className='filter__value__textfields flex justify-between'>
          {/* Min Area */}

          {/* Max Area */}
        </div>

        {/* Slider */}
        <div className='slider px-5'>
          <RangeSlider
            minValue={minArea}
            maxValue={maxArea}
            {...{ valueLabelFormat, step }}
          />
        </div>
      </div>
    </li>
  );
};

const FilterYearBuilt = () => {
  const minYear = 1900;
  const maxYear = new Date().getFullYear();

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Année Construit</div>

      {/* Filter Values */}
      <div className='filter__value'>
        {/* Slider */}
        <div className='slider px-5'>
          <RangeSlider minValue={minYear} maxValue={maxYear} />
        </div>
      </div>
    </li>
  );
};

const FilterExtraAttributes = ({ onCheck }) => {
  const {
    fenced,
    hasGarage,
    hasCuisine,
    hasLivingRoom,
    hasDiningRoom,
    hasPool,
  } = useSelector(state => state.filters);

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Autres Attributs</div>

      {/* Filter Values */}
      <div className='filter__value flex'>
        {/* Salon */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            hasLivingRoom ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.hasLivingRoom}
          value={hasLivingRoom}
          onClick={onCheck(hasLivingRoom)}
        >
          Salon
        </button>

        {/* Garage */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            hasGarage ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.hasGarage}
          value={hasGarage}
          onClick={onCheck(hasGarage)}
        >
          Garage
        </button>

        {/* Dining */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            hasDiningRoom ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.hasDiningRoom}
          value={hasDiningRoom}
          onClick={onCheck(hasDiningRoom)}
        >
          Sale à manger
        </button>

        {/* Kitchen */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            hasCuisine ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.hasCuisine}
          value={hasCuisine}
          onClick={onCheck(hasCuisine)}
        >
          Cuisine
        </button>

        {/* Fenced */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            fenced ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.fenced}
          value={fenced}
          onClick={onCheck(fenced)}
        >
          Cloture
        </button>

        {/* Pool */}
        <button
          type='button'
          className={`filter__btn capitalize ${
            hasPool ? 'filter__btn--checked' : ''
          }`}
          name={inputNames.hasPool}
          value={hasPool}
          onClick={onCheck(hasPool)}
        >
          Piscine
        </button>
      </div>
    </li>
  );
};

const CtaButtons = ({ resetFilters, onSearch }) => {
  return (
    <div className='filter__cta-btns flex items-center'>
      <button
        className='bg-blue-500 tracking-wide text-white py-2 px-4 mr-5 rounded-3xl grow'
        type='button'
        onClick={resetFilters}
      >
        Réinitialiser
      </button>

      <button
        className='bg-green-500 tracking-wide text-white py-2 px-4 rounded-3xl grow'
        type='button'
        onClick={onSearch}
      >
        Recherchez
      </button>
    </div>
  );
};

function Filter({ resetFilters }) {
  const toggleFilter = e => {
    toggleBodyOverflow();
    setOpen(!open);
  };

  const onSingleValueChange = state => e => {
    // get button
    const button = e.target;
    // get name and value from button
    const { name, value } = button;
    // buttons that use different values for state has this variable to help delete the other variable
    // ex rooms & rooms[gte] are maintained by 2 state vars since only 1 value is allowed, they need to be in sync
    const { deleteParam } = button.dataset;

    // if value hasn't changed empty it to reset the filter and stop here
    if (state === value) {
      // delete the filter name form searchParams
      searchParams.delete(name);
      // update searchParams
      setSearchParams(searchParams);
      // dispatch action to store
      return dispatch(updateFilters({ [name]: '' }));
    }

    // if there's a parameter to delete remove it
    if (deleteParam) {
      // remove from store
      dispatch(updateFilters({ [deleteParam]: null }));
      // remove param from searchParams
      searchParams.delete(deleteParam);
    }
    // update state to reflect change
    dispatch(updateFilters({ [name]: value }));

    searchParams.set(name, value);

    // update url params
    setSearchParams(searchParams);
  };

  const onCheck = state => e => {
    // get button
    const button = e.target;

    // get name from button
    const { name } = button;

    // if button is checked (on) set it off
    if (state) {
      searchParams.delete(name);
      setSearchParams(searchParams);
      return dispatch(updateFilters({ [name]: !state }));
    }

    // update state to reflect change
    dispatch(updateFilters({ [name]: !state }));

    searchParams.set(name, !state);

    // update url params
    setSearchParams(searchParams);
  };

  const onSearch = e => {
    const button = e.target.closest('button');

    setOpen(!open);
    toggleBodyOverflow();

    button.form.requestSubmit();
  };

  const toggleBodyOverflow = () => {
    // open is last state so !open is now the new state
    document.body.style.overflow = !open ? 'hidden' : '';
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className='filter relative mr-5'>
      {/* Filter Open Btn */}
      <button
        className='filter__opener py-1 px-3 border-2 border-black h-full rounded-md'
        type='button'
        onClick={toggleFilter}
      >
        <span className='mr-1'>
          <FilterAlt fontSize='small'></FilterAlt>
        </span>
        Filter
      </button>

      {/* Filters Overlay Occupy Full Width & Height & no Padding */}
      <div className={`filter__overlay ${open ? 'filter__overlay--open' : ''}`}>
        {/* Filters Container */}
        <div className='filter__container h-full md:h-5/6 md:w-3/4 md:rounded-xl'>
          {/* Filter Text and Close Button */}
          <div className='filter__banner'>
            <div className='filter__banner__label font-bold text-xl tracking-wider grow'>
              Filtres
            </div>

            {/* Filters Close Btn */}
            <button
              type='button'
              className='filter__closer p-2.5'
              onClick={toggleFilter}
            >
              <Close color='primary' />
            </button>
          </div>

          {/* Filters List */}
          <ul className='filter__list p-5'>
            {/* Type */}
            <FilterType
              {...{
                onSingleValueChange,
              }}
            />

            {/* Price */}
            <FilterPrice />

            {/* Rooms */}
            <FilterRoom
              {...{
                onSingleValueChange,
              }}
            />

            {/* Bathrooms */}
            <FilterBathroom
              {...{
                onSingleValueChange,
              }}
            />

            {/* Area */}
            <FilterArea />

            {/* Year Built */}
            <FilterYearBuilt />

            {/* Other Attributes */}

            <FilterExtraAttributes
              {...{
                onCheck,
              }}
            />
          </ul>

          {/* Cta btns */}
          <CtaButtons {...{ resetFilters, onSearch }} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
