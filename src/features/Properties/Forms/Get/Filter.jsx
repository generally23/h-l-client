import React, { useEffect, useState } from 'react';
import RangeSlider from '../../../../customComponents/Range.jsx';
import { Close, FilterAlt } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const FilterButtons = ({ buttons, state, setState, onSingleValueChange }) => {
  return buttons.map(({ name, value, content }) => (
    <button
      key={value}
      type='button'
      className={`filter__btn capitalize ${
        state === value ? 'filter__btn--active' : ''
      }`}
      name={name}
      value={value}
      onClick={onSingleValueChange(state, setState)}
    >
      {content || value}
    </button>
  ));
};

const FilterType = ({ onSingleValueChange, type, setType }) => {
  const buttons = [
    { name: 'type', value: 'house', content: 'Maison' },
    { name: 'type', value: 'land', content: 'Terrain' },
  ];

  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Type</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <FilterButtons
          {...{ buttons, state: type, setState: setType, onSingleValueChange }}
        />
      </div>
    </li>
  );
};

const FilterPrice = () => {
  return (
    <li className='filter__list__item'>
      {/* Filter Name */}
      <div className='filter__name'>Chambres</div>

      {/* Filter Values */}
      <div className='filter__value'>
        <button name='type' className='' type='button' value='house'>
          1
        </button>

        <button type='button' className='' name='type' value='land'>
          2
        </button>
        <button type='button' className='' name='type' value='land'>
          3
        </button>

        <button type='button' className='' name='type' value='land'>
          4
        </button>

        <button type='button' className='' name='type' value='land'>
          5+
        </button>
      </div>
    </li>
  );
};

const FilterRoom = ({ onSingleValueChange, rooms, setRooms }) => {
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
            setState: setRooms,
            onSingleValueChange,
          }}
        />
      </div>
    </li>
  );
};

const FilterBathroom = ({
  externalBathrooms,
  internalBathrooms,
  setExternalBathrooms,
  setInternalBathrooms,
  onSingleValueChange,
}) => {
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
                buttons: internalBathButtons,
                state: externalBathrooms,
                setState: setExternalBathrooms,
                onSingleValueChange,
              }}
            />
          </div>
        </li>

        <li className='filter__list__nest__item'>
          <div className='filter__name filter__name--secondary'>
            Douches Internes
          </div>

          {/* Filter Values */}
          <div className='filter__value'>
            <FilterButtons
              {...{
                buttons: externalBathButtons,
                state: internalBathrooms,
                setState: setInternalBathrooms,
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
  return <div className='filter'></div>;
};

const FilterYearBuilt = () => {
  return <div className='filter'></div>;
};

const FilterExtraAttributes = () => {
  return <div className='filter'></div>;
};

function Filter({
  resetFilters,
  type,
  setType,
  rooms,
  setRooms,
  externalBathrooms,
  setExternalBathrooms,
  internalBathrooms,
  setInternalBathrooms,
}) {
  const toggleFilter = e => {
    setOpen(!open);

    // open is last state so !open is now the new state
    document.body.style.overflow = !open ? 'hidden' : '';
  };

  const onSingleValueChange = (state, setter) => e => {
    // get button
    const button = e.target;
    // get name and value from button
    const { name, value } = button;

    // if value hasn't changed empty it to reset the filter and stop here
    if (state === value) return setter('');

    // update state to reflect change
    setter(value);

    // set params to reflect change
    console.log('Name: ', name);
    searchParams.set(name, value);

    // update url params
    setSearchParams(searchParams);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  console.log('Current type: ', type);

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
        <div className='filter__container'>
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
                type,
                setType,
                onSingleValueChange,
              }}
            />
            {/* Rooms */}
            <FilterRoom
              {...{
                rooms,
                setRooms,
                onSingleValueChange,
              }}
            />

            {/* Bathrooms */}
            <FilterBathroom
              {...{
                externalBathrooms,
                setExternalBathrooms,
                internalBathrooms,
                setInternalBathrooms,
                onSingleValueChange,
              }}
            />

            {/* Bathrooms */}
            <FilterBathroom
              {...{
                externalBathrooms,
                setExternalBathrooms,
                internalBathrooms,
                setInternalBathrooms,
                onSingleValueChange,
              }}
            />

            {/* <RangeSlider></RangeSlider> */}
          </ul>

          {/* Cta btns */}
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
        </div>
      </div>
    </div>
  );
}

export default Filter;
