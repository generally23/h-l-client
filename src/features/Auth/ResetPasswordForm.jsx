import React, { useEffect, useState } from 'react';
import { isValidPassword, validateFields } from '../../utils/validate';
import Button from '../../customComponents/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { manageAccountAuth } from '../../utils/crud';
import { useAccount } from '../../hooks/useAccount';

function ResetPasswordForm({ setSuccessMessage, setErrorMessage }) {
  const onPasswordChange = e => setPassword(e.target.value);
  const onNewPasswordChange = e => setNewPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const passwordField = {
      value: password,
      validators: [
        {
          validate: isValidPassword,
          errormessage: 'Invalid current password',
        },
      ],
      setError: setPasswordError,
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

    const isValid = validateFields(passwordField, newPasswordField);

    if (isValid) {
      // submit data to server
      const data = { password, newPassword, resetToken };

      // url to sign in
      const path = `reset-my-password/${resetToken}`;
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
    }
  };

  const redirect = useNavigate();

  const { resetToken } = useParams();

  const { loading, setLoading, error, setError, account, setAccount } =
    useAccount();

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage('You have successfully reset your password');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        // set authentication status to true

        redirect('/');
      }, 5000);
    }

    if (error) {
      // reset success message if present
      setSuccessMessage('');
      // show error message
      setErrorMessage(error.message);
    }
  }, [account, error]);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // error
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  return (
    <form className='reset-password-form' onSubmit={handleSubmit}>
      {/* Password */}
      <div className='reset-password__password mb-2'>
        <label htmlFor='' className='reset-password__label block mb-2'>
          Password: *
        </label>
        <input
          className='reset-password__input block w-full rounded border-2 border-black p-1.5 mb-2'
          type='password'
          value={password}
          onChange={onPasswordChange}
        />
        <p
          className='
    reset-password__errormsg
    text-red-800
  '
        >
          {passwordError}
        </p>
      </div>

      {/*  Confirmation Password */}
      <div className='reset-password__password mb-2'>
        <label htmlFor='' className='reset-password__label block mb-2'>
          New Password: *
        </label>
        <input
          className='reset-password__input block w-full rounded border-2 border-black p-1.5 mb-2'
          type='password'
          value={newPassword}
          onChange={onNewPasswordChange}
        />
        <p
          className='
    reset-password__errormsg
    text-red-800
  '
        >
          {newPasswordError}
        </p>
      </div>

      {/* Controls */}
      <div className='signin-form__controls '>
        <Button type='signin'>Reset</Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
