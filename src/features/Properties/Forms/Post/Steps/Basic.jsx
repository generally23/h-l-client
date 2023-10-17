import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { formatMoney } from '../../../../../utils';
import Button from '../../../../../customComponents/Button';
import {
  isValidDescription,
  isValidPrice,
  isValidTitle,
  validateFields,
} from '../../../../../utils/validate';
import { inputNames } from '../../../../../constants';

// 1st step basic step
function Basic({
  type,
  currentStep,
  setCurrentStep,
  title,
  price,
  description,
  tags,
  setTitle,
  setPrice,
  setDescription,
  setTags,
}) {
  // 1st step handlers
  const onTitleChange = e => setTitle(e.target.value);

  const onPriceChange = e => {
    const newPrice = parseInt(e.target.value.split('.').join('')) || 0;
    setPrice(newPrice);
  };

  const onDescriptionChange = e => setDescription(e.target.value);

  const onTagsChange = newTags => newTags.length < 10 && setTags(newTags);

  const onNextStep = e => {
    // validate inputs and move to next step
    const titleField = {
      value: title,
      validators: [
        {
          validate: isValidTitle,
          errormessage: 'Le titre doit etre de 5 a 60 lettres',
        },
      ],
      setError: setTitleError,
    };

    const priceField = {
      value: price,
      validators: [
        {
          validate: isValidPrice,
          errormessage: 'Le prix doit etre de 5 Million a 900 Milliards',
        },
      ],
      setError: setPriceError,
    };

    const descriptionField = {
      value: description,
      validators: [
        {
          validate: isValidDescription,
          errormessage: 'La description doit etre de 15 a 500 lettres',
        },
      ],
      setError: setDescriptionError,
    };

    const isValid = validateFields(titleField, priceField, descriptionField);

    isValid && setCurrentStep(currentStep + 1);
  };

  // Basic Step State
  const [step] = useState(1);

  // errors
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  return (
    <div
      className={`
        property-form__step property-form__step--basic
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      {/* Step label */}
      <h1 className='property-form__step__label text-3xl text-center mb-10'>
        Infos Basics
      </h1>

      <div className='property-form__step__inputs'>
        {/* Type */}
        <div className='property-form__type'>
          <input type='hidden' name='type' value={type} />
        </div>

        {/* Title */}
        <div className='property-form__title mb-10'>
          <TextField
            id='title'
            name={inputNames.title}
            label='Titre'
            variant='outlined'
            helperText={titleError}
            required
            fullWidth
            value={title}
            onChange={onTitleChange}
            error={!!titleError}
            autoFocus
          />
        </div>

        {/* Price */}
        <div className='property-form__price mb-10'>
          <TextField
            id='price'
            name={inputNames.price}
            label='Prix'
            variant='outlined'
            value={formatMoney(price)}
            onChange={onPriceChange}
            required
            error={!!priceError}
            helperText={priceError}
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position='end'>FG</InputAdornment>,
            }}
          />
        </div>

        {/* Description */}
        <div className='property-form__description mb-10'>
          <TextField
            id='outlined-textarea'
            name={inputNames.description}
            label='Description'
            multiline
            minRows={5}
            maxRows={5}
            fullWidth
            value={description}
            onChange={onDescriptionChange}
            helperText={descriptionError}
            error={!!descriptionError}
            required
          />
        </div>

        {/* Tags */}
        <div className='property-form__tags mb-10'>
          {/* Create this input because MUI Input chips does not assign a value to it's input */}
          <input type='hidden' name={inputNames.tags} value={tags} />

          <MuiChipsInput
            value={tags}
            onChange={onTagsChange}
            fullWidth
            label='Hashtags'
            placeholder='Entrez'
          />
        </div>
      </div>

      <div className='property-form__step__controls flex'>
        <Button type='next' handleClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Basic;
