import React, { useState } from 'react';

function Step3({ currentStep }) {
  const onFileLoaded = e => {
    // Set the source (URL) of the image element to the loaded data
    setAvatarUrl(e.target.result);
  };

  const onFileChange = e => {
    // get input
    const input = e.target;

    // get uploaded file
    const avatar = input.files.length && input.files.item(0);

    console.log(avatar);
    if (!avatar) return;

    // Create a FileReader to read the image file
    const reader = new FileReader();

    // Read the selected image file as a data URL
    reader.readAsDataURL(avatar);

    // Set up an event handler to run when the file reading is complete
    reader.onload = onFileLoaded;
  };

  const [step] = useState(3);

  // const [file, setFile] = useState('');
  // const [fileError, setFileError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div
      className={`
      signup-form__step 
      step--3
      ${currentStep === step ? '' : 'h-0 overflow-hidden'}`}
    >
      <div className='signup-form__avatar mb-2'>
        <label htmlFor='avatar' className='signup-form__label block mb-2'>
          <div className='signup-form__avatar__preview flex justify-center mb-4'>
            <img
              className='block w-24 h-24 object-cover rounded-full'
              src={avatarUrl}
              alt='Avatar'
              crossOrigin='cors'
            />
          </div>

          <button
            className='signup-form__label__text block border-2 border-black w-full'
            type='button'
          >
            Profile
          </button>
        </label>

        <input
          className='p-1 mb-1 hidden'
          type='file'
          name='avatar'
          id='avatar'
          accept='image/png, image/jpeg, image/jpg, image/webp'
          onChange={onFileChange}
        />

        {/* <p className='signup-form__errormsg text-red-800'>{fileError}</p> */}
      </div>
    </div>
  );
}

export default Step3;
