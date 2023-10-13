import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';
import { PropertyPreview } from '../../../Property';

const Preview = ({ currentStep, onPrevStep, inputs }) => {
  const { type } = inputs;
  const [step] = useState(type === 'land' ? 5 : 6);

  // console.log(property);

  return (
    <div
      className={`
    house-form__step house-form__step--preview
    ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
  `}
    >
      {/* View */}
      <div className='mb-5'>
        <PropertyPreview property={inputs} />
      </div>

      {/* Control */}
      <div className='property-form__controls flex'>
        <Button type='prev' handleClick={onPrevStep} classNames='mr-5'>
          Prev
        </Button>
        {/* This is a submit button no since type(prev, next) is not specified */}
        <Button>Crée</Button>
      </div>
    </div>
  );
};

export default Preview;
