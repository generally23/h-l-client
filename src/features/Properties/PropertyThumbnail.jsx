import React from 'react';
import { Link } from 'react-router-dom';
import { formatSrset } from '../../utils';

function PropertyThumbnail({
  src,
  srcset,
  propertyId,
  isReplica = false,
  imagename,
}) {
  const formattedSrcSet = formatSrset(srcset);

  console.log(srcset, formattedSrcSet);

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
            h-60
            img:h-80
            lg:h-72
          '
          src={src}
          srcSet={formattedSrcSet}
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
      <img
        className='
          property__thumbnail__image__photo 
          object-cover
          h-60
          img:h-80
          lg:h-72
        '
        src={src}
        srcSet={formattedSrcSet}
        sizes='min-width(600px) 50vw min-width(1200px) calc(100vw / 3) 100w'
        alt='Property Image'
      />
      {/* <Link to={`/${propertyId}/images/${src}`}></Link> */}
    </div>
  );

  return jsx;
}

export default PropertyThumbnail;
