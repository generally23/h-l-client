import React from 'react';
import { Link } from 'react-router-dom';
import { formatSrset } from '../../utils';

// Abstract Component. Put here to avoid passing props
const Replia = ({ src, formattedSrcSet, propertyId }) => {
  return (
    <>
      <div className='property__thumbnail__image h-full w-full'>
        <img
          className='property__thumbnail__image__photo object-cover blur-md h-full'
          src={src}
          srcSet={formattedSrcSet}
          alt='Property Image'
        />
      </div>

      <div className='h-full w-full absolute top-0 right-0 bg-black/50 flex justify-center items-center'>
        <Link
          to={`/${propertyId}`}
          className='bg-green-400 inline-block py-1 px-2 rounded-sm'
        >
          Voir plus de details
        </Link>
      </div>
    </>
  );
};

function PropertyThumbnail({
  src,
  srcset = '',
  propertyId,
  isReplica = false,
}) {
  const formattedSrcSet = formatSrset(srcset);

  // in case source is generated via an uploaded file by user
  const revokeUrl = () => {
    URL.revokeObjectURL(src);
  };

  return isReplica ? (
    <Replia {...{ src, propertyId, formattedSrcSet }} />
  ) : (
    <div className='property__thumbnail__image h-full'>
      <img
        className='property__thumbnail__image__photo object-cover h-full'
        src={src}
        srcSet={formattedSrcSet}
        sizes='min-width(600px) 50vw min-width(1200px) calc(100vw / 3) 100w'
        alt='Property Image'
        onLoad={revokeUrl}
      />
      {/* <Link to={`/${propertyId}/images/${src}`}></Link> */}
    </div>
  );
}

export default PropertyThumbnail;
