import React, { useEffect, useState } from 'react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Material UI Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EditSharp, DeleteForever, Public } from '@mui/icons-material';
import { Alert, Button, CircularProgress } from '@mui/material';

// Local Imports
import { basicSwiperOptions } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProperty, selectMyProperties } from './myPropertiesSlice';
import { Link } from 'react-router-dom';

const Published = ({ id, images = [], onDialogueOpen }) => {
  /* 
    get thumbnail image as 1st image
    might be undefined 
    consider replacing it 
  */
  const thumbnail = images[0];

  return (
    <div className='bg-gray-200'>
      {/* Thumbnail Container */}
      <div className=''>
        {/* Thumbnail */}
        <figure className='thumbnail'>
          <img
            src={thumbnail?.src}
            srcSet={thumbnail?.srcset}
            alt='Property Image'
            className='thumbnail__img block select-none object-cover'
          />
        </figure>
      </div>

      {/* Action Btns */}
      <div className='account__properties__property__action p-10 text-white'>
        <Link
          className='block p-2 bg-green-500/90 mb-3 w-full rounded-sm text-center'
          to={`/${id}/update`}
        >
          <span className='mr-1'>
            <EditSharp />
          </span>
          Modifiez
        </Link>

        <button
          className='block p-2 bg-red-400/90 w-full rounded-sm'
          data-property-id={id}
          onClick={onDialogueOpen}
        >
          <span className='mr-1'>
            <DeleteForever />
          </span>
          Supprimer
        </button>
      </div>
    </div>
  );
};

const UnPublished = ({ id, images = [], onDialogueOpen }) => {
  /* 
    get thumbnail image as 1st image
    might be undefined 
    consider replacing it 
  */
  const thumbnail = images[0]?.src;

  return (
    <div className='bg-gray-200'>
      {/* Thumbnail Container */}
      <div className='relative'>
        {/* Action Btns */}
        <div className='absolute top-3 right-3 text-white'>
          <Link
            to={`/${id}/update`}
            className='btn-edit p-2 mr-2 bg-green-500/50 rounded-md text-center'
          >
            <EditSharp fontSize='small' />
          </Link>

          <button
            className='btn-delete p-2 bg-red-400/40 rounded-md'
            data-property-id={id}
            onClick={onDialogueOpen}
          >
            <DeleteForever fontSize='small' />
          </button>
        </div>

        {/* Thumbnail */}
        <figure className='thumbnail'>
          <img
            src={thumbnail}
            alt=''
            className='thumbnail__img block select-none object-cover'
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

const AcknowledgeDeletion = ({
  open,
  onDialogueClose,
  onDeleteProperty,
  loading,
}) => {
  return (
    <div className='dialogue'>
      <Dialog
        open={open}
        onClose={onDialogueClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Supprimer cette propriete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Clicker sur supprimer enlevera toute information concernant cette
            propriete de nos serveur
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogueClose}>Retourner</Button>
          <Button onClick={onDeleteProperty} autoFocus sx={{ color: 'red' }}>
            <span className='mr-1'>Supprimer</span>
            {loading && <CircularProgress size={25} />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function MyProperties() {
  const onDeleteProperty = async e => {
    e.preventDefault();
    // get btn
    const btn = e.target.closest('button');
    // stop
    if (!btn) return;
    // send delete request for this property
    await dispatch(deleteMyProperty(deletedId));
    // close modal
    setOpen(false);
    // show success message
    setSuccessMsg('Propriete supprimer avec success');
  };

  // id of property to delete
  const [deletedId, setDeletedId] = useState('');

  const [open, setOpen] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onDialogueOpen = e => {
    e.preventDefault();
    // get btn
    const btn = e.target.closest('button');
    console.log(btn);
    if (!btn) return;
    // set id to identify property being removed
    setDeletedId(btn.dataset.propertyId);
    // open dialogue to confirm deletion
    setOpen(true);
  };

  const onDialogueClose = () => {
    // reset delete id when modal gets closed
    setDeletedId('');
    // close modal
    setOpen(false);
  };

  const dispatch = useDispatch();
  //  My properties
  const { loading, properties, error } = useSelector(selectMyProperties);

  console.log(properties);

  return (
    <div className='account__properties' id='my-properties'>
      {successMsg && (
        <Alert variant='filled' severity='success'>
          {successMsg}
        </Alert>
      )}
      {errorMsg && (
        <Alert variant='filled' severity='success'>
          {errorMsg}
        </Alert>
      )}
      {/* Acknowlede Property Deletion Modal */}
      <AcknowledgeDeletion
        {...{ open, onDeleteProperty, onDialogueClose, deletedId, loading }}
      />
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
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            },
            modules: [Navigation],
          }}
        >
          {properties.map(property => (
            <SwiperSlide className='h-auto' key={property.id}>
              {property.published ? (
                <Published {...{ ...property, onDialogueOpen }} />
              ) : (
                <UnPublished {...{ ...property, onDialogueOpen }} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MyProperties;
