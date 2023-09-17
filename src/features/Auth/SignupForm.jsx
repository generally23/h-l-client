import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  isValidEmail,
  isValidFirstname,
  isValidLastname,
  isValidPassword,
  validateFields,
} from '../../utils/validate';
import { signup } from './accountsSlice';

import Button from './Button';
import Step1 from './Step1';
import Step2 from './Step2';
import { setLocalAuth } from '../../utils';
import Step3 from './Step3';

const SignupForm = ({ setSuccessMessage, setErrorMessage }) => {
  // event handler
  const onFirstameChange = e => setFirstname(e.target.value);
  const onLastameChange = e => setLastname(e.target.value);
  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);
  const onConfirmPasswordChange = e => setConfirmPassword(e.target.value);
  const onDobChange = e => setDob(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();

    // if (isValid) {
    // }

    dispatch(signup({ firstname, lastname, email, password }));
  };
  const handleClick = e => {
    e.preventDefault();
    const { type } = e.target.dataset;

    // allow user to go back to previous step
    type === 'prev' && setCurrentStep(currentStep - 1);

    // validate step 1 before moving to next step
    if (type === 'next') {
      if (currentStep === 1) {
        const firstnameField = {
          value: firstname,
          validators: [
            {
              validate: isValidFirstname,
              errormessage: 'Firstname is too short or too long',
            },
          ],
          setError: setFirstnameError,
        };

        const lastnameField = {
          value: lastname,
          validators: [
            {
              validate: isValidLastname,
              errormessage: 'Lastname is too short or too long',
            },
          ],
          setError: setLastnameError,
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

        const isValid = validateFields(
          firstnameField,
          lastnameField,
          emailField
        );

        isValid && setCurrentStep(currentStep + 1);
      }

      if (currentStep === 2) {
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

        const confirmPasswordField = {
          value: confirmPassword,
          validators: [
            {
              validate: isValidPassword,
              errormessage: 'Invalid password',
            },
          ],
          setError: setConfirmPasswordError,
        };

        const isValid = validateFields(passwordField, confirmPasswordField);

        isValid && setCurrentStep(currentStep + 1);
      }
    }
  };

  const dispatch = useDispatch();
  const { loading, account, error } = useSelector(state => state.account);
  const redirect = useNavigate();

  useEffect(() => {
    if (account) {
      // show success message
      setSuccessMessage('Successfully signed up!');
      // reset error message if present
      setErrorMessage('');
      // redirect user after 2 seconds
      setTimeout(() => {
        // set authentication status to true
        setLocalAuth({ authenticated: true, account });
        // redirect
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

  // input fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  // errors
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // steps
  const [firstStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [lastStep] = useState(3);
  // math about steps
  const prevStep = currentStep > firstStep;
  const nextStep = currentStep < lastStep;

  return (
    <form
      className='
        signup-form 
        absolute 
        top-1/2 
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2
        p-10
        w-4/5
        rounded-lg
      '
      onSubmit={handleSubmit}
    >
      <Step1
        {...{
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
        }}
      />

      <Step2
        {...{
          currentStep,
          onPasswordChange,
          onConfirmPasswordChange,
          onDobChange,
          password,
          confirmPassword,
          dob,
          passwordError,
          confirmPasswordError,
        }}
      />

      <Step3 currentStep={currentStep} />

      <div className='signup-form__controls'>
        {/* Compute previous btn */}
        {prevStep && (
          <Button type='prev' handleClick={handleClick}>
            Back
          </Button>
        )}
        {/* Compute next btn or signup btn */}
        {(nextStep && (
          <Button type='next' handleClick={handleClick}>
            Next
          </Button>
        )) || <Button type='signup'>Sign Up</Button>}
      </div>
    </form>
  );
};

export default SignupForm;
