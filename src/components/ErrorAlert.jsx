import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function ErrorAlert({ message = '' }) {
  return (
    <div className='p-2'>
      <Alert severity='error' variant='filled'>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

export default ErrorAlert;
