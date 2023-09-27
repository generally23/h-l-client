import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';
import { Close } from '@mui/icons-material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { basicSwiperOptions, isAcceptableImage } from '../../../../../utils';
import { nanoid } from '@reduxjs/toolkit';

const ImagePreviews = ({ images, onDelete, onReplace }) => {
  const swiperOptions = {};

  return (
    <Swiper className='mySwiper' {...basicSwiperOptions}>
      {images.map(image => {
        const imageUrl = URL.createObjectURL(image);
        const statusClass = image.isAcceptable
          ? 'border-green-400'
          : 'border-red-500';

        const sizeInMb = Math.ceil(image.size / (1000 * 1024));

        return (
          <SwiperSlide key={nanoid(32)}>
            <div className='preview__item p-5 mb-5'>
              <div
                className={`preview__item__container bg-white shadow-md relative border-2 rounded-lg overflow-hidden ${statusClass}`}
              >
                <button
                  className='delete-icon absolute top-0 right-0 p-5'
                  data-deleteid={image.fileId}
                  onClick={onDelete}
                  type='button'
                >
                  <Close />
                </button>
                <figure className='thumbnail'>
                  <label
                    htmlFor='replacement'
                    className='block'
                    onClick={console.log}
                  >
                    <img
                      src={imageUrl}
                      alt='Thumbnail'
                      onLoad={() => URL.revokeObjectURL(imageUrl)}
                      className='thumbnail__img block h-52 w-full'
                    />
                  </label>

                  <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                    <span className='thumbnail__meta__size'>{sizeInMb}Mb</span>
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

function Images({ currentStep, onPrevStep, type }) {
  const onReplace = e => {};

  const onDelete = e => {
    const btn = e.target.closest('button');

    const { deleteid } = btn.dataset;

    const rest = uploadedFiles.filter(file => {
      console.log(file, deleteid);
      return file.fileId !== deleteid;
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

  const [step] = useState(type === 'land' ? 4 : 5);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const maxFiles = 40;

  const acceptedExtensions = 'image/png, image/jpg, image/jpeg, image/webp';

  return (
    <div
      className={`
        house-form__step house-form__step--images
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      {/* Images */}
      <div className='property-form__step__inputs mb-10'>
        <input
          type='file'
          id='images'
          className='hidden'
          multiple
          accept={acceptedExtensions}
          onChange={onUpload}
        />
        <input
          type='file'
          id='replacement'
          accept={acceptedExtensions}
          onChange={onReplace}
        />

        <div className='preview'>
          {uploadedFiles.length && (
            <ImagePreviews
              {...{ onDelete, onReplace }}
              images={uploadedFiles}
            />
          )}
        </div>
      </div>

      <div className='property-form__controls flex'>
        <Button type='prev' handleClick={onPrevStep} classNames='mr-5'>
          Prev
        </Button>
        <Button type='next' handleClick={() => {}}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Images;
