import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import PropertyThumbnail from './PropertyThumbnail';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Share, Twitter, Facebook, Email, WhatsApp } from '@mui/icons-material';

import PropertyCardDetail from './PropertyCardDetail';
import SimpleCarousel from './SimpleCarousel';

const Property = ({
  images,
  imagesNames,
  id,
  title,
  price,
  yearBuilt,
  owner,
  dimension,
  tags,
  type,
  status,
}) => {
  // if navigator does not support share api implement fall back
  const onShare = e => {
    try {
      if (navigator.share) {
        navigator.share({
          url: propertyUrl,
          title: 'Checkout this property',
          text: 'Checkout this property',
        });

        return true;
      }

      setShareOpen(!shareOpen);
    } catch (e) {
      console.log('Caught', e);
    }
  };

  // share urls
  const propertyUrl = `http://localhost:3000/${id}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${propertyUrl}`;
  const emailShare = `mailto:?subject=Checkout this property&body=${propertyUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${propertyUrl}&text=[Text]`;
  const whatsappShare = `https://wa.me?text=${propertyUrl}`;

  // max images is 5 if images > 5 else should be 3, 4, 1 etc...
  const maxImages = images.length > 5 ? 5 : images.length;
  // thumbnails, +1 to inlcude item at that position
  const thumbnails = images.slice(0, maxImages);
  const thumbnailNames = imagesNames.slice(0, maxImages);
  // replica
  const replica = thumbnails[thumbnails.length - 1];

  const imageThumbnails = thumbnails.map(({ src, srcSet }, index) => {
    const imageName = thumbnailNames[index];
    return (
      <PropertyThumbnail key={src} src={src} srcSet={srcSet} propertyId={id} />
    );
  });

  const [shareOpen, setShareOpen] = useState(false);
  console.log(shareOpen);

  return (
    <Grid xs={12} sm={6} lg={4} item>
      <div className='property'>
        <div className='property__thumbnail select-none relative overflow-hidden'>
          <Carousel showThumbs={false}>
            {imageThumbnails}
            <PropertyThumbnail {...replica} isReplica propertyId={id} />
          </Carousel>
        </div>

        <h1 className='property__price px-3 py-2 bg-green-400 text-xl font-medium'>
          {formatMoney(price)} FG
        </h1>

        {/* <h1 className='property__title px-3 text-lg'>
          <Link className='inline-block text-blue-500' to={`/${id}`}>
            {title}
          </Link>
        </h1> */}

        <PropertyCardDetail {...{ dimension, yearBuilt, type, status }} />

        {tags && (
          <div className='property__tags bg-neutral-100'>
            <SimpleCarousel>
              <ul className='property__tags__list flex'>
                {tags.split(' ').map(tag => (
                  <li
                    key={tag}
                    className='inline-block bg-green-400/70 [&:not(:last-child)]:mr-3 px-2 py-1'
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </SimpleCarousel>
          </div>
        )}

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
            {owner.firstname}
          </div>
        </div>

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
                <Facebook fontSize='large' sx={{ fill: '#375899' }}></Facebook>
              </a>
              <a className='mr-4' target='_blank' href={`${twitterShare}`}>
                <Twitter fontSize='large' sx={{ fill: '#1d9bf0' }}></Twitter>
              </a>
              <a className='mr-4' target='_blank' href={`${emailShare}`}>
                <Email fontSize='large' sx={{ fill: '' }}></Email>
              </a>
              <a className='' target='_blank' href={`${whatsappShare}`}>
                <WhatsApp fontSize='large' sx={{ fill: '#24d366' }}></WhatsApp>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Property;
