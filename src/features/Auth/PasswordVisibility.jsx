import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function PasswordVisibility({ passwordType, setPasswordType }) {
  const togglePasswordVisibility = e => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password');
  };
  return (
    <button
      type='button'
      className='change-password__icon absolute h-full top-1/2 -translate-y-1/2 right-4 flex items-center'
      onClick={togglePasswordVisibility}
    >
      {passwordType === 'password' ? <Visibility /> : <VisibilityOff />}
    </button>
  );
}

export default PasswordVisibility;
