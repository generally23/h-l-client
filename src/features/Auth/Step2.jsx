import React, { useState } from 'react';
import PasswordVisibility from './PasswordVisibility';

function Step2({
  currentStep,
  password,
  onPasswordChange,
  onConfirmPasswordChange,
  onDobChange,
  confirmPassword,
  dob,
  passwordError,
  confirmPasswordError,
}) {
  const [step] = useState(2);

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className={`
        signup-form__step 
        step--2 
        ${currentStep === step ? 'mb-3' : 'h-0 overflow-hidden'}`}
    >
      {/* Password */}
      <div className='signup-form__password mb-2'>
        <label htmlFor='password' className='signup-form__label block mb-2'>
          Password*
        </label>

        <div className='relative'>
          <input
            className='block w-full rounded border-2 border-black p-1 mb-1'
            type={passwordVisible ? 'text' : 'password'}
            id='password'
            name='password'
            value={password}
            onChange={onPasswordChange}
          />

          <PasswordVisibility {...{ passwordVisible, setPasswordVisible }} />
        </div>

        <p className='signup-form__errormsg text-red-800'>{passwordError}</p>
      </div>

      {/* Confirm Password */}
      <div className='signup-form__password-confirm mb-2'>
        <label
          htmlFor='confirm-password'
          className='signup-form__label block mb-2'
        >
          Confirm Password*
        </label>

        <div className='relative'>
          <input
            className='block w-full rounded border-2 border-black p-1 mb-1'
            type={passwordVisible ? 'text' : 'password'}
            id='confirm-password'
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />

          <PasswordVisibility {...{ passwordVisible, setPasswordVisible }} />
        </div>

        <p className='signup-form__errormsg text-red-800'>
          {confirmPasswordError}
        </p>
      </div>
    </div>
  );
}

export default Step2;
