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
import { basicSwiperOptions, processAndMetaFile } from '../../../../../utils';
import { nanoid } from '@reduxjs/toolkit';

const ImagePreviews = ({ images, onDelete, onReplaceClick }) => {
  return (
    <Swiper
      className='mySwiper'
      {...{ ...basicSwiperOptions, modules: [Navigation] }}
    >
      {images.map(image => {
        let imageUrl;
        let statusClass;
        const { $fileId = image.sourceName } = image;
        const maxSizeInMb = 5;
        const sizeInMb = Math.ceil(image.size / (1000 * 1024));

        // find which type of image we have (existing | upload)
        if (image.$fileType === 'upload') {
          imageUrl = URL.createObjectURL(image);
          statusClass = image.$isAcceptable
            ? 'border-green-400'
            : 'border-red-500';
        } else {
          imageUrl = image.src;
          statusClass = 'border-green-400';
        }

        return (
          <SwiperSlide key={nanoid()}>
            <div className='preview__item p-5'>
              <div
                className={`preview__item__container bg-white shadow-md relative border-2 rounded-lg overflow-hidden ${statusClass}`}
              >
                <button
                  className='delete-icon absolute top-2 right-2 p-1 text-white bg-red-500/60 rounded-md'
                  data-delete-id={$fileId}
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
                      data-file-id={$fileId}
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
                        image.$isAcceptable ? 'text-green-500' : 'text-red-500'
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
  deletes,
  setDeletes,
}) {
  const onReplace = async e => {
    console.log('Replaced Id: ', replacedId);

    const replacement = e.target.files.item(0);

    if (replacedId && replacement) {
      // check file and assign meta data
      await processAndMetaFile(replacement);
      // new files after replacement occurs
      const newFiles = uploadedFiles.map(file => {
        // file is an upload and is replacement target
        if (file.$fileType === 'upload' && file.$fileId === replacedId)
          return replacement;
        // file is existing upload
        if (file.sourceName === replacedId) {
          // add it to deletes and remove on submit
          setDeletes([...deletes, replacedId]);
          return replacement;
        }
        // file did not match
        return file;
      });
      // reset relacedId
      replacedId = null;
      // update uploaded files
      setUploadedFiles(newFiles);
    }
  };

  const onReplaceClick = e => {
    const image = e.target;
    // set replacedId as item clicked
    replacedId = image.dataset.fileId;
  };

  const onDelete = e => {
    // precisely get btn
    const btn = e.target.closest('button');
    // return if not clicked
    if (!btn) return;
    // get file id to be deleted
    const { deleteId } = btn.dataset;
    // files array after deletion
    const rest = uploadedFiles.filter(file => {
      // if file is an upload just remove it from uploads
      if (file.$fileType === 'upload') {
        return file.$fileId !== deleteId;
      }

      // file is an existing image { sourcename: '' src: '', srcset: [] } coming from the server
      if (file.sourceName === deleteId) {
        // image needs to be deleted from server, add it to deletes which will be removed on form submit
        // setDeletes([...deletes, file.sourceName]);
        setDeletes([...deletes, file.sourceName]);
      }

      // temporarily remove it from uploads
      return file.sourceName !== deleteId;
    });

    setUploadedFiles(rest);
  };

  const onUpload = async e => {
    // uploaded files
    let files = Array.from(e.target.files);

    // reset input value to allow for more uploads (even if last upload did not change)
    // e.target.value = '';

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
      await processAndMetaFile(file);
    }

    // if files have been uploaded update the uploads
    files.length && setUploadedFiles([...files, ...uploadedFiles]);
  };

  const onPreview = e => {
    console.log('Previewing...');
    // filter invalid images and keep acceptables
    const acceptableImages = uploadedFiles.filter(
      image => image.$isAcceptable || image.sourceName
    );
    // send images to form
    setUploadedFiles(acceptableImages);
    // move to next step
    setCurrentStep(currentStep + 1);
  };

  // State
  const [step] = useState(type === 'land' ? 4 : 5);

  // console.log(uploadedFiles);

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
