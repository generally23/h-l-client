import React from 'react';
import { Link } from 'react-router-dom';

function PropertyThumbnail({
  src,
  srcSet,
  propertyId,
  isReplica = false,
  imagename,
}) {
  const jsx = (isReplica && (
    <>
      <div
        className='
          property__thumbnail__image
          h-full 
          w-full
       '
      >
        <img
          className='
            property__thumbnail__image__photo 
            object-cover 
            blur-md
            max-h-full
            max-w-full
            h-60
          '
          src={src}
          srcSet=''
          alt='Property Image'
        />
      </div>

      <div
        className='
          h-full 
          w-full 
          absolute 
          top-0 
          right-0 
          bg-black/50 
          flex 
          justify-center 
          items-center
      '
      >
        <Link
          to={`/${propertyId}`}
          className='
            bg-green-400 
            inline-block 
            py-1 
            px-2 
            rounded-sm
          '
        >
          See More Details
        </Link>
      </div>
    </>
  )) || (
    <div
      className='
        property__thumbnail__image 
        h-full 
        w-full
      '
    >
      <Link to={`/${propertyId}/images/${src}`}>
        <img
          className='
          property__thumbnail__image__photo 
          object-cover
          max-h-full
          max-w-full
          h-60
        '
          src={src}
          srcSet=''
          alt='Property Image'
        />
      </Link>
    </div>
  );

  return jsx;
}

export default PropertyThumbnail;
