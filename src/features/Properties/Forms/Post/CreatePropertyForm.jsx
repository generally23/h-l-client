import React, { useState } from 'react';
import Basic from './Steps/Basic';
import Area from './Steps/Area';
import Interior from './Steps/Interior';
import Images from './Steps/Images';
import Location from './Steps/Location';

function CreatePropertyForm({ type }) {
  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
  };

  const onPrevStep = e => {
    setCurrentStep(currentStep - 1);
  };

  // these are static, does not change
  const [currentStep, setCurrentStep] = useState(1);
  // const [firstStep] = useState(1);
  // const [lastStep] = useState(type === 'land' ? 4 : 5);

  return (
    <form
      className='property-form p-6 md:p-10 bg-neutral-100 m-10 md:m-20 rounded-md drop-shadow-lg'
      onSubmit={handleSubmit}
    >
      {/* Basic */}
      <Basic
        {...{
          currentStep,
          setCurrentStep,
          type,
        }}
      />
      {/* Area */}
      <Area
        {...{
          currentStep,
          onPrevStep,
          setCurrentStep,
          type,
        }}
      />

      {/* Interior */}
      {type === 'house' && (
        <Interior
          {...{
            currentStep,
            onPrevStep,
            setCurrentStep,
            type,
          }}
        />
      )}

      {/* Location */}
      <Location {...{ currentStep, setCurrentStep, onPrevStep, type }} />

      {/* Images */}
      <Images {...{ currentStep, setCurrentStep, onPrevStep, type }} />
    </form>
  );
}

export default CreatePropertyForm;
