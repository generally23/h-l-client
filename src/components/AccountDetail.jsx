import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { getLocalAuth } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

function Account({ firstname, lastname, email }) {
  return (
    <div className='account m-5 sm:m-10 md:m-20 lg:m-32'>
      <div className='account__info mb-5 bg-neutral-200 p-5'>
        <div className='flex mb-2'>
          <div className='account__info__avatar grow-0 shrink-0 mr-5'>
            <img
              src='http://localhost:9090/assets/images/avatar.avif'
              className='account__info__avatar__img rounded-full'
              crossOrigin='true'
              width={100}
              height={100}
              alt=''
            />
          </div>

          <div className='grow-0 shrink-0'>
            <h1 className='account__info__firstname text-2xl font-semibold capitalize'>
              {firstname}
            </h1>
            <h1 className='account__info__lastname text-2xl font-semibold capitalize'>
              {lastname}
            </h1>
          </div>
        </div>

        <div className='account__info__email italic'>{email}</div>
      </div>

      <ul className='account__action mb-10'>
        <li className='account__action__item'>
          <a href='' className='account__action__item__link'>
            Modifiez mes infos
          </a>
        </li>
        <li className='account__action__item'>
          <Link to='/my-account/change-my-password'>
            Changer mon mot de passe
          </Link>
        </li>
        <li className='account__action__item'>
          <a href='#my-properties' className='account__action__item__link'>
            Voir mes proprietes
          </a>
        </li>
      </ul>

      <div className='account__properties' id='my-properties'>
        <h1 className='account__properties__label text-3xl font-bold mb-10 text-center'>
          Mes Propriétés
        </h1>
        <div className='account__properties__container flex flex-nowrap'>
          <div className='mr-5 bg-slate-500 grow-0 shrink-0 basis-60'>
            <div className='account__properties__property__thumbnail h-52'></div>
            <div className='account__properties__property__action'>
              <button className='block w-full p-2 bg-blue-500'>Manager</button>
            </div>
          </div>
          <div className='mr-5 bg-slate-500 grow-0 shrink-0 basis-60'>
            <div className='account__properties__property__thumbnail h-52'></div>
            <div className='account__properties__property__action'>
              <button className='block w-full p-2 bg-blue-500'>Manager</button>
            </div>
          </div>
          <div className='mr-5 bg-slate-500 grow-0 shrink-0 basis-60'>
            <div className='account__properties__property__thumbnail h-52'></div>
            <div className='account__properties__property__action'>
              <button className='block w-full p-2 bg-blue-500'>Manager</button>
            </div>
          </div>
          <div className='mr-5 bg-slate-500 grow-0 shrink-0 basis-60'>
            <div className='account__properties__property__thumbnail h-52'></div>
            <div className='account__properties__property__action'>
              <button className='block w-full p-2 bg-blue-500'>Manager</button>
            </div>
          </div>
          <div className='mr-5 bg-slate-500 grow-0 shrink-0 basis-60'>
            <div className='account__properties__property__thumbnail h-52'></div>
            <div className='account__properties__property__action'>
              <button className='block w-full p-2 bg-blue-500'>Manager</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountDetail() {
  const { authenticated, account } = getLocalAuth() || false;

  const firstname = account?.firstname;
  const lastname = account?.lastname;
  const email = account?.email;

  const redirect = useNavigate();

  useEffect(() => {
    if (!authenticated) redirect('/signin');
  });

  return (
    <>
      {/* Change Password Form */}
      {/* <div className='modal fixed top-0 left-0 w-full h-full bg-black/80'> */}
      {/* <ChangePassword /> */}
      {/* </div> */}
      <Account {...{ firstname, lastname, email }} />
    </>
  );
}

export default AccountDetail;
