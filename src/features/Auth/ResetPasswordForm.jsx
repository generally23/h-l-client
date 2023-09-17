import React, { useEffect, useState } from 'react';
import { isValidPassword, validateFields } from '../../utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { resetMyPassword } from './accountsSlice';
import Button from './Button';
import { useNavigate, useParams } from 'react-router-dom';
import { setLocalAuth } from '../../utils';

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
      dispatch(resetMyPassword(data));
    }
  };

  const dispatch = useDispatch();

  const { loading, account, error } = useSelector(state => state.account);

  const redirect = useNavigate();

  const { resetToken } = useParams();

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage('You have successfully reset your password');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        // set authentication status to true
        setLocalAuth({ authenticated: true, account });

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
    <form
      className='
        reset-password-form
        absolute
        top-1/2 left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2 
        p-10
        w-4/5
        rounded-lg
        bg-neutral-200
    '
      onSubmit={handleSubmit}
    >
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
