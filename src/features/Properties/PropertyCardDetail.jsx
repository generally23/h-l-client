import React from 'react';
import {
  LocationCity,
  Autorenew,
  SquareFoot,
  Construction,
  Storefront,
  House,
  Landscape,
  Description,
} from '@mui/icons-material';

function PropertyCardDetail({ type, yearBuilt, dimension, status }) {
  return (
    <ul className='property__details p-5 bg-neutral-200'>
      <li className='property__details__detail flex'>
        {type === 'land' ? (
          <>
            <span className='property__details__detail__icon inline-block mr-2'>
              <Landscape></Landscape>
            </span>
            <div>
              <span className='property__details__detail__key mr-1.5'>
                Type:
              </span>
              <span className='property__details__detail__value'>Terrain</span>
            </div>
          </>
        ) : (
          <>
            <span className='property__details__detail__icon inline-block mr-2'>
              <House></House>
            </span>
            <div>
              <span className='property__details__detail__key mr-1.5'>
                Type:
              </span>
              <span className='property__details__detail__value'>Maison</span>
            </div>
          </>
        )}
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <Autorenew></Autorenew>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>Status:</span>
          <span className='property__details__detail__value'>Disponible</span>
        </div>
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <Description></Description>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>
            Documents:
          </span>
          <span className='property__details__detail__value'>Disponible</span>
        </div>
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <LocationCity></LocationCity>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>
            Quartier:
          </span>
          <span className='property__details__detail__value'>Bambeto</span>
        </div>
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <Construction></Construction>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>
            Construit en:
          </span>
          <span className='property__details__detail__value'>{yearBuilt}</span>
        </div>
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <SquareFoot></SquareFoot>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>
            Dimension:
          </span>
          <span className='property__details__detail__value'>
            {dimension}120m<sup>2</sup>
          </span>
        </div>
      </li>
      <li className='property__details__detail flex'>
        <span className='property__details__detail__icon inline-block mr-2'>
          <Storefront></Storefront>
        </span>
        <div>
          <span className='property__details__detail__key mr-1.5'>
            Sur Platforme:
          </span>
          <span className='property__details__detail__value'>7 jours</span>
        </div>
      </li>
    </ul>
  );
}

export default PropertyCardDetail;
