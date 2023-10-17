import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import PropertyThumbnail from './PropertyThumbnail';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Share } from '@mui/icons-material';
import {
  TwitterLogo,
  FacebookLogo,
  EmailLogo,
  WhatsAppLogo,
} from '../../customComponents/SocialMediaLogos';

import PropertyCardDetail from './PropertyCardDetail';
import SimpleCarousel from '../../customComponents/SimpleCarousel';
import { maxShownThumbnail } from '../../constants';
import { nanoid } from '@reduxjs/toolkit';

export const PropertyPreview = ({ property }) => {
  const {
    title,
    price,
    uploadedFiles: images = [],
    tags,
    owner,
    id,
  } = property;

  // console.log('data:', property);

  const thumbnails = images.map(img => {
    return img.$fileType === 'upload'
      ? {
          src: URL.createObjectURL(img),
          srcset: [],
        }
      : img;
  });

  console.log(thumbnails);

  return (
    <div className='property'>
      {/* Thumbnail */}
      <Carousel showThumbs={true}>
        {thumbnails.map(({ src, srcset }) => (
          <PropertyThumbnail
            key={src}
            src={src}
            srcSet={srcset}
            propertyId={id}
          />
        ))}
      </Carousel>

      {/* Price */}
      <Price price={price} />

      {/* Title */}
      <Title title={title} id={id} />

      {/* Description */}
      <p className='property__description p-5'>
        {property.story && property.story}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quis
      </p>

      {/* Details */}
      <PropertyCardDetail property={property} />

      {/* Tags */}
      <Tags tags={tags} />

      {/* Owner */}
      <Owner {...owner} />
    </div>
  );
};

// const Thumbnail = () => {
//   {
//     /* Property Thumbnail */
//   }
//   return (
//     <div className='property__thumbnail select-none relative overflow-hidden'>
//       <Carousel showThumbs={false}>
//         {imageThumbnails}
//         <PropertyThumbnail {...replica} isReplica propertyId={id} />
//       </Carousel>
//     </div>
//   );
// };

/* Property Price */

const Price = ({ price }) => {
  return (
    <h1 className='property__price px-3 py-2 text-2xl font-bold tracking-wider'>
      {formatMoney(price)} FG
    </h1>
  );
};

// Title

const Title = ({ title, id }) => {
  return (
    <h1 className='property__title px-3 text-lg'>
      <Link className='inline-block text-blue-500' to={`/${id}`}>
        {title}
      </Link>
    </h1>
  );
};

// Tags

export const Tags = ({ tags }) => {
  return (
    tags && (
      <div className='property__tags bg-neutral-100'>
        <SimpleCarousel>
          <ul className='property__tags__list flex'>
            {tags.map(tag => (
              <li
                key={nanoid()}
                className='inline-block bg-green-400/70 [&:not(:last-child)]:mr-3 px-2 py-1'
              >
                #{tag}
              </li>
            ))}
          </ul>
        </SimpleCarousel>
      </div>
    )
  );
};

// Owner
const Owner = ({ firstname }) => {
  return (
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
      <div className='property__owner__name capitalize'>{firstname}</div>
    </div>
  );
};

const Property = ({ property }) => {
  // if navigator does not support share api implement fall back
  const onShare = async e => {
    try {
      if (navigator.share) {
        return await navigator.share({
          url: propertyUrl,
          title: 'Checkout this property',
          text: 'Check%20out%20this%20cool%20website%21',
        });
      }

      setShareOpen(!shareOpen);
    } catch (e) {
      console.log('Caught', e);
    }
  };

  const { title, price, images, tags, owner, id } = property;

  // share urls
  const propertyUrl = `http://localhost:3000/${id}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${propertyUrl}`;
  const emailShare = `mailto:?subject=Checkout this property&body=${propertyUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${propertyUrl}&text=[Text]`;
  const whatsappShare = `https://wa.me?text=${propertyUrl}`;

  // max images is maxShownThumbnail if images > maxShownThumbnail else should be 3, 4, 1 etc...
  const maxImages =
    images.length > maxShownThumbnail ? maxShownThumbnail : images.length;
  // thumbnails, +1 to inlcude item at that position
  const thumbnails = images.slice(0, maxImages);

  // replica
  const replica = thumbnails[thumbnails.length - 1];

  const imageThumbnails = thumbnails.map(({ src, srcset }) => {
    return (
      <PropertyThumbnail key={src} src={src} srcSet={srcset} propertyId={id} />
    );
  });

  const [shareOpen, setShareOpen] = useState(false);

  return (
    <Grid xs={12} sm={6} lg={4} item>
      <div className='property'>
        {/* Property Thumbnail */}
        <div className='property__thumbnail select-none relative overflow-hidden'>
          <Carousel showThumbs={false}>
            {imageThumbnails}
            <PropertyThumbnail {...replica} isReplica propertyId={id} />
          </Carousel>
        </div>

        {/* Price */}
        <Price price={price} />

        {/* Property Title id used to make a link */}
        <Title {...{ title, id }} />

        {/* Property Details */}
        <PropertyCardDetail property={property} />

        {/* Property Tags */}
        <Tags tags={tags} />

        {/* Property Owner */}
        <Owner {...owner} />

        {/* Property Footer Extra Data */}
        <div className='property__extras p-5'>
          <div className='property__share relative'>
            <div className='mb-4'>
              <button className='property__share__btn' onClick={onShare}>
                <Share></Share>
              </button>
            </div>

            <div
              className={`                
                property__share__fallback 
                p-5
                rounded-sm
                justify-center
                absolute
                top-1/2
                -translate-y-1/2
                left-10
                ${shareOpen ? 'flex' : 'hidden'}
              `}
            >
              <a className='mr-4' target='_blank' href={`${facebookShare}`}>
                <FacebookLogo />
              </a>
              <a className='mr-4' target='_blank' href={`${twitterShare}`}>
                <TwitterLogo />
              </a>
              <a className='mr-4' target='_blank' href={`${emailShare}`}>
                <EmailLogo />
              </a>
              <a className='' target='_blank' href={`${whatsappShare}`}>
                <WhatsAppLogo />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Property;
