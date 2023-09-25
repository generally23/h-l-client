import React, { useEffect, useState } from 'react';
import ForgotPasswordForm from '../features/Auth/ForgotPasswordForm';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { account } = useSelector(state => state.authentication);

  const redirect = useNavigate();

  useEffect(() => {
    if (account) redirect('/');
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
