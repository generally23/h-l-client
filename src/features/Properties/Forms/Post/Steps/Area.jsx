import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import Button from '../../../../../customComponents/Button';
import {
  isValidArea,
  isValidYearBuilt,
  validateFields,
} from '../../../../../utils/validate';

function Area({
  type,
  currentStep,
  onPrevStep,
  setCurrentStep,
  area,
  setArea,
  areaBuilt,
  setAreaBuilt,
  yearBuilt,
  setYearBuilt,
  fenced,
  setFenced,
}) {
  // 2nd step handlers
  const onAreaChange = e => {
    const newArea = parseInt(e.target.value) || 0;
    // change area
    setArea(newArea);
    // area and area built are the same unless area built is specifically set
    setAreaBuilt(newArea);
  };
  const onAreaBuiltChange = e => parseInt(setAreaBuilt(e.target.value) || 0);

  const onYearBuiltChange = dateObject => {
    setYearBuilt(dateObject);
  };
  const onFencedChange = e => setFenced(!fenced);

  const onNextStep = e => {
    // validate
    const areaField = {
      value: area,
      validators: [
        {
          validate: isValidArea,
          errormessage: 'La superficie doit etre specifie',
        },
      ],
      setError: setAreaError,
    };

    const areaBuiltField = {
      value: areaBuilt,
      validators: [
        {
          validate: isValidArea,
          errormessage: 'La superficie batie doit etre specifie',
        },
      ],
      setError: setAreaBuiltError,
    };

    console.log(yearBuilt);

    const yearBuiltField = {
      value: yearBuilt.$y,
      validators: [
        {
          validate: isValidYearBuilt,
          errormessage: 'Date de construction pas valable',
        },
      ],
      setError: setYearBuiltError,
    };

    const isValid =
      type === 'house'
        ? validateFields(areaField, areaBuiltField, yearBuiltField)
        : validateFields(areaField);

    isValid && setCurrentStep(currentStep + 1);
  };

  const [step] = useState(2);

  // Errors
  const [areaError, setAreaError] = useState('');
  const [areaBuiltError, setAreaBuiltError] = useState('');
  const [yearBuiltError, setYearBuiltError] = useState('');

  return (
    <div
      className={`
        property-form__step property-form__step--area 
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      <div className='property__form__step__inputs'>
        {/* Area */}
        <div className='property-form__area mb-10'>
          <TextField
            id='area'
            name='area'
            value={area}
            onChange={onAreaChange}
            label='Superficie'
            required
            fullWidth
            helperText={areaError}
            error={!!areaError}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  m<sup>2</sup>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Area Built */}
        {type === 'house' && (
          <div className='property-form__area-built mb-10'>
            <TextField
              id='area-built'
              name='areaBuilt'
              value={areaBuilt}
              onChange={onAreaBuiltChange}
              label='Superficie Batie'
              fullWidth
              helperText={areaBuiltError}
              error={!!areaBuiltError}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    m<sup>2</sup>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}

        {/* Year Built */}
        {type === 'house' && (
          <div className='property-form__built-year mb-10'>
            {/* custom hidden input to replace date picker's since it has no name */}
            <input type='hidden' name='yearBuilt' value={dayjs(yearBuilt).$y} />
            {/* Date Picker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                key='yearBuilt'
                value={yearBuilt}
                onChange={onYearBuiltChange}
                label='Année Construit'
                views={['year']}
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    helperText: yearBuiltError,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        )}

        {/* Fenced */}
        <div className='property-form__fenced flex mb-10'>
          <div className='property-form__fenced__checkbox'>
            <FormControlLabel
              name='fenced'
              value={fenced}
              checked={fenced}
              onChange={onFencedChange}
              control={<Checkbox />}
              label='Cloturé'
            />
          </div>
        </div>
      </div>

      <div className='property__form__step__controls flex'>
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

export default Area;
