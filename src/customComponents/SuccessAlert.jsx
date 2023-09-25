import { Alert, AlertTitle } from '@mui/material';
import React, { createRef, useEffect, useState } from 'react';

function SuccessAlert({ message = '' }) {
  const ref = createRef();

  useEffect(() => {
    // message && ref.current.play();
  });

  return (
    <div className='p-2'>
      <audio ref={ref} src='/successAlert.mp3' autoPlay></audio>
      <Alert severity='success' variant='filled'>
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

export default SuccessAlert;
