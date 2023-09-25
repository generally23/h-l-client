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

// 1st step basic step
function Basic({ currentStep, setCurrentStep }) {
  // 1st step handlers
  const onTitleChange = e => setTitle(e.target.value);

  const onPriceChange = e =>
    setPrice(Number(e.target.value.split('.').join('')));

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
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  // errors
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => console.log(price), [price]);

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
          <input type='hidden' name='type' value='house' />
        </div>

        {/* Title */}
        <div className='property-form__title mb-10'>
          <TextField
            id='title'
            name='title'
            label='Titre'
            variant='outlined'
            helperText={titleError}
            required
            fullWidth
            value={title}
            onChange={onTitleChange}
            error={!!titleError}
          />
        </div>

        {/* Price */}
        <div className='property-form__price mb-10'>
          <TextField
            id='price'
            name='price'
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
            name='story'
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
          <input type='hidden' name='tags' value={tags.join(' ')} />
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
