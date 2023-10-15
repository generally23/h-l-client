import React, { useEffect, useState } from 'react';
import { isValidPassword, validateFields } from '../../utils/validate';
import Button from '../../customComponents/Button';
import { useNavigate } from 'react-router-dom';
import PasswordVisibility from './PasswordVisibility';
import { manageAccountAuth } from '../../utils/crud';
import { accountsURL } from '../../constants';
import { useAccount } from '../../hooks/useAccount';

function ChangePasswordForm({ setSuccessMessage, setErrorMessage }) {
  const onCurrentPasswordChange = e => setCurrentPassword(e.target.value);
  const onNewPasswordChange = e => setNewPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const currentPasswordField = {
      value: currentPassword,
      validators: [
        {
          validate: isValidPassword,
          errormessage: 'Invalid current password',
        },
      ],
      setError: setCurrentPasswordError,
    };

    const newPasswordField = {
      value: newPassword,
      validators: [
        {
          validate: isValidPassword,
          errormessage: 'Invalid confirmation password',
        },
      ],
      setError: setNewPasswordError,
    };

    const isValid = validateFields(currentPasswordField, newPasswordField);

    if (isValid) {
      // submit data to server
      changeMyPassword({ currentPassword, newPassword });
    }
  };

  const changeMyPassword = data => {
    // url to sign in
    const path = `change-my-password`;
    // action being performed
    const method = 'update';

    manageAccountAuth({
      data,
      path,
      setLoading,
      setError,
      setAccount,
      method,
    });
  };

  const { loading, setLoading, error, setError, account, setAccount } =
    useAccount();

  const redirect = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState('password');

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage('You have successfully updated your password');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        redirect('/');
      }, 3000);
    }

    if (error) {
      // reset success message if present
      setSuccessMessage('');
      // show error message
      setErrorMessage(error.message);
    }
  }, [account, error]);

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  // error
  const [newPasswordError, setNewPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  return (
    <form className='change-password-form' onSubmit={handleSubmit}>
      {/* Password */}
      <div className='change-password__password mb-2'>
        <label htmlFor='password' className='change-password__label block mb-2'>
          Current Password: *
        </label>

        <div className='relative'>
          <input
            id='password'
            className='change-password__input block w-full rounded border-2 border-black p-2 mb-2'
            type={passwordVisible ? 'text' : 'password'}
            value={currentPassword}
            onChange={onCurrentPasswordChange}
          />

          {/* Password View/Hide Icon */}
          <PasswordVisibility {...{ passwordVisible, setPasswordVisible }} />
        </div>

        {/* Error */}
        <p className='change-password__errormsg text-red-800'>
          {currentPasswordError}
        </p>
      </div>

      {/*  Confirmation Password */}
      <div className='change-password__password mb-2'>
        <label
          htmlFor='confirm-password'
          className='change-password__label block mb-2'
        >
          New Password: *
        </label>
        <div className='relative'>
          <input
            className='change-password__input block w-full rounded border-2 border-black p-2 mb-2'
            type={passwordVisible ? 'text' : 'password'}
            value={newPassword}
            id='confirm-password'
            onChange={onNewPasswordChange}
          />
          {/* Password View/Hide Icon */}
          <PasswordVisibility {...{ passwordVisible, setPasswordVisible }} />
        </div>

        <p
          className='
    change-password__errormsg
    text-red-800
  '
        >
          {newPasswordError}
        </p>
      </div>

      {/* Controls */}
      <div className='signin-form__controls '>
        <Button type='signin'>Changer</Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
