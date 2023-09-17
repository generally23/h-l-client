import React, { useState } from 'react';

function Step3({ currentStep }) {
  const onFileChange = e => {
    // read file
    const avatar = e?.target?.files?.item(0);
    console.log(avatar);
  };

  const [step] = useState(3);

  const [file, setFile] = useState('');
  const [fileError, setFileError] = useState('');

  return (
    <div
      className={`
      signup-form__step 
      step--3
      ${currentStep === step ? '' : 'h-0 overflow-hidden'}`}
    >
      <div className='signup-form__avatar mb-2'>
        <label htmlFor='avatar' className='signup-form__label block mb-2'>
          Avatar
        </label>

        <input
          className='block w-full rounded border-2 border-black p-1 mb-1'
          type='file'
          id='avatar'
          accept='image/png, image/jpeg image/jpg image/webp'
          onChange={onFileChange}
        />

        <p className='signup-form__errormsg text-red-800'>{fileError}</p>
      </div>
    </div>
  );
}

export default Step3;
