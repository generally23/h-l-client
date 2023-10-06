import React, { useState } from 'react';
import RangeSlider from '../../../../customComponents/Range.jsx';
import { Close, FilterAlt } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

function Filter({ resetFilters }) {
  const toggleFilter = e => {
    setOpen(!open);
  };

  const onTypeChange = e => {
    const button = e.target;
    const { value } = button;

    type = value;

    searchParams.set('type', type);

    setSearchParams(searchParams);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  // Filter
  let type = searchParams.get('type') || '';

  let rooms = parseInt(searchParams.get('rooms')) || null;

  let fenced = searchParams.get('fenced');

  console.log('Current type: ', type);

  return (
    <div className='filter relative mr-5'>
      {/* Filter Open Btn */}
      <button
        className='filter__toggler-btn py-1 px-3 border-2 border-black h-full'
        type='button'
        onClick={toggleFilter}
      >
        <span className='mr-1'>
          <FilterAlt fontSize='small'></FilterAlt>
        </span>
        Filter
      </button>

      {/* Filters Container */}
      <div
        className={`filter__container bg-red-400 ${
          open ? 'filter__container--open' : ''
        }`}
      >
        {/* Filters Close Btn */}
        <button
          type='button'
          className='absolute p-5 right-0 top-0'
          onClick={toggleFilter}
        >
          <Close />
        </button>

        {/* Type */}
        <div className='filter__type border-black border-2'>
          <div className='filter__name text-xl'>Type</div>
          <div className='filter__value p-2'>
            <button
              name='type'
              className='mr-2 p-2 px-3 bg-white'
              type='button'
              value='house'
              onClick={onTypeChange}
            >
              House
            </button>
            <button
              type='button'
              className='p-2 px-3 bg-white'
              name='type'
              value='land'
              onClick={onTypeChange}
            >
              Land
            </button>
          </div>
        </div>
        {/* <RangeSlider></RangeSlider> */}

        <button type='button' onClick={resetFilters}>
          reset
        </button>
      </div>
    </div>
  );
}

export default Filter;
