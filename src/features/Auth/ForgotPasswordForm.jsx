import React, { useEffect, useState } from 'react';
import { isValidEmail, validateFields } from '../../utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../customComponents/Button';
import { forgotMyPassword } from './accountsSlice';
import { useAccount } from '../../hooks/useAccount';
import { manageAccountAuth } from '../../utils/crud';

function ForgotPasswordForm({ setSuccessMessage, setErrorMessage }) {
  const onEmailChange = e => setEmail(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

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

    const isValid = validateFields(emailField);

    if (isValid) {
      const data = { email };
      const path = 'forgot-my-password';
      // send email forgot my password request
      manageAccountAuth({
        data,
        path,
        setLoading,
        setError,
        setAccount,
      });
    }
  };

  const { loading, setLoading, error, setError, account, setAccount } =
    useAccount();

  const redirect = useNavigate();

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage(
        'Reset password instruction has been sent to your email check it out'
      );
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
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

  const [email, setEmail] = useState('');

  // error
  const [emailError, setEmailError] = useState('');

  return (
    <form className='forgot-password-form' onSubmit={handleSubmit}>
      {/* Email */}
      <div
        className='
            forgot-password-form__email
          '
      >
        <label
          htmlFor=''
          className='
              forgot-password-form__label 
              block 
              mb-2
            '
        >
          Email: *
        </label>
        <input
          className='
              forgot-password-form__input 
              block w-full 
              rounded 
              border-2 
              border-black 
              p-1.5
              mb-2
          '
          type='text'
          value={email}
          onChange={onEmailChange}
        />
        <p
          className='
              forgot-password-form__errormsg
            text-red-800
            '
        >
          {emailError}
        </p>
      </div>
      {/* Controls */}
      <div className='forgot-password-form__controls '>
        <Button type='forgot-password'>Send</Button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
