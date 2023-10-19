import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyProperties from '../features/Properties/MyProperties';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProperties } from '../features/Properties/myPropertiesSlice';
import { CircularProgress } from '@mui/material';
import ErrorAlert from '../customComponents/ErrorAlert';
import { manageAccountAuth } from '../utils/crud';
import { useAccount } from '../hooks/useAccount';

function Account({ firstname, lastname, email, avatarUrls, verified }) {
  const onVerifyMe = () => {
    // send an email verification code to this user
    sendVerificationCode();
  };

  const dispatch = useDispatch();

  const {
    loading: sending,
    account: verficationCode,
    error,
    setLoading,
    setAccount,
    setError,
  } = useAccount();

  const sendVerificationCode = () => {
    const path = `verification-code`;
    const method = 'get';

    // send request to server and verfication email will be sent
    manageAccountAuth({ path, method, setLoading, setAccount, setError });
  };

  useEffect(() => {
    console.log('Code: ', verficationCode);
    console.log('Error: ', error);
  }, [verficationCode, error]);

  // this effect fetches my properties and runs once
  useEffect(() => {
    dispatch(fetchMyProperties());
  }, []);

  return (
    <div className='account'>
      <div className='account__info mb-5 bg-white py-5 px-10 sm:inline-block'>
        <div className='flex mb-2'>
          <div className='account__info__avatar grow-0 shrink-0 mr-5'>
            <img
              src={
                avatarUrls[0] ||
                'http://localhost:9090/assets/images/avatar.avif'
              }
              // crossOrigin={(avatarUrls[0] && 'cors') || ''}
              crossOrigin='use-credentials'
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
              className='inline-flex w-auto px-5 bg-green-400 py-2 items-center rounded-sm'
            >
              <span className='mr-2'>Me verifier</span>
              {sending && <CircularProgress size={25} />}
            </button>
          )}
        </div>
      </div>

      <ul className='account__action mb-10 capitalize text-blue-950'>
        <li className='account__action__item'>
          <Link to='/'>Acceuil</Link>
        </li>

        <li className='account__action__item'>
          <Link to='/signout'>Me deconnecter</Link>
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
  );
}

function AccountDetail() {
  const { account, error } = useSelector(state => state.authentication);

  const redirect = useNavigate();

  const [errMsg, setErrMsg] = useState('');

  // const [verficationS]

  useEffect(() => {
    if (!account && error) {
      setErrMsg(error.message);
      setTimeout(() => redirect('/signin'), 3000);
    }
  }, [account, error]);

  return (
    <main className='main p-5 sm:p-10 md:p-20 lg:p-32'>
      {errMsg && <ErrorAlert message={errMsg} />}
      {account && <Account {...account} />}
    </main>
  );
}

export default AccountDetail;
