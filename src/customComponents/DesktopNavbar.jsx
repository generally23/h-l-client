import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function DesktopNavbar() {
  const [value, setValue] = useState(0);
  const handleChange = (e, value) => setValue(value);

  return (
    <div className='navigation__desktop'>
      <nav className='navigation__desktop__navbar flex justify-end px-10'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          aria-label='scrollable prevent tabs example'
        >
          {/* Home */}
          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/'>Home</Link>
              </div>
            }
          />

          {/* Create */}
          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/create'>Create</Link>
              </div>
            }
          />

          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/'>About</Link>
              </div>
            }
          />
          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/my-account'>My Account</Link>
              </div>
            }
          />
          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/'>Logout</Link>
              </div>
            }
          />
          <Tab
            label={
              <div className='navigation__desktop__navbar__links__item'>
                <Link to='/'>Help</Link>
              </div>
            }
          />
        </Tabs>
        {/* <ul className='navigation__desktop__navbar__links'></ul> */}
        <div className='navigation__desktop__navbar__user'>
          <figure className='navigation__desktop__navbar__user__avatar'>
            <Link
              to='/my-account'
              className='navigation__desktop__navbar__user__avatar__link'
            >
              <img
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                alt='Avatar'
                className='navigation__desktop__navbar__user__avatar__img w-16 h-16 rounded-full'
              />
            </Link>
          </figure>
        </div>
      </nav>
    </div>
  );
}

export default DesktopNavbar;
