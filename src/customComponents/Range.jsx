import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { formatMoney } from '../utils';

export default function RangeSlider() {
  const [value, setValue] = useState([1, 100]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const min = 10000000;
  const max = 1000000000;

  const minValue = value[0];
  const maxValue = value[1];

  return (
    <>
      <input
        type='text'
        id='min'
        value={formatMoney(Math.round((minValue / 100) * max))}
        onChange={e => console.log(e)}
      />
      <input
        type='text'
        id='max'
        value={formatMoney(Math.round((maxValue / 100) * max))}
        onChange={e => console.log(e)}
      />
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='off'
          size='medium'
        />
      </Box>
    </>
  );
}
