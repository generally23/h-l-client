import { Phone, Mail, Place } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookLogo, TwitterLogo, InstagramLogo } from './SocialMediaLogos';
import { useSelector } from 'react-redux';

const AuthNavbar = account => {
  return (
    <>
      <Link to='/my-account' className='footer__navigation__link'>
        Mon Compte
      </Link>
      <Link to='/signout' className='footer__navigation__link'>
        Me Deconnecter
      </Link>
    </>
  );
};

const NoAuthNavbar = account => {
  return (
    <>
      <Link to='' className='footer__navigation__link'>
        Signup
      </Link>
      <Link to='' className='footer__navigation__link'>
        Signin
      </Link>
    </>
  );
};

const Footer = () => {
  const { account, error, loading } = useSelector(
    state => state.authentication
  );

  return (
    <footer
      className='
        footer 
        text-neutral-300 
        p-10 
        md:p-20 
        pb-5
        relative
    '
    >
      {/* Footer Background Image */}
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <div className='absolute top-0 left-0 w-full h-full z-10 bg-black/60'></div>
        <img
          src='/background.jpg'
          alt=''
          className='background__img block w-full h-full object-cover'
        />
      </div>

      {/* Logo */}
      <div className='footer__logo'></div>

      <nav className='footer__navigation mb-5 md:mb-20 flex overflow-x-auto py-3 capitalize md:uppercase md:justify-center'>
        <Link to='/' className='footer__navigation__link'>
          Acceuil
        </Link>
        {account ? <AuthNavbar /> : <NoAuthNavbar />}
        <Link to='/' className='footer__navigation__link'>
          A propos
        </Link>
        <Link to='/' className='footer__navigation__link'>
          Help
        </Link>
        <Link to='/' className='footer__navigation__link'>
          Ressources
        </Link>
      </nav>

      {/* Contacts and Social Media (marketing) */}
      <div className='footer__marketing md:flex md:justify-center mb-10'>
        {/* Promotions */}
        <div className='promotion md:mr-32 mb-5'>
          {/* Callout */}
          <div
            className='
              promotion__callout 
              text-xl font-semibold 
              inline-block 
              border-b-4 
              border-white 
              pb-1 
              uppercase 
              tracking-wider 
              mb-5 
              lg:text-2xl
          '
          >
            Suivez nous
          </div>
          {/* social Media Links */}
          <div className='promotion__links'>
            <a href='' className='promotion__link p-2 '>
              <FacebookLogo />
            </a>
            <a href='' className='promotion__link p-2'>
              <TwitterLogo />
            </a>
            <a href='' className='promotion__link p-2'>
              <InstagramLogo />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className='contact'>
          {/* Callout */}
          <div
            className='
              contact__callout 
              text-xl 
              font-semibold 
              border-b-4 
              border-white 
              pb-1 
              uppercase 
              tracking-wider 
              inline-block 
              mb-5
              lg:text-2xl
            '
          >
            Contactez nous
          </div>
          <div className='px-5'>
            {/* Phone Numbers */}
            <ul className='contact__contacts mb-2'>
              <li className='contact__contacts__number mb-1'>
                <span className='mr-2'>
                  <Phone fontSize='small' />
                </span>
                628 04-36-29
              </li>

              <li className='contact__contacts__number'>
                <span className='mr-2'>
                  <Phone fontSize='small' />
                </span>
                660 34-54-10
              </li>
            </ul>

            {/* Email Address */}
            <div className='contact__email mb-2'>
              <span className='mr-2'>
                <Mail fontSize='small' />
              </span>
              rallygene0@gmail.com
            </div>

            {/* Address */}
            <div className='contact__address'>
              <span className='mr-2'>
                <Place fontSize='small' />
              </span>
              Addresse: Bambeto Magasin
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className='copyright text-center'>
        <small>&copy; 2023 Balde All rights reserved</small>
      </p>
    </footer>
  );
};

export default Footer;
