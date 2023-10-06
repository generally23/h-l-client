import React from 'react';
import { Select, Option } from '@mui/base';
import { Sort } from '@mui/icons-material';

function Sorting({ sortBy, onSortChange }) {
  return (
    <div className='controls__sort'>
      <Select
        name='sortBy'
        value={sortBy}
        slotProps={{
          root: { className: 'border-2 py-1 px-2 border-black h-full' },
          popper: {
            disablePortal: true,
            className:
              'z-50  cursor-pointer bg-neutral-100 w-60 rounded-md top-5 shadow-2xl',
          },
          listbox: {},
        }}
        onChange={onSortChange}
      >
        <Option
          slotProps={{
            root: { className: 'px-5 py-2 hover:bg-neutral-300' },
          }}
          label='Default'
          value=''
        >
          Default
        </Option>

        <Option
          slotProps={{
            root: { className: 'px-5 py-2 hover:bg-neutral-300' },
          }}
          label='Titre (A-Z)'
          value='title'
        >
          Titre (A-Z)
        </Option>

        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Titre (Z-A)'
          value='-title'
        >
          Titre (Z-A)
        </Option>

        {/* sort: { price: 1 } means to sort from less than to greater than */}
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Prix (Plus Chère)'
          value='-price'
        >
          Prix (Plus Chère)
        </Option>

        {/* sort: { price: -1 } means to sort from greater than to less than*/}
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Prix (Moins Chère)'
          value='price'
        >
          Prix (Moins Chère)
        </Option>

        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          value='rooms'
          label='Chambres (0-100)'
        >
          Chambres (100 - 0)
        </Option>

        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          value='-rooms'
          label='Chambres (100-0)'
        >
          Chambres (0 - 100)
        </Option>

        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Quartier (A-Z)'
          value='address'
        >
          Quartier (A-Z)
        </Option>

        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Quartier (Z-A)'
          value='-address'
        >
          Quartier (Z-A)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Surface (100 - 0)'
          value='area'
        >
          Superficie (100 - 0)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Surface (0 - 100)'
          value='-area'
        >
          Superficie (0 - 100)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Date (Nouveau)'
          value='date'
        >
          Date (Nouveau)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Date (Ancient)'
          value='-date'
        >
          Date (Ancient)
        </Option>
      </Select>
    </div>
  );
}

export default Sorting;
