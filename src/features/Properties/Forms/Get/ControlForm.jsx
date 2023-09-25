import React, { useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { selectProperties } from '../../propertiesSlice';
import { useSelector } from 'react-redux';
import Paginate from './Paginate';
import Sort from './Sort';
import Search from './Search';
import Filter from './Filter';

function ControlForm({ children }) {
  const onPageChange = (e, value) => {
    // makes sure we selected button not svg icons
    const button = e.target.closest('button');
    // if user clicks on the same page btn stop or no button found
    if (!button || page === value) return;
    // update search params
    setSearchParams({ page: value, search });
    // update page state
    setPage(value);
    // manually submit form
    button.form.requestSubmit();
  };

  const onSearchChange = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    console.log('form submitted');

    // console.log(e);
    // console.log(url);

    console.log(searchParams.toString());
  };

  const handleSearch = e => {
    e.preventDefault();
    // makes sure we selected button not svg icons
    const button = e.target.closest('button');
    // stop if no button found
    // stop hear if search term hasn't changed
    if (!button || search === searchParams.get('search')) return;
    // update search params
    setSearchParams({ search, page });
    // manually submit form
    button.form.requestSubmit();
  };

  const onSortChange = (e, value) => {
    const form = e?.target.closest('form');

    // stop here if form is null || sortBy value hasn't changed
    if (!form || sortBy === value) return;

    // update sortBy
    setSortBy(value);

    // update search params
    setSearchParams({ search, page, sortBy: value });

    // submit form
    form.requestSubmit();
  };

  const { properties, loading } = useSelector(selectProperties);

  const pages = properties?.pageCount;

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');

  return (
    <form className='controls mb-10' onSubmit={handleFormSubmit}>
      <div className='flex flex-wrap mb-5'>
        {/* Search */}
        <Search {...{ search, onSearchChange, handleSearch }} />
        {/* Filter */}
        <Filter />
        {/* Sort */}
        <Sort {...{ sortBy, onSortChange }} />
      </div>
      {/* Paginate */}
      <Paginate {...{ page, pages, onPageChange }} />
    </form>
  );
}

export default ControlForm;
