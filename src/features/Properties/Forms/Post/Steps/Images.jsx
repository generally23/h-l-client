import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';
import { Close } from '@mui/icons-material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { basicSwiperOptions, isAcceptableImage } from '../../../../../utils';
import { nanoid } from '@reduxjs/toolkit';
import { usePropertyForm } from '../../../../../hooks/usePropertyForm';

const ImagePreviews = ({ images, onDelete, onReplaceClick }) => {
  return (
    <Swiper
      className='mySwiper'
      {...{ ...basicSwiperOptions, modules: [Navigation] }}
    >
      {images.map(image => {
        const imageUrl = URL.createObjectURL(image);
        const statusClass = image.isAcceptable
          ? 'border-green-400'
          : 'border-red-500';
        const { fileId } = image;

        const sizeInMb = Math.ceil(image.size / (1000 * 1024));
        const maxSizeInMb = 5;

        return (
          <SwiperSlide key={nanoid(32)}>
            <div className='preview__item p-5'>
              <div
                className={`preview__item__container bg-white shadow-md relative border-2 rounded-lg overflow-hidden ${statusClass}`}
              >
                <button
                  className='delete-icon absolute top-2 right-2 p-1 text-white bg-red-500/60 rounded-md'
                  data-delete-id={image.fileId}
                  onClick={onDelete}
                  type='button'
                >
                  <Close />
                </button>
                <figure className='thumbnail'>
                  <label htmlFor='replacement' className='block'>
                    <img
                      src={imageUrl}
                      alt='Thumbnail'
                      onLoad={() => URL.revokeObjectURL(imageUrl)}
                      data-file-id={fileId}
                      onClick={onReplaceClick}
                      className='thumbnail__img block h-52 w-full object-cover select-none'
                    />
                  </label>

                  <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                    <span
                      className={`thumbnail__meta__size ${
                        sizeInMb > maxSizeInMb
                          ? 'text-red-500'
                          : 'text-green-500'
                      } `}
                    >
                      {sizeInMb}Mb
                    </span>
                    <span
                      className={`thumbnail__meta__size ${
                        image.isAcceptable ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      HD
                    </span>
                  </div>
                </figure>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      {/* {uploadedFiles.map(file => (
      <ImagePreview key={file.name + Date.now()} {...{ file }} />
    ))} */}
    </Swiper>
  );
};

function Images({
  type,
  currentStep,
  setCurrentStep,
  onPrevStep,
  uploadedFiles,
  setUploadedFiles,
}) {
  const onReplace = async e => {
    console.log('Replaced Id: ', replacedId);

    if (replacedId) {
      const replacement = e.target.files.item(0);

      if (!replacement) return;

      const isAcceptable = await isAcceptableImage(replacement);

      replacement.isAcceptable = isAcceptable;
      replacement.fileId = nanoid();

      const newFiles = uploadedFiles.map(file => {
        if (file.fileId === replacedId) {
          return replacement;
        }

        return file;
      });
      // reset relacedId
      replacedId = null;
      // reset inut value
      e.target.value = '';
      // update uploaded files
      setUploadedFiles(newFiles);
    }
  };

  const onReplaceClick = e => {
    const image = e.target;

    replacedId = image.dataset.fileId;
  };

  const onDelete = e => {
    const btn = e.target.closest('button');

    const { deleteId } = btn.dataset;

    const rest = uploadedFiles.filter(file => {
      return file.fileId !== deleteId;
    });

    setUploadedFiles(rest);
  };

  const onUpload = async e => {
    // uploaded files
    let files = Array.from(e.target.files);

    e.target.value = '';

    const uploadedLength = uploadedFiles.length;

    if (uploadedLength + files.length > maxFiles) {
      // is uploaded full
      if (uploadedLength === maxFiles) return;

      // how much do we need to fill uploaded to max allowed
      const spacesLeft = maxFiles - uploadedLength;

      // ignore files that are positioned past the max allowed
      files = files.slice(0, spacesLeft);
    }

    // add custom info to each file
    for (let file of files) {
      const isAcceptable = await isAcceptableImage(file);
      file.isAcceptable = isAcceptable;
      file.fileId = nanoid();
    }

    files.length && setUploadedFiles([...files, ...uploadedFiles]);
  };

  const onPreview = e => {
    console.log('Previewing...');
    // filter invalid images and keep acceptables
    const acceptableImages = uploadedFiles.filter(image => image.isAcceptable);
    // send images to form
    setUploadedFiles(acceptableImages);
    // move to next step
    setCurrentStep(currentStep + 1);
  };

  // State
  const [step] = useState(type === 'land' ? 4 : 5);

  console.log(uploadedFiles);

  let replacedId = null;

  const maxFiles = 40;

  const acceptedExtensions = 'image/png, image/jpg, image/jpeg, image/webp';

  return (
    <div
      className={`
        house-form__step house-form__step--images
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      <ul className='warning list-disc mb-5 text-sm'>
        <li>Please upload hd images (1920x1080)</li>
        <li>Maximum 40 Images</li>
        <li>Evitez de repeter les images</li>
        <li>Les images en rouge seront supprimer</li>
      </ul>

      {/* Images */}
      <div className='property-form__step__inputs mb-5'>
        <label
          className='block w-full border-2 border-black p-5'
          htmlFor='images'
        >
          {/* Upload Images Input */}
          <input
            type='file'
            id='images'
            className='hidden'
            multiple
            accept={acceptedExtensions}
            onChange={onUpload}
          />
          <AddAPhotoIcon /> Upload
        </label>

        {/* Replace Input */}
        <input
          type='file'
          id='replacement'
          className='hidden'
          accept={acceptedExtensions}
          onChange={onReplace}
        />
        {/* Image previews */}

        <div className='preview'>
          {uploadedFiles.length ? (
            <ImagePreviews
              {...{ onDelete, onReplace, onReplaceClick }}
              images={uploadedFiles}
            />
          ) : (
            ''
          )}
        </div>
      </div>

      <div className='property-form__controls flex'>
        <Button type='prev' handleClick={onPrevStep} classNames='mr-5'>
          Prev
        </Button>
        <Button type='next' handleClick={onPreview}>
          Preview
        </Button>
      </div>
    </div>
  );
}

export default Images;
