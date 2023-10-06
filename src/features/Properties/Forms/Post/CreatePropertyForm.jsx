import React, { useEffect, useState } from 'react';
import Basic from './Steps/Basic';
import Area from './Steps/Area';
import Interior from './Steps/Interior';
import Images from './Steps/Images';
import Location from './Steps/Location';
import Preview from './Steps/Preview';
import { addPropertyImages, createProperty } from '../../myPropertiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePropertyForm } from '../../../../hooks/usePropertyForm';
import { selectFromObject, formDataToObject } from '../../../../utils';

function CreatePropertyForm({ type }) {
  const handleSubmit = async e => {
    // stop default behavior
    e.preventDefault();

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
      uploadedFiles: images,
    } = inputs;

    // build location object
    const location = {
      coordinates: [longitude, latitude],
    };

    // create property object
    const propertyData = {
      type,
      title,
      price,
      description,
      // tags is an array join all values
      tags: tags.join(' '),
      area,
      areaBuilt,
      // make sure to get the number since year built is an object
      yearBuilt: yearBuilt.$y,
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
      location,
    };

    console.log(propertyData);

    // send data to server to create a new property
    const { payload: property } = await dispatch(createProperty(propertyData));

    console.log(property);

    // upload images to server after property is created
    const imagesformData = new FormData();
    images.forEach(image => imagesformData.append('images', image));

    dispatch(
      addPropertyImages({
        url: `http://localhost:9090/api/v1/properties/${property.id}/images`,
        data: imagesformData,
      })
    );
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

  // const { account } = useSelector(state => state.authentication);

  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  /*  use this structure to create something like
      property = { location: { type: 'Point', coordinates: [ long, lat ] } }
  */

  const inputs = usePropertyForm();

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // try to get user's location
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  });

  return (
    <form
      className='property-form p-5 md:p-10 bg-neutral-100 m-5 md:m-20 rounded-md drop-shadow-lg'
      onSubmit={handleSubmit}
    >
      {/* Basic */}
      <Basic
        {...{
          type,
          currentStep,
          setCurrentStep,
          ...inputs,
        }}
      />

      {/* Area */}
      <Area
        {...{
          type,
          currentStep,
          onPrevStep,
          setCurrentStep,
          ...inputs,
        }}
      />

      {/* Interior */}
      {type === 'house' && (
        <Interior
          {...{
            currentStep,
            onPrevStep,
            setCurrentStep,
            ...inputs,
          }}
        />
      )}

      {/* Location */}
      <Location
        {...{
          type,
          currentStep,
          setCurrentStep,
          onPrevStep,
          ...inputs,
        }}
      />

      {/* Images */}
      <Images
        {...{
          type,
          currentStep,
          setCurrentStep,
          onPrevStep,
          ...inputs,
        }}
      />

      {/* Preview */}
      <Preview
        {...{
          currentStep,
          onPrevStep,
          ...inputs,
        }}
      />
    </form>
  );
}

export default CreatePropertyForm;
