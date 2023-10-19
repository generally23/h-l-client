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
  Place,
  Check,
  Close,
  Garage,
  Dining,
  Pool,
  Wc,
  Chair,
  KingBed,
  Kitchen,
  LiveTv,
} from '@mui/icons-material';

const CheckIcon = ({ size = 'medium' }) => (
  <Check fontSize={`${size}`} color='success' />
);

const Uncheck = ({ size = 'small' }) => (
  <Close fontSize={`${size}`} color='error' />
);

const HouseType = ({
  area,
  yearBuilt,
  rooms,
  externalBathrooms,
  internalBathrooms,
  hasCuisine,
  hasGarage,
  hasDiningRoom,
  hasLivingRoom,
  fenced,
  hasPool,
}) => {
  return (
    <>
      {/* Carousel */}
      <div className='property__detail__secondary flex flex-nowrap whitespace-nowrap overflow-auto text-sm'>
        {/* Rooms */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <KingBed />
          </span>
          {rooms} Chambres
        </div>

        {/* External Bathrooms */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <Wc />
          </span>
          {externalBathrooms} Douches Externes
        </div>

        {/* Internal Bathrooms */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <Wc />
          </span>
          {internalBathrooms} Douches Internes
        </div>

        {/* HasGarage */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <Garage />
          </span>{' '}
          Garage{' '}
          {hasGarage ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>

        {/* Cloture */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          Cloture{' '}
          {fenced ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>

        {/* Salon */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <LiveTv />
          </span>
          Salon{' '}
          {hasLivingRoom ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>

        {/* Sale a manger */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <Dining />
          </span>
          Sale à manger{' '}
          {hasDiningRoom ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>

        {/* Cuisine */}
        <div className='bg-slate-300 p-2 mr-2 flex items-center'>
          <span className='mr-1'>
            <Kitchen />
          </span>
          Cuisine{' '}
          {hasCuisine ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>

        {/* Pool */}
        <div className='bg-slate-300 p-2'>
          <span className='mr-1'>
            <Pool />
          </span>
          Piscine{' '}
          {hasPool ? (
            <span className=''>
              <CheckIcon />
            </span>
          ) : (
            <span className=''>
              <Uncheck />
            </span>
          )}
        </div>
      </div>

      {/* House Details */}
      <ul className='property__detail__primary p-5 bg-neutral-200'>
        {/* House Type */}
        <li className='property__details__detail flex'>
          <div className=''>
            <span className='property__details__detail__icon inline-block mr-2'>
              <House fontSize='small'></House>
            </span>
            <span className='property__details__detail__key mr-1.5'>Type:</span>
          </div>

          <div>
            <span className='property__details__detail__value'>Maison</span>
          </div>
        </li>

        {/*  */}
        <CommonDetails {...{ area }} />

        {/* Built Year */}
        <li className='property__details__detail flex'>
          <div className=''>
            <span className='property__details__detail__icon inline-block mr-2'>
              <Construction fontSize='small'></Construction>
            </span>
            <span className='property__details__detail__key mr-1.5'>
              Construit en:
            </span>
          </div>

          <div>
            <span className='property__details__detail__value'>
              {yearBuilt.$y || yearBuilt}
            </span>
          </div>
        </li>
      </ul>
    </>
  );
};

const LandType = ({ area, fenced }) => {
  return (
    <>
      <ul className='property__detail__primary p-5 bg-neutral-200'>
        {/* Property Type */}
        <li className='property__details__detail flex'>
          <div className=''>
            <span className='property__details__detail__icon inline-block mr-2'>
              <Landscape fontSize='small'></Landscape>
            </span>
            <span className='property__details__detail__key mr-1.5'>Type:</span>
          </div>

          <div>
            <span className='property__details__detail__value'>Terrain</span>
          </div>
        </li>

        <CommonDetails {...{ area }} />

        {/* Cloture */}
        <li className='property__details__detail flex'>
          <div className=''>
            <span className='property__details__detail__icon inline-block mr-2 invisible'>
              <Landscape fontSize='small'></Landscape>
            </span>
            <span className='property__details__detail__key mr-1.5'>
              Cloture:
            </span>
          </div>

          <div>
            <span className='property__details__detail__value'>
              {fenced ? (
                <span className=''>
                  <CheckIcon />
                </span>
              ) : (
                <span className=''>
                  <Uncheck />
                </span>
              )}
            </span>
          </div>
        </li>
      </ul>
    </>
  );
};

const CommonDetails = ({ area }) => {
  return (
    <>
      {/* Status */}
      <li className='property__details__detail flex'>
        <div className=''>
          <span className='property__details__detail__icon inline-block mr-2'>
            <Autorenew fontSize='small'></Autorenew>
          </span>
          <span className='property__details__detail__key mr-1.5'>Status:</span>
        </div>

        <div>
          <span className='property__details__detail__value'>Disponible</span>
        </div>
      </li>

      {/* Documented */}
      {/* <li className='property__details__detail flex'>
          <span className='property__details__detail__icon inline-block mr-2'>
            <Description fontSize='small'></Description>
          </span>
          <div>
            <span className='property__details__detail__key mr-1.5'>
              Documents:
            </span>
            <span className='property__details__detail__value'>Disponible</span>
          </div>
        </li> */}

      {/* Address */}
      <li className='property__details__detail flex'>
        <div className=''>
          <span className='property__details__detail__icon inline-block mr-2'>
            <Place fontSize='small'></Place>
          </span>
          <span className='property__details__detail__key mr-1.5'>Lieu:</span>
        </div>

        <div>
          <span className='property__details__detail__value'>Bambeto</span>
        </div>
      </li>

      {/* Area */}
      <li className='property__details__detail flex'>
        <div className=''>
          <span className='property__details__detail__icon inline-block mr-2'>
            <SquareFoot fontSize='small'></SquareFoot>
          </span>
          <span className='property__details__detail__key mr-1.5'>
            Superficie:
          </span>
        </div>

        <div>
          <span className='property__details__detail__value'>
            {area}
            <strong>
              m<sup>2</sup>
            </strong>
          </span>
        </div>
      </li>

      {/* On Platform since */}
      <li className='property__details__detail flex'>
        <div className=''>
          <span className='property__details__detail__icon inline-block mr-2'>
            <Storefront fontSize='small'></Storefront>
          </span>
          <span className='property__details__detail__key mr-1.5'>
            Sur Platforme:
          </span>
        </div>

        <div>
          <span className='property__details__detail__value'>7 jours</span>
        </div>
      </li>
    </>
  );
};

function PropertyCardDetail({ property }) {
  const { type } = property;

  return (
    <div className='property__detail'>
      {type === 'house' ? (
        <HouseType {...property} />
      ) : (
        <LandType {...property} />
      )}
    </div>
  );
}

export default PropertyCardDetail;
