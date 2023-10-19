import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Test() {
  // Define the minimum and maximum values for the slider
  const minPrice = 10_000_000; // 10 million
  const maxPrice = 10_000_000_000; // 10 billion

  // Initial state for the slider value
  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

  // Define the valueText function to display tooltip values
  const valueText = value => {
    console.log('value: ', value);
    const length = value.toString().length;
    if (length === 8 || length === 9) return `${value / 1_000_000}m`;
    else if (length === 10 || length === 11)
      return `${Math.round(value / 1_000_000_000)}mds`;
  };

  // Handle the slider value change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    console.log(newValue);
  };

  return (
    <div>
      <Typography id='price-range-slider' gutterBottom>
        Price Range
      </Typography>
      <div className='p-10'>
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay='auto'
          valueLabelFormat={valueText}
          min={minPrice}
          max={maxPrice}
          step={5_000_000} // You can adjust the step value as needed
        />
      </div>
    </div>
  );
}
