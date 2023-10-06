import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectMyProperties } from '../features/Properties/myPropertiesSlice';
import ErrorAlert from '../customComponents/ErrorAlert';
import useExistOrFetch from '../hooks/useExistOrFetch';
import { selectProperty } from '../features/Properties/propertySlice';
import UpdatePropertyForm from '../features/Properties/Forms/Update/UpdatePropertyForm';

const UpdateProperty = () => {
  const { propertyId } = useParams();

  // Chanches are property with this ID is still in our redux store if browser was not reloaded
  // Try using that first
  const myProperties = useSelector(selectMyProperties);

  const myLocalProperty = myProperties.properties.find(
    property => property.id === propertyId
  );

  useExistOrFetch(myLocalProperty, propertyId);

  const { property, loading, error } = useSelector(selectProperty);

  console.log('Property ID: ', propertyId);

  const renderedProperty = myLocalProperty || property;

  return (
    <main className='main'>
      {error && <ErrorAlert message={error.message} />}
      {renderedProperty && <UpdatePropertyForm property={renderedProperty} />}
    </main>
  );
};

export default UpdateProperty;
