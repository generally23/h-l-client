import React, { useEffect, useState } from 'react';
import SigninForm from '../features/Auth/SigninForm';
import { Link, useNavigate } from 'react-router-dom';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';
import Header from '../customComponents/Header';
import { useSelector } from 'react-redux';

function Signin() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { account } = useSelector(state => state.authentication);

  const redirect = useNavigate();

  useEffect(() => {
    if (account) redirect('/');
  }, [account]);

  const form = !account && !successMessage && (
    <SigninForm {...{ setSuccessMessage, setErrorMessage }} />
  );

  return (
    <>
      <Header />
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {!account && (
        <div className='signup mt-32 '>
          <h1 className='font-bold text-3xl text-center mb-2'>Pas Inscrit?</h1>
          <div className='signup__link text-center'>
            <Link to='/signup' className='inline-block text-blue-500'>
              Cree un compte
            </Link>
          </div>
        </div>
      )}
      {form}
    </>
  );
}

export default Signin;
