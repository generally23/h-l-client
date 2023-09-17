import React, { useEffect, useState } from 'react';
import ForgotPasswordForm from '../features/Auth/ForgotPasswordForm';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { getLocalAuth } from '../utils';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { authenticated } = getLocalAuth() || false;

  const redirect = useNavigate();

  useEffect(() => {
    if (authenticated) redirect('/');
  });
  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <ForgotPasswordForm {...{ setSuccessMessage, setErrorMessage }} />
    </>
  );
}

export default ForgotPassword;
