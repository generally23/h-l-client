import React, { useEffect } from 'react';
import { getLocalAuth } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import MyProperties from '../features/Properties/MyProperties';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyProperties,
  selectMyProperties,
} from '../features/Properties/myPropertiesSlice';
import { sendVerificationCode } from '../features/Auth/accountsSlice';
import { CircularProgress } from '@mui/material';

function Account({ firstname, lastname, email, avatarUrls, verified }) {
  const dispatch = useDispatch();

  const { loading, properties, error } = useSelector(selectMyProperties);

  const onVerifyMe = e => {
    // send an email verification code to this user
    dispatch(sendVerificationCode());
  };

  const {
    loading: verifying,
    error: accountError,
    account,
  } = useSelector(state => state.account);

  console.log(loading, error, properties);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, []);

  return (
    <>
      <div className='account m-5 sm:m-10 md:m-20 lg:m-32'>
        <div className='account__info mb-5 bg-white p-5 shadow-xl'>
          <div className='flex mb-2'>
            <div className='account__info__avatar grow-0 shrink-0 mr-5'>
              <img
                src={
                  avatarUrls[0] ||
                  'http://localhost:9090/assets/images/avatar.avif'
                }
                crossOrigin={(avatarUrls[0] && 'cors') || ''}
                className='account__info__avatar__img rounded-full object-cover w-24 h-24'
                //crossOrigin='true'
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

          <div className='account__info__email italic mb-4'>{email}</div>
          {/* If account is not verified show link */}

          <div className='account__verify'>
            {!verified && (
              <button
                onClick={onVerifyMe}
                className='inline-flex w-auto px-5 bg-green-400 py-2 items-center'
              >
                <span className='mr-2'>Verify Me</span>
                {verifying && <CircularProgress size={25} />}
              </button>
            )}
          </div>
        </div>

        <ul className='account__action mb-10 capitalize text-blue-950'>
          <li className='account__action__item'>
            <Link to='/'>Page D'acceuil</Link>
          </li>

          <li className='account__action__item'>
            <Link to=''>Modifiez mes infos</Link>
          </li>
          <li className='account__action__item'>
            <Link to='/my-account/change-my-password'>
              Changer mon mot de passe
            </Link>
          </li>

          <li className='account__action__item'>
            <Link to='/signout'>Me deconnecter</Link>
          </li>
          <li className='account__action__item'>
            <Link to=''>Supprimer mon compte</Link>
          </li>

          <li className='account__action__item'>
            <a href='#my-properties' className='account__action__item__link'>
              Voir mes proprietes
            </a>
          </li>
        </ul>

        {/* Account Properties */}
        <MyProperties />
      </div>
    </>
  );
}

function AccountDetail() {
  const { account } = useSelector(state => state.authentication);

  const redirect = useNavigate();

  useEffect(() => {
    if (!account) redirect('/signin');
  }, []);

  return <>{account && <Account {...account} />}</>;
}

export default AccountDetail;
