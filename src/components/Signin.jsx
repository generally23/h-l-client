import React, { useEffect, useState } from 'react';
import SigninForm from '../features/Auth/SigninForm';
import { useNavigate } from 'react-router-dom';
import { getLocalAuth } from '../utils';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

function Signin() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { authenticated } = getLocalAuth() || false;

  const redirect = useNavigate();

  useEffect(() => {
    if (authenticated) redirect('/');
  });

  const form = !authenticated && !successMessage && (
    <SigninForm {...{ setSuccessMessage, setErrorMessage }} />
  );

  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {form}
    </>
  );
}

export default Signin;
