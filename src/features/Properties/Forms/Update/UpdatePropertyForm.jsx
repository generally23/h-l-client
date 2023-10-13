import React, { useState } from 'react';
import { usePropertyForm } from '../../../../hooks/usePropertyForm';
import { useDispatch, useSelector } from 'react-redux';
import Basic from '../Post/Steps/Basic';
import Area from '../Post/Steps/Area';
import Interior from '../Post/Steps/Interior';
import Location from '../Post/Steps/Location';
import Images from '../Post/Steps/Images';
import Preview from '../Post/Steps/Preview';
import {
  addPropertyImages,
  deleteMyPropertyImages,
  updateMyProperty,
} from '../../myPropertiesSlice';

const UpdatePropertyForm = ({ property }) => {
  console.log('Property to update', property);

  const inputs = usePropertyForm(property);

  const handleSubmit = async e => {
    // stop default behavior
    e.preventDefault();

    const {
      id,
      type,
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
      location,
    } = inputs;

    // create property object
    const propertyData = {
      id,
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

    // send data to server to update property

    const { payload: updatedProperty } = await dispatch(
      updateMyProperty(propertyData)
    );

    console.log(updatedProperty);

    // only try to delete images if user remove them
    if (deletes.length) {
      await dispatch(
        deleteMyPropertyImages({ id: updatedProperty.id, names: deletes })
      );
    }

    console.log('Deletes: ', deletes, 'Uploads', images);

    // form data to upload new images
    const formData = new FormData();

    // images/uploadedFiles contain existing files filter those out
    images.forEach(image => {
      // file is an upload append to the form
      if (image.$fileType === 'upload') formData.append('images', image);
    });

    // send the form data and add these new images
    dispatch(
      addPropertyImages({
        url: `http://localhost:9090/api/v1/properties/${updatedProperty.id}/images`,
        data: formData,
      })
    );
  };

  const onPrevStep = e => {
    setCurrentStep(currentStep - 1);
  };

  const onLocationSuccess = ({ coords }) => {
    const { setLocation } = inputs;

    const userLocation = { coordinates: [coords.longitude, coords.latitude] };

    setLocation(userLocation);
  };
  const onLocationError = error => {
    setErrMsg('Please provide your GPS Location');
  };

  const { account } = useSelector(state => state.authentication);

  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  const [deletes, setDeletes] = useState([]);

  const [errMsg, setErrMsg] = useState('');

  return (
    <form
      className='property-form p-5 md:p-10 bg-neutral-100 m-5 md:m-20 rounded-md drop-shadow-lg'
      onSubmit={handleSubmit}
    >
      {/* Basic */}
      <Basic
        {...{
          currentStep,
          setCurrentStep,
          ...inputs,
        }}
      />

      {/* Area */}
      <Area
        {...{
          currentStep,
          onPrevStep,
          setCurrentStep,
          ...inputs,
        }}
      />

      {/* Interior */}
      {property.type === 'house' && (
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
          currentStep,
          setCurrentStep,
          onPrevStep,
          ...inputs,
        }}
      />

      {/* Images */}
      <Images
        {...{
          currentStep,
          setCurrentStep,
          onPrevStep,
          deletes,
          setDeletes,
          ...inputs,
        }}
      />

      {/* Preview */}
      <Preview
        {...{
          currentStep,
          onPrevStep,
          inputs,
        }}
      />
    </form>
  );
};

export default UpdatePropertyForm;
