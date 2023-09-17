import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Search({ search, onSearchChange, handleSearch }) {
  return (
    <div className='controls__search relative mb-5 overflow-hidden flex'>
      <input
        type='search'
        className='
        controls__search__input    
        py-1.5
        px-2
        outline-none
        block
        flex-grow
      '
        value={search}
        onChange={onSearchChange}
      />

      <div
        className='
          controls__search__icon 
          flex
          flex-col 
          justify-center 
          bg-green-400 
          grow-0 
        '
      >
        <button className='px-4 p-y2' onClick={handleSearch}>
          <SearchIcon></SearchIcon>
        </button>
      </div>
    </div>
  );
}

export default Search;
