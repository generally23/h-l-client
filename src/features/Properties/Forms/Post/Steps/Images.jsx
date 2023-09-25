import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';
import { Close } from '@mui/icons-material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { isAcceptableImage } from '../../../../../utils';

function Images({ currentStep, onPrevStep, type }) {
  const swiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    lazy: 'true',
    navigation: true,
    modules: [Navigation, FreeMode],
  };

  const [step] = useState(type === 'land' ? 4 : 5);

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  const [uploadedFilesLength, setUploadedFilesLength] = useState(0);
  const [ignoredFilesLength, setIgnoredFilesLength] = useState(0);

  const maxFiles = 40;

  // const duplicates = {};

  const onReplace = e => {};

  const onDelete = e => {};

  const onUpload = async e => {
    // uploaded files
    let files = Array.from(e.target.files);
    const filesLength = files.length;
    const accepts = [];
    const rejects = [];
    // length of files that are uploaded past the maxFiles allowed
    let excludesLength = filesLength > maxFiles ? filesLength - maxFiles : 0;

    for (let image of files.slice(0, maxFiles)) {
      // check if image is accepted. use (size, resolution)
      const isAccepted = await isAcceptableImage(image);

      // console.log(isAccepted);

      !isAccepted ? rejects.push(image) : accepts.push(image);
    }

    setUploadedFilesLength(filesLength);

    setIgnoredFilesLength(excludesLength);

    setRejectedFiles(rejects);

    setAcceptedFiles(accepts);
  };

  console.log(
    acceptedFiles,
    rejectedFiles,
    uploadedFilesLength,
    ignoredFilesLength
  );

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
          <Swiper className='mySwiper' {...swiperOptions}>
            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='preview__item p-5'>
                <div className='preview__item__container bg-white shadow-md relative border-2 border-green-400 rounded-lg overflow-hidden'>
                  <button className='delete-icon absolute top-0 right-0 p-5'>
                    <Close />
                  </button>
                  <figure className='thumbnail'>
                    <label
                      htmlFor='replacement'
                      className='block'
                      onClick={console.log}
                    >
                      <img
                        src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
                        alt='THUMBNAIL'
                        className='thumbnail__img block h-52 w-full'
                      />
                    </label>

                    <div className='thumbnail__meta py-2 px-5 flex justify-between text-sm'>
                      <span className='thumbnail__meta__size'>5mb</span>
                      <span className='thumbnail__meta__size'>HD</span>
                    </div>
                  </figure>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
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
