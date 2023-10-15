import React, { useEffect, useState } from 'react';
import RangeSlider from '../../../../customComponents/Range.jsx';
import { Close, FilterAlt } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { InputAdornment, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../../../Filters/index.js';

const FilterButtons = ({ buttons, state, onSingleValueChange }) => {
  return buttons.map(({ name, value, content }) => (
    <button
      key={value}
      type='button'
      className={`filter__btn capitalize ${
        state === value ? 'filter__btn--active' : ''
      }`}
      name={name}
      value={value}
      onClick={onSingleValueChange(state)}
    >
      {content || value}
    </button>
  ));
};

const FilterType = ({ onSingleValueChange }) => {
  const buttons = [
    { name: 'type', value: 'house', content: 'Maison' },
    { name: 'type', value: 'land', content: 'Terrain' },
  ];

  const { type } = useSelector(state => state.filters);

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Type</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <FilterButtons {...{ buttons, state: type, onSingleValueChange }} />
      </div>
    </li>
  );
};

const FilterPrice = () => {
  const {} = useSelector(state => state.filters);
  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Prix</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <div className='filter__value__textfields flex justify-between'>
          {/* Min Price */}
          <div className='mr-5'>
            <TextField
              size='small'
              name='price[lte]'
              value={5000}
              label='Minimum'
              // InputProps={{ inputProps: { min: 1 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <strong>FG</strong>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {/* Max Price */}
          <div className=''>
            <TextField
              size='small'
              name='price[gte]'
              value={10000}
              label='Maximum'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <strong>FG</strong>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        {/* Slider */}
        <div className='slider'>
          <RangeSlider />
        </div>
      </div>
    </li>
  );
};

const FilterRoom = ({ onSingleValueChange }) => {
  const { rooms } = useSelector(state => state.filters);
  const buttons = [
    { name: 'rooms', value: '1' },
    { name: 'rooms', value: '2' },
    { name: 'rooms', value: '3' },
    { name: 'rooms', value: '4' },
    { name: 'rooms[gte]', value: '5', content: '5+' },
  ];

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Chambres</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <FilterButtons
          {...{
            buttons,
            state: rooms,
            onSingleValueChange,
          }}
        />
      </div>
    </li>
  );
};

const FilterBathroom = ({ onSingleValueChange }) => {
  const { externalBathrooms, internalBathrooms } = useSelector(
    state => state.filters
  );

  const externalBathButtons = [
    { name: 'externalBathrooms', value: '1' },
    { name: 'externalBathrooms', value: '2' },
    { name: 'externalBathrooms', value: '3', content: '3+' },
  ];

  const internalBathButtons = [
    { name: 'internalBathrooms', value: '1' },
    { name: 'internalBathrooms', value: '2' },
    { name: 'internalBathrooms', value: '3', content: '3+' },
  ];

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
                buttons: externalBathButtons,
                state: externalBathrooms,
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
                buttons: internalBathButtons,
                state: internalBathrooms,
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
  const {} = useSelector(state => state.filters);

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Superficie</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <div className='filter__value__textfields flex justify-between'>
          {/* Min Area */}
          <div className='mr-5'>
            <TextField
              size='small'
              name='area[lte]'
              value={500}
              label='Minimum'
              // InputProps={{ inputProps: { min: 1 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <strong>
                      m<sup>2</sup>
                    </strong>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Max Area */}
          <div className=''>
            <TextField
              size='small'
              name='area[gte]'
              value={10000}
              label='Maximum'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <strong>
                      m<sup>2</sup>
                    </strong>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        {/* Slider */}
        <div className='slider'>
          <RangeSlider />
        </div>
      </div>
    </li>
  );
};

const FilterYearBuilt = () => {
  return <div className='filter'></div>;
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
          name='hasLivingRoom'
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
          name='hasGarage'
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
          name='hasDiningRoom'
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
          name='hasCuisine'
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
          name='fenced'
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
          name='hasPool'
          value={hasPool}
          onClick={onCheck(hasPool)}
        >
          Piscine
        </button>
      </div>
    </li>
  );
};

const CtaButtons = ({ resetFilters }) => {
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
        onClick={e => {}}
      >
        Recherchez
      </button>
    </div>
  );
};

function Filter({ resetFilters }) {
  const toggleFilter = e => {
    setOpen(!open);

    // open is last state so !open is now the new state
    document.body.style.overflow = !open ? 'hidden' : '';
  };

  const onSingleValueChange = state => e => {
    e.preventDefault();
    // get button
    const button = e.target;
    // get name and value from button
    const { name, value } = button;

    // if value hasn't changed empty it to reset the filter and stop here
    if (state === value) {
      searchParams.delete(name);
      setSearchParams(searchParams);
      return dispatch(updateFilters({ [name]: '' }));
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
        <div className='filter__container h-full md:h-5/6 md:w-2/4 md:rounded-lg'>
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

            {/* Other Attributes */}

            <FilterExtraAttributes
              {...{
                onCheck,
              }}
            />
          </ul>

          {/* Cta btns */}
          <CtaButtons {...{ resetFilters }} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
