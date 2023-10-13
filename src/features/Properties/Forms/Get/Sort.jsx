import React from 'react';
import { Select, Option } from '@mui/base';
import { Sort } from '@mui/icons-material';

function Sorting({ sortBy, onSortChange }) {
  const options = [
    { content: 'Default', value: '' },
    { content: 'Titre (A-Z)', value: 'title' },
    { content: 'Titre (Z-A)', value: '-title' },
    { content: 'Prix (Plus Chère)', value: '-price' },
    { content: 'Prix (Moins Chère)', value: 'price' },
    { content: 'Chambres (100 - 0)', value: 'rooms' },
    { content: 'Chambres (0 - 100)', value: '-rooms' },
    { content: 'Quartier (A-Z)', value: 'address' },
    { content: 'Quartier (Z-A)', value: '-address' },
    { content: 'Superficie (100 - 0)', value: 'area' },
    { content: 'Superficie (0 - 100)', value: '-area' },
    { content: 'Date (Nouveau)', value: '-createdAt' },
    { content: 'Date (Ancien)', value: 'createdAt' },
  ];

  return (
    <div className='controls__sort'>
      <Select
        name='sortBy'
        value={sortBy}
        slotProps={{
          root: {
            className: 'border-2 py-1 px-2 border-black h-full rounded-md',
          },
          popper: {
            disablePortal: true,
            className:
              'z-50 cursor-pointer bg-neutral-100 w-60 rounded-md shadow-2xl',
          },
          listbox: {},
        }}
        onChange={onSortChange}
      >
        {options.map(({ content, value }) => (
          <Option
            key={value}
            slotProps={{
              root: {
                className: `px-5 py-2 hover:bg-neutral-200 ${
                  sortBy === value ? 'bg-neutral-300' : ''
                }`,
              },
            }}
            label={content}
            value={value}
          >
            {content}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default Sorting;
