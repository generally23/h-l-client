import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { EditSharp, DeleteForever, Public } from '@mui/icons-material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { basicSwiperOptions } from '../../utils';
import { useSelector } from 'react-redux';
import { selectMyProperties } from './myPropertiesSlice';

const Published = ({ id, images }) => {
  const thumbnail = images[0].src;
  return (
    <div className='bg-gray-200'>
      {/* Thumbnail Container */}
      <div className='account__properties__property__thumbnail'>
        {/* Thumbnail */}
        <figure className='thumbnail'>
          <img
            src={thumbnail}
            alt='Property Image'
            className='thumbnail__img h-52 block select-none w-full'
          />
        </figure>
      </div>

      {/* Action Btns */}
      <div className='account__properties__property__action p-10 text-white'>
        <button className='block p-2 bg-green-500/90 mb-3 w-full rounded-sm'>
          <span className='mr-1'>
            <EditSharp />
          </span>
          Modifiez
        </button>
        <button className='block p-2 bg-red-400/90 w-full rounded-sm'>
          <span className='mr-1'>
            <DeleteForever />
          </span>
          Supprimer
        </button>
      </div>
    </div>
  );
};

const UnPublished = ({ id, images }) => {
  const thumbnail = images[0].src;

  return (
    <div className='bg-gray-200'>
      {/* Thumbnail Container */}
      <div className='account__properties__property__thumbnail relative'>
        {/* Action Btns */}
        <div className='absolute top-3 right-3 text-white'>
          <button className='btn-edit p-2 mr-2 bg-green-500/50 rounded-md'>
            <EditSharp fontSize='small' />
          </button>
          <button className='btn-delete p-2 bg-red-400/40 rounded-md'>
            <DeleteForever fontSize='small' />
          </button>
        </div>

        {/* Thumbnail */}
        <figure className='thumbnail'>
          <img
            src={thumbnail}
            alt=''
            className='thumbnail__img h-52 block select-none w-full'
          />
        </figure>
      </div>

      <div className='account__properties__property__action text-center p-10'>
        <button className='py-2 px-5 bg-blue-400 inline-flex justify-center items-center rounded-sm'>
          <span className='mr-2'>
            <Public fontSize='medium' />
          </span>
          Publier
        </button>
      </div>
    </div>
  );
};

function MyProperties() {
  //  My properties
  const { loading, properties, error } = useSelector(selectMyProperties);
  console.log(properties);
  return (
    <div className='account__properties' id='my-properties'>
      <h1 className='account__properties__label text-3xl font-bold mb-10 text-center'>
        Mes Propriétés
      </h1>

      {/* Account Properties Carousel */}
      <div className='account__properties__content mb-10'>
        {/* Swiper Instance */}
        <Swiper
          className='mySwiper'
          {...{
            ...basicSwiperOptions,
            modules: [Navigation],
          }}
        >
          {properties.map(property => (
            <SwiperSlide key={property.id}>
              {property.published ? (
                <Published {...{ ...property }} />
              ) : (
                <UnPublished {...{ ...property }} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MyProperties;
