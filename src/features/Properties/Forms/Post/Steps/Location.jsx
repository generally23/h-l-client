import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '../../../../../customComponents/Button';
import { isValidAddress, validateFields } from '../../../../../utils/validate';
import ErrorAlert from '../../../../../customComponents/ErrorAlert';

function Location({ currentStep, onPrevStep, setCurrentStep, type }) {
  // if type of property is land this step is 3
  const [step] = useState(type === 'land' ? 3 : 4);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const onAddressChange = e => setAddress(e.target.value);

  const onNextStep = e => {
    const addressField = {
      value: address,
      validators: [
        {
          validate: isValidAddress,
          errormessage:
            'Une addresse est requise et doit pas etre plus de 60 lettres',
        },
      ],
      setError: setAddressError,
    };

    validateFields(addressField) && setCurrentStep(currentStep + 1);
  };

  /*  use this structure to create something like
      property = { location: { type: 'Point', coordinates: [ long, lat ] } }
  */

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const [errMsg, setErrMsg] = useState('');

  const onLocationSuccess = ({ coords }) => {
    setLongitude(coords.longitude);
    setLatitude(coords.latitude);
  };
  const onLocationError = error => {
    setErrMsg('Please provide your GPS Location');
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  });

  return (
    <div
      className={`
        property-form__step property-form__step--location
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      <div className='property-form__step__inputs mb-10'>
        {/* Location */}
        <div className='property-form__address'>
          <TextField
            id='address'
            label='Lieu'
            value={address}
            onChange={onAddressChange}
            required
            fullWidth
            error={!!addressError}
            helperText={addressError}
          />
        </div>
      </div>

      <div className='property-form__controls flex'>
        <Button type='prev' handleClick={onPrevStep} classNames='mr-5'>
          Prev
        </Button>
        <Button type='next' handleClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Location;
