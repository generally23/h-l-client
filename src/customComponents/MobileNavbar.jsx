import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Close } from '@mui/icons-material';

const NoAuthNavbar = () => {
  return (
    <ul className='navbar__links bg-slate-400 text-center capitalize py-5'>
      <li className='navbar__links__item'>
        <Link className='p-2 block' to='/'>
          Home
        </Link>
      </li>
      <li className='navbar__links__item'>
        <Link className='p-2 block' to='/signup'>
          Sign up
        </Link>
      </li>
      <li className='navbar__links__item'>
        <Link className='p-2 block' to='/signin'>
          Sign in
        </Link>
      </li>
      <li className='navbar__links__item'>
        <Link className='p-2 block' to='/about'>
          About
        </Link>
      </li>
      <li className='navbar__links__item'>
        <Link className='p-2 block' to='/help'>
          Ressources
        </Link>
      </li>
    </ul>
  );
};

const AuthNavbar = ({ account, onToggleMenu }) => {
  const { avatarUrls, firstname } = account;

  const avatarLink =
    avatarUrls[0] || 'http://localhost:9090/assets/images/avatar.avif';

  return (
    <>
      {/* User */}
      <div className='navbar__user my-10 p-5 shadow-2xl border-black border-t-4'>
        <figure className='navbar__user__avatar mb-2'>
          <img
            className='w-28 h-28 rounded-full m-auto'
            crossOrigin={(avatarLink && '') || 'cors'}
            src={avatarLink}
            srcSet=''
            alt='Avatar'
          />
        </figure>
        <div className='navbar__user__name text-xl font-medium text-center uppercase'>
          {firstname}
        </div>
      </div>

      {/* Links */}
      <ul className='navbar__links bg-slate-300 text-center capitalize py-5'>
        <li className='navbar__links__item'>
          <Link className='p-2 block' to='/' onClick={onToggleMenu}>
            Acceuil
          </Link>
        </li>
        <li className='navbar__links__item'>
          <Link className='p-2 block' to='/create' onClick={onToggleMenu}>
            Create
          </Link>
        </li>
        <li className='navbar__links__item'>
          <Link className='p-2 block' to='/my-account' onClick={onToggleMenu}>
            Mon compte
          </Link>
        </li>
        <li className='navbar__links__item'>
          <Link className='p-2 block' to='/signout' onClick={onToggleMenu}>
            Me deconnecter
          </Link>
        </li>
        <li className='navbar__links__item' onClick={onToggleMenu}>
          <Link className='p-2 block' to=''>
            A propos
          </Link>
        </li>
        <li className='navbar__links__item' onClick={onToggleMenu}>
          <Link className='p-2 block' to=''>
            Ressources
          </Link>
        </li>
      </ul>
    </>
  );
};

function MobileNavbar({ account }) {
  const [open, setOpen] = useState(false);
  const onToggleMenu = e => setOpen(!open);

  const openNavbarClassNames = `w-full h-full bg-white z-50 px-10 p-10`;

  return (
    <div className='navigation__mobile'>
      {/* Opener */}
      <button
        className='naviagtion__opener absolute top-1/2 -translate-y-1/2 right-0 p-5 flex align-middle'
        onClick={onToggleMenu}
      >
        {/* Menu opener icon */}
        <Menu />
      </button>

      {/* Navbar */}
      <nav
        className={`navbar fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 ease-in duration-300 z-50 overflow-hidden ${
          (open && openNavbarClassNames) || ''
        }`}
      >
        {/* Navbar Close Btn */}
        <button
          className='navbar__closer absolute right-4 top-2 p-5'
          onClick={onToggleMenu}
        >
          <Close />
        </button>

        {account ? (
          <AuthNavbar {...{ account, onToggleMenu }} />
        ) : (
          <NoAuthNavbar />
        )}
      </nav>
    </div>
  );
}

export default MobileNavbar;
