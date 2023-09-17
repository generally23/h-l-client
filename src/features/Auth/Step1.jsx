import React, { useState } from 'react';

function Step1({
  currentStep,
  firstname,
  lastname,
  email,
  firstnameError,
  lastnameError,
  emailError,
  onFirstameChange,
  onLastameChange,
  onEmailChange,
}) {
  const [step] = useState(1);

  return (
    <div
      className={`
        signup-form__step step--1 
        opacity-100
        ease-in duration-3000
        
        ${currentStep === step ? 'mb-2' : 'h-0 overflow-hidden  opacity-0'}
      `}
    >
      {/* Firstname */}
      <div className='signup-form__firstname mb-2'>
        <label htmlFor='firstname' className='signup-form__label block mb-2'>
          First Name*
        </label>

        <input
          className='
            block 
            w-full 
            rounded 
            border-2 
            border-black 
            p-1
            mb-1
          '
          type='text'
          id='firstname'
          value={firstname}
          onChange={onFirstameChange}
        />

        <p className='signup-form__errormsg text-red-800'>{firstnameError}</p>
      </div>

      <div className='signup-form__lastname mb-2'>
        <label htmlFor='lastname' className='signup-form__label block mb-2'>
          Last Name*
        </label>
        <input
          className='
            block 
            w-full 
            rounded 
            border-2 
            border-black 
            p-1
            mb-1
          '
          id='lastname'
          type='text'
          value={lastname}
          onChange={onLastameChange}
        />

        <p className='signup-form__errormsg text-red-800'>{lastnameError}</p>
      </div>
      <div className='signup-form__email mb-2'>
        <label htmlFor='email' className='signup-form__label block mb-2'>
          Email*
        </label>

        <input
          className='
            block 
            w-full 
            rounded 
            border-2 
            border-black 
            p-1
            mb-1
          '
          type='text'
          id='email'
          value={email}
          onChange={onEmailChange}
        />

        <p className='signup-form__errormsg text-red-800'>{emailError}</p>
      </div>
    </div>
  );
}

export default Step1;
