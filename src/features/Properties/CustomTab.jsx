import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import React from 'react';

export const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <ul className='panel p-5'>{children}</ul>}
    </div>
  );
};

export default function ColorTabs({ children }) {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='secondary tabs example'
      >
        <Tab value={1} label='Details' />
        <Tab value={2} label='Description' />
        <Tab value={3} label='Owner' />
      </Tabs>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          value,
        });
      })}
    </Box>
  );
}
