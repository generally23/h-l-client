import React, { useEffect, useState } from 'react';
import SignupForm from '../features/Auth/SignupForm';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getLocalAuth } from '../utils';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

function Signup() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { authenticated } = getLocalAuth() || false;

  const redirect = useNavigate();

  useEffect(() => {
    if (authenticated) redirect('/');
  });

  const form = !authenticated && !successMessage && (
    <SignupForm {...{ setSuccessMessage, setErrorMessage }} />
  );

  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {form}
    </>
  );
}

export default Signup;
