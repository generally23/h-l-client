import React, { useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

function Header() {
  const { account } = useSelector(state => state.authentication);

  // >= 600
  const isLargeDevice = useMediaQuery('(min-width: 600px)');

  console.log('Is Large device: ', isLargeDevice);

  console.log(account);

  return (
    <header className='header h-16 bg-red-400 flex overflow-hidden'>
      <div className='logo w-28'></div>
      <div className='navigation grow relative'>
        {/* Mobile */}
        {/* Desktop */}
        {isLargeDevice ? <DesktopNavbar /> : <MobileNavbar account={account} />}
      </div>
    </header>
  );
}

export default Header;
