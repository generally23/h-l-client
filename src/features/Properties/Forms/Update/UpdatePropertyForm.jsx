import React, { useState } from 'react';
import { usePropertyForm } from '../../../../hooks/usePropertyForm';
import { useDispatch, useSelector } from 'react-redux';
import Basic from '../Post/Steps/Basic';
import Area from '../Post/Steps/Area';
import Interior from '../Post/Steps/Interior';
import Location from '../Post/Steps/Location';
import Images from '../Post/Steps/Images';
import Preview from '../Post/Steps/Preview';

const UpdatePropertyForm = ({ property }) => {
  console.log('Property to update', property);

  const {
    title,
    price,
    description,
    tags,
    area,
    areaBuilt,
    yearBuilt,
    fenced,
    hasBathroom,
    hasGarage,
    hasCuisine,
    hasLivingRoom,
    hasDiningRoom,
    hasPool,
    rooms,
    externalBathrooms,
    internalBathrooms,
    address,
    uploadedFiles,
    setTitle,
    setPrice,
    setDescription,
    setTags,
    setArea,
    setAreaBuilt,
    setYearBuilt,
    setFenced,
    setHasBathroom,
    setHasGarage,
    sethasCuisine,
    setHasLivingRoom,
    setHasDiningRoom,
    setHasPool,
    setRooms,
    setExternalBathrooms,
    setInternalBathrooms,
    setAddress,
    setUploadedFiles,
  } = usePropertyForm(property);

  const handleSubmit = async e => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    // append images to the form
    uploadedFiles.forEach(image => formData.append('images', image));

    // set price
    const price = formData.get('price');
    // price is formatted to help w readability unformat it
    const priceNum = price.split('.').join('');
    // modify price to raw
    formData.set('price', priceNum);
    // set the location for the form data
    const location = {
      coordinates: [longitude, latitude],
    };

    formData.set('location', JSON.stringify(location));

    // send data to server to create a new property
    // dispatch(createProperty(formData));
  };

  const onPrevStep = e => {
    setCurrentStep(currentStep - 1);
  };

  const onLocationSuccess = ({ coords }) => {
    setLongitude(coords.longitude);
    setLatitude(coords.latitude);
  };
  const onLocationError = error => {
    setErrMsg('Please provide your GPS Location');
  };

  const { account } = useSelector(state => state.authentication);

  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  const type = property.type;

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  console.log('Tags: ', tags);

  const [errMsg, setErrMsg] = useState('');

  return (
    <form
      className='property-form p-5 md:p-10 bg-neutral-100 m-5 md:m-20 rounded-md drop-shadow-lg'
      onSubmit={handleSubmit}
    >
      {/* Basic */}
      <Basic
        {...{
          type,
          title,
          price,
          description,
          tags,
          setTitle,
          setPrice,
          setDescription,
          setTags,
          currentStep,
          setCurrentStep,
        }}
      />

      {/* Area */}
      <Area
        {...{
          type,
          area,
          setArea,
          areaBuilt,
          setAreaBuilt,
          yearBuilt,
          setYearBuilt,
          fenced,
          setFenced,
          currentStep,
          onPrevStep,
          setCurrentStep,
        }}
      />

      {/* Interior */}
      {type === 'house' && (
        <Interior
          {...{
            hasBathroom,
            setHasBathroom,
            hasGarage,
            setHasGarage,
            hasCuisine,
            sethasCuisine,
            hasLivingRoom,
            setHasLivingRoom,
            hasDiningRoom,
            setHasDiningRoom,
            hasPool,
            setHasPool,
            rooms,
            setRooms,
            externalBathrooms,
            setExternalBathrooms,
            internalBathrooms,
            setInternalBathrooms,
            currentStep,
            onPrevStep,
            setCurrentStep,
          }}
        />
      )}

      {/* Location */}
      <Location
        {...{
          type,
          address,
          setAddress,
          currentStep,
          setCurrentStep,
          onPrevStep,
        }}
      />

      {/* Images */}
      {/* <Images
        {...{
          type,
          uploadedFiles,
          setUploadedFiles,
          currentStep,
          setCurrentStep,
          onPrevStep,
        }}
      /> */}

      {/* Preview */}
      {/* <Preview
        {...{
          currentStep,
          onPrevStep,
          data: {
            type,
            title,
            price,
            description,
            tags: tags.join(' '),
            area,
            areaBuilt,
            // yearBuilt,
            fenced,
            hasBathroom,
            hasGarage,
            hasCuisine,
            hasLivingRoom,
            hasDiningRoom,
            hasPool,
            rooms,
            externalBathrooms,
            internalBathrooms,
            address,
            images: uploadedFiles,
            owner: account,
          },
        }}
      /> */}
    </form>
  );
};

export default UpdatePropertyForm;
