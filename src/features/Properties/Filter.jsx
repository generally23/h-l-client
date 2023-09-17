import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RangeSlider from './Range.jsx';
function Filter() {
  const toggleFilter = e => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className='filter relative'>
      <button
        className='filter__toggler-btn py-1 px-3 border-2 border-black'
        type='button'
        onClick={toggleFilter}
      >
        <FilterAltIcon></FilterAltIcon>
        Filter
      </button>
      <div
        className={`filter__box bg-white ${open ? 'filter__box--open' : ''}`}
      >
        <button onClick={toggleFilter}>X</button>
        <RangeSlider></RangeSlider>
      </div>
    </div>
  );
}

export default Filter;
