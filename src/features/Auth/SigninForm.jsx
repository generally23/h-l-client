import React, { useEffect, useState } from 'react';
import Button from '../../customComponents/Button';
import {
  isValidEmail,
  isValidPassword,
  validateFields,
} from '../../utils/validate';

import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordVisibility from './PasswordVisibility';
import { useAccount } from '../../hooks/useAccount';
import {
  m,
  manageAccountAuth,
  manageAccountAuthanageAccountAuth,
} from '../../utils/crud';

const SigninForm = ({ setSuccessMessage, setErrorMessage }) => {
  // event handlers
  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const passwordField = {
      value: password,
      validators: [
        {
          validate: isValidPassword,
          errormessage: 'Invalid password',
        },
      ],
      setError: setPasswordError,
    };

    const emailField = {
      value: email,
      validators: [
        {
          validate: isValidEmail,
          errormessage: 'Invalid email',
        },
      ],
      setError: setEmailError,
    };

    const isValid = validateFields(emailField, passwordField);

    if (isValid) {
      // submit data to server
      const data = { email, password };

      await manageAccountAuth({
        data,
        path: 'signin',
        setLoading,
        setError,
        setAccount,
      });
    }
  };

  const { loading, setLoading, error, setError, account, setAccount } =
    useAccount();

  // input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const redirect = useNavigate();

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage('Successfully signed in!');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        // redirect
        redirect('/');
      }, 3000);
    }

    if (error) {
      // reset success message if present
      setSuccessMessage('');
      // show error message
      setErrorMessage(error.message);
    }
  }, [account, error, loading]);

  return (
    <form className='signin-form' onSubmit={handleSubmit}>
      {/* Email */}
      <div className='signin-form__email'>
        <label htmlFor='email' className='signin-form__label block mb-2'>
          Email: *
        </label>

        <input
          className='
              signin-form__input 
              block w-full 
              rounded 
              border-2 
              border-black 
              p-1.5
              mb-2
          '
          id='email'
          type='text'
          value={email}
          onChange={onEmailChange}
        />

        <p
          className='
              signin-form__errormsg
            text-red-800
            '
        >
          {emailError}
        </p>
      </div>

      {/* Password */}
      <div className='signin-form__password mb-3'>
        <label htmlFor='password' className='signin-form__label block mb-2'>
          Password: *
        </label>

        <div className='relative'>
          <input
            className='
              signin-form__input 
              block w-full
              rounded 
              border-2
              border-black
              p-1.5
              mb-2
          '
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
          />
          <PasswordVisibility {...{ passwordVisible, setPasswordVisible }} />
        </div>

        <p className='signin-form__errormsg text-red-800'>{passwordError}</p>
      </div>
      {/* Controls */}
      <div className='signin-form__controls ite'>
        <Button type='signin' classNames='flex items-center justify-center'>
          <span className='mr-2'>Sign In</span>
          {loading && (
            <span>
              <CircularProgress size={25} />
            </span>
          )}
        </Button>
      </div>

      {/* {loading && (
        <div className='signin-form__loader text-center p-2'>
          <CircularProgress />
        </div>
      )} */}
    </form>
  );
};

export default SigninForm;
