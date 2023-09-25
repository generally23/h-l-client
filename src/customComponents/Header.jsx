import React, { useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

function Header() {
  const { account } = useSelector(state => state.authentication);

  // >= 600
  const isLargeDevice = useMediaQuery('(min-width:600px)');

  console.log(isLargeDevice);

  console.log(account);

  return (
    <header className='header mb-10 h-16 bg-red-400 flex'>
      <div className='logo w-28'></div>
      <div className='navigation grow relative'>
        {/* Mobile */}
        {/* Desktop */}
        {!isLargeDevice ? (
          <MobileNavbar account={account} />
        ) : (
          <DesktopNavbar />
        )}
      </div>
    </header>
  );
}

export default Header;
