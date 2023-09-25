import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchProperty,
  selectProperty,
} from '../features/Properties/propertySlice';
import { CustomTabPanel } from '../customComponents/CustomTab';
import LightGallery from 'lightgallery/react';
import { formatMoney } from '../utils';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import ColorTabs from '../customComponents/CustomTab';
import { selectProperties } from '../features/Properties/propertiesSlice';
import ErrorAlert from '../customComponents/ErrorAlert';
import Header from '../customComponents/Header';

function Property({ property }) {
  const [photoRevealed, setPhotoRevealed] = useState(false);

  const togglePhotoReveal = e => {
    setPhotoRevealed(!photoRevealed);
  };

  return (
    property && (
      <section className='property-section m-auto w-11/12 mt-10 mb-10 md:w-4/6'>
        <div
          className={`
          ${
            photoRevealed
              ? `
            top-0 
            left-0 
            fixed 
            z-50 
            overflow-scroll 
            w-screen 
            h-screen
          `
              : 'w-0 h-0 overflow-hidden'
          }
          property__images
          bg-black
        `}
        >
          <button
            className='fixed top-5 right-5 bg-green-500'
            onClick={togglePhotoReveal}
          >
            X
          </button>
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            {property.images.map(img => (
              <a href={`${img.src}`} key={img.src}>
                <img
                  className='block w-full'
                  alt='Property Image'
                  src={`${img.src}`}
                />
              </a>
            ))}
          </LightGallery>
        </div>
        <h1 className='property__title mb-5 font-normal text-3xl'>
          {property.title} Guinee conakry
        </h1>
        <figure className='property__thumbnail relative'>
          <img
            className='h-80 block w-full'
            src={`${property.images[0].src}`}
            alt=''
          />
          <div
            className='
          h-full 
          w-full 
          absolute 
          top-0 
          right-0 
          bg-black/50 
          hover:bg-black/70 
          flex 
          justify-center 
          items-center
          ease-in 
          duration-300
          cursor-pointer
        '
            onClick={togglePhotoReveal}
          >
            <button
              className='
            bg-green-400 
            inline-block 
            py-1 
            px-2 
            rounded-sm
          '
              onClick={togglePhotoReveal}
            >
              {property.images.length} Photos
            </button>
          </div>
        </figure>
        <div className='property__details p-5 bg-neutral-200'>
          <ColorTabs>
            <CustomTabPanel></CustomTabPanel>
            {/* Details */}
            <CustomTabPanel index={1}>
              <li className='mb-3'>Price: {formatMoney(property.price)} FG</li>
              <li className='mb-3'>
                Status: {property?.status || 'Available'}
              </li>
              <li className='mb-3'>
                Dimension: {property?.dimension || '120m'}
              </li>
              <li className='mb-3'>
                Documents: {property?.documented || 'Disponible'}
              </li>
              {/* <li className='mb-3'>Sur Platforme: {new Date(property?.createdAt)}</li> */}
              <li className='mb-3'>Quartier: Bambeto</li>
              <li className='mb-3'>Type: {property?.type}</li>
              <li className='mb-3'>Construit en: {property?.yearBuilt}</li>

              <li className='tags'>
                <ul className='p-5 bg-black/80 rounded-lg'>
                  {property.tags.split(' ').map(tag => (
                    <li
                      key={tag}
                      className='inline-block bg-green-400/70 mr-2 px-2 mb-2'
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            </CustomTabPanel>
            {/* Description */}
            <CustomTabPanel index={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              nisi doloremque quidem ex quas optio itaque? Molestias quis
              blanditiis ducimus aperiam nesciunt reprehenderit similique
              voluptatem impedit hic. Sint, consequatur totam.
            </CustomTabPanel>
            {/* Owner */}
            <CustomTabPanel index={3}>
              <div className='property__owner text-center p-5'>
                <figure className='property__owner__avatar mb-3'>
                  <img
                    src='http://localhost:9090/assets/images/avatar.avif'
                    crossOrigin='true'
                    alt='Avatar'
                    className='property__owner__avatar__image inline-block w-16 h-16'
                    style={{ borderRadius: '100%' }}
                  />
                </figure>
                <div className='property__owner__name capitalize'>
                  {property.owner.firstname}
                </div>
              </div>
            </CustomTabPanel>
          </ColorTabs>
        </div>
      </section>
    )
  );
}

function PropertyDetail() {
  const { propertyId } = useParams();

  const dispatch = useDispatch();

  const { property, loading, error } = useSelector(selectProperty);

  const properties = useSelector(selectProperties).properties?.docs || [];

  const localProperty = properties.find(property => property.id === propertyId);

  console.log(localProperty);
  let [dispatchCount, setDispatchCount] = useState(0);

  // only run once
  useEffect(() => {
    if (!localProperty && !property && !dispatchCount) {
      setDispatchCount(dispatchCount + 1);
      dispatch(
        fetchProperty({
          url: `http://192.168.1.196:9090/api/v1/properties/${propertyId}`,
          //`http://localhost:9090/api/v1/properties/${propertyId}`,
        })
      );
    }
  });

  console.log(property, error);

  return (
    <div>
      <Header />
      {error && <ErrorAlert message={error.message} />}
      {<Property property={localProperty ? localProperty : property} />}
    </div>
  );
}

export default PropertyDetail;
