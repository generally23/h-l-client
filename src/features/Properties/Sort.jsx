import React from 'react';
import { Select } from '@mui/base';
import { Option } from '@mui/base';
import SortIcon from '@mui/icons-material/Sort';

function Sort({ sortBy, onSortChange }) {
  return (
    <div className='controls__sort'>
      {/* <SortIcon /> */}
      <Select
        name='sortBy'
        value={sortBy}
        slotProps={{
          root: { className: 'border-2 py-1 px-2 border-black' },
          popper: {
            disablePortal: true,
            className: 'bg-black z-50 cursor-pointer bg-neutral-300 w-60',
          },
          listbox: {},
        }}
        onChange={onSortChange}
      >
        <Option
          slotProps={{
            root: { className: 'px-5 py-2 hover:bg-neutral-400' },
          }}
          label='Default'
          value=''
        >
          Default
        </Option>

        <Option
          slotProps={{
            root: { className: 'px-5 py-2 hover:bg-neutral-400' },
          }}
          label='Title [A-Z]'
          value='title'
        >
          Title [A-Z]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Title [Z-A]'
          value='-title'
        >
          Title [Z-A]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Price [0-100]'
          value='price'
        >
          Price [0-100]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Price [100- 0]'
          value='-price'
        >
          Price [100- 0]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Quartier [A-Z]'
          value='city'
        >
          Quartier [A-Z]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Quartier [Z-A]'
          value='-city'
        >
          Quartier [Z-A]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Dimension [0-100]'
          value='dimension'
        >
          Dimension [0-100]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Dimension [100-0]'
          value='-dimension'
        >
          Dimension [100-0]
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Date (Newest)'
          value='date'
        >
          Date (Newest)
        </Option>
        <Option
          slotProps={{ root: { className: 'px-5 py-2 hover:bg-neutral-400' } }}
          label='Date (Oldest)'
          value='-date'
        >
          Date (Oldest)
        </Option>
      </Select>
    </div>
  );
}

export default Sort;
