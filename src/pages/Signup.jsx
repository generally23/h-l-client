import React, { useEffect, useState } from 'react';
import SignupForm from '../features/Auth/SignupForm';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalAuth } from '../utils';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';
import Header from '../customComponents/Header';
import { useSelector } from 'react-redux';

function Signup() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { account } = useSelector(state => state.authentication);

  const redirect = useNavigate();

  useEffect(() => {
    if (account) redirect('/');
  });

  const form = !account && !successMessage && (
    <SignupForm {...{ setSuccessMessage, setErrorMessage }} />
  );

  return (
    <>
      <Header />
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {!account && (
        <div className='sigin mt-32 '>
          <h1 className='font-bold text-3xl text-center mb-2'>Deja Inscrit?</h1>
          <div className='sigin__link text-center'>
            <Link to='/signin' className='inline-block text-blue-500'>
              Se connecter
            </Link>
          </div>
        </div>
      )}
      {form}
    </>
  );
}

export default Signup;
