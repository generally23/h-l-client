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
          label='Title [A-Z]'
          value='title'
        >
          Title [A-Z]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Title [Z-A]'
          value='-title'
        >
          Title [Z-A]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Price [0-100]'
          value='price'
        >
          Price [0-100]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Price [100- 0]'
          value='-price'
        >
          Price [100- 0]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Quartier [A-Z]'
          value='city'
        >
          Quartier [A-Z]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Quartier [Z-A]'
          value='-city'
        >
          Quartier [Z-A]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Dimension [0-100]'
          value='dimension'
        >
          Dimension [0-100]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Dimension [100-0]'
          value='-dimension'
        >
          Dimension [100-0]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Date (Newest)'
          value='date'
        >
          Date (Newest)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-300' } }}
          label='Date (Oldest)'
          value='-date'
        >
          Date (Oldest)
        </Option>
      </Select>
    </div>
  );
}

export default Sorting;
