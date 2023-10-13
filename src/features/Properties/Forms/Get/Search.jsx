import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Search({ search, onSearchChange, handleSearch }) {
  return (
    <div className='controls__search relative mb-5 overflow-hidden flex basis-full md:flex-grow md:mr-5 md:basis-auto md:mb-0'>
      <input
        type='search'
        className='
        controls__search__input    
        py-2
        px-3
        outline-none
        block
        flex-grow
      '
        value={search}
        onChange={onSearchChange}
        onReset={e => console.log(e)}
      />

      <div
        className='
          controls__search__icon 
          flex
          flex-col 
          justify-center 
          bg-green-400/95
          grow-0 
        '
      >
        <button
          className='controls__search__icon-btn px-4 p-y2'
          onClick={handleSearch}
        >
          <SearchIcon></SearchIcon>
        </button>
      </div>
    </div>
  );
}

export default Search;
