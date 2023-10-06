import { Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';

function SuccessAlert({ message = '' }) {
  return (
    <div className='p-2'>
      <Alert severity='success' variant='filled'>
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

export default SuccessAlert;
