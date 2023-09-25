import React, { useState } from 'react';
import ResetPasswordForm from '../features/Auth/ResetPasswordForm';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';

function ResetPassword() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <ResetPasswordForm {...{ setSuccessMessage, setErrorMessage }} />
    </>
  );
}

export default ResetPassword;
