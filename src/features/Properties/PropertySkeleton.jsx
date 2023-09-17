import { Skeleton, Typography, Grid } from '@mui/material';
import React from 'react';

function SingleSkeleton() {
  return (
    <Grid xs={12} sm={6} lg={4} item>
      <div className='property-skeleton'>
        {/* Thumbnail */}
        <Skeleton animation='wave' variant='rectangular' height={200} />

        {/* price */}

        <Skeleton animation='wave' height={40} />

        {/* Title */}

        {/* <Skeleton  animation="wave" height={40} /> */}

        {/* Details */}
        <ul className='property__details flex flex-col p-5 bg-neutral-200'>
          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>

          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>

          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>

          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>

          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>

          <li className='property__details__detail flex basis-full'>
            <span className='property__details__detail__icon mr-2'>
              <Skeleton animation='wave' width={24} height={24} />
            </span>

            <div className='flex basis-full'>
              <span className='property__details__detail__key mr-1.5 basis-1/4'>
                <Skeleton animation='wave' height={20} />
              </span>
              <span className='property__details__detail__value basis-3/4'>
                <Skeleton animation='wave' height={20} />
              </span>
            </div>
          </li>
        </ul>

        <ul className='property__tags p-5 bg-neutral-100 flex'>
          <li className='property__tags__tag mr-2'>
            <Skeleton animation='wave' width={60} />
          </li>
          <li className='property__tags__tag mr-2'>
            <Skeleton animation='wave' width={60} />
          </li>
          <li className='property__tags__tag mr-2'>
            <Skeleton animation='wave' width={60} />
          </li>
          <li className='property__tags__tag'>
            <Skeleton animation='wave' width={60} />
          </li>
        </ul>

        {/* Owner */}
        <div className='property__owner bg-neutral-100 pb-5'>
          <figure className='property__owner__avatar mb-3 flex justify-center'>
            <Skeleton
              animation='wave'
              variant='circular'
              width={60}
              height={60}
            />
          </figure>
          <div className='property__owner__name capitalize flex justify-center'>
            <Skeleton animation='wave' width={200} />
          </div>
        </div>

        <div className='property__extras'>
          <Skeleton animation='wave' width={40} height={60} />
        </div>
      </div>
    </Grid>
  );
}

function PropertySkeleton() {
  const skeletons = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push(<SingleSkeleton key={i} />);
  }

  return skeletons;
}

export default PropertySkeleton;
