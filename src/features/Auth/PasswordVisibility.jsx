import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function PasswordVisibility({ passwordVisible, setPasswordVisible }) {
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <button
      type='button'
      className='change-password__icon absolute h-full top-1/2 -translate-y-1/2 right-4 flex items-center'
      onClick={togglePasswordVisibility}
    >
      {passwordVisible ? <VisibilityOff /> : <Visibility />}
    </button>
  );
}

export default PasswordVisibility;
