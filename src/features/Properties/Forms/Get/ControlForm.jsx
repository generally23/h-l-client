import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { fetchProperties, selectProperties } from '../../propertiesSlice';
import { useDispatch, useSelector } from 'react-redux';
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
    // update page state
    setPage(value);
    // update search params
    searchParams.set('page', value);
    setSearchParams(searchParams);
    // manually submit form
    button.form.requestSubmit();
  };

  const onSearchChange = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    console.log('form submitted');

    dispatch(
      fetchProperties({
        url: `http://localhost:9090/api/v1/properties?${searchParams.toString()}`,
      })
    );

    console.log(searchParams.toString());
  };

  const handleSearch = e => {
    e.preventDefault();
    // makes sure we selected button not svg icons
    const button = e.target.closest('button');
    // stop if no button found or search term hasn't changed
    if (!button || search === searchParams.get('search')) return;
    // update search params only if search is not empty
    if (search) {
      // update search field
      searchParams.set('search', search);
      // override searchParams
      setSearchParams(searchParams);
      // manually submit form
      button.form.requestSubmit();
    }
  };

  const onSortChange = (e, value) => {
    const form = e.target.closest('form');

    // stop here if form is null || sortBy value hasn't changed
    if (!form || sortBy === value) return;

    // update sortBy
    setSortBy(value);

    // update search params
    searchParams.set('sortBy', value);

    setSearchParams(searchParams);

    // submit form
    form.requestSubmit();
  };

  const resetFilters = e => {
    // update Filter state
    setType('');
    setRooms('');
    setExternalBathrooms('');
    setInternalBathrooms('');
    setFenced(false);

    // update the url and avoid passing a filters object
    // order goes search, filter, sort, paginate
    setSearchParams({ search, sortBy, page });
    // submit the form
    e.target.form.requestSubmit();
  };

  const dispatch = useDispatch();

  const { properties, loading } = useSelector(selectProperties);

  const pages = properties?.pageCount;

  const [searchParams, setSearchParams] = useSearchParams();

  // Search
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // Filter
  const [type, setType] = useState(searchParams.get('type') || '');
  const [rooms, setRooms] = useState(searchParams.get('rooms') || '');
  const [externalBathrooms, setExternalBathrooms] = useState(
    searchParams.get('externalBathrooms') || ''
  );
  const [internalBathrooms, setInternalBathrooms] = useState(
    searchParams.get('internalBathrooms') || ''
  );

  // checkboxes
  let [fenced, setFenced] = useState(searchParams.get('fenced'));

  // Sort
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');

  // Paginate
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  return (
    <form className='controls mb-10' onSubmit={handleFormSubmit}>
      <div className='flex flex-wrap mb-5'>
        {/* Search */}
        <Search {...{ search, onSearchChange, handleSearch }} />
        {/* Filter */}
        <Filter
          {...{
            resetFilters,
            type,
            setType,
            rooms,
            setRooms,
            externalBathrooms,
            setExternalBathrooms,
            internalBathrooms,
            setInternalBathrooms,
          }}
        />
        {/* Sort */}
        <Sort
          {...{
            sortBy,
            onSortChange,
          }}
        />
      </div>
      {/* Paginate */}
      <Paginate {...{ page, pages, onPageChange }} />
    </form>
  );
}

export default ControlForm;
