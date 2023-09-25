import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RangeSlider from '../../../../customComponents/Range.jsx';
function Filter() {
  const toggleFilter = e => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className='controls__filter relative mr-5'>
      <button
        className='controls__filter__toggler-btn py-1 px-3 border-2 border-black h-full'
        type='button'
        onClick={toggleFilter}
      >
        <FilterAltIcon></FilterAltIcon>
        Filter
      </button>
      <div
        className={`controls__filter__box bg-white ${
          open ? 'controls__filter__box--open' : ''
        }`}
      >
        <button onClick={toggleFilter}>X</button>
        <RangeSlider></RangeSlider>
      </div>
    </div>
  );
}

export default Filter;
