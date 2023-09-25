import React, { useState } from 'react';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';

import ChangePasswordForm from '../features/Auth/ChangePasswordForm';

function ChangePassword() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <ChangePasswordForm {...{ setSuccessMessage, setErrorMessage }} />
    </>
  );
}

export default ChangePassword;
