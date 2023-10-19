import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

export default function RangeSlider({
  children,
  minValue,
  maxValue,
  ...options
}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState([minValue, maxValue]);

  const background = { background: 'rgba(132, 6, 90, 0.953)' };

  return (
    <>
      {children}

      <Slider
        value={value}
        onChange={handleChange}
        color='secondary'
        valueLabelDisplay='auto'
        size='medium'
        min={minValue}
        max={maxValue}
        slotProps={{
          track: { style: background },
          thumb: { style: background },
        }}
        // disableSwap
        // use this to format label into something like $currency
        {...options}
      />
    </>
  );
}
