import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProperty } from '../features/Properties/propertySlice';

/* this hook checks if a property exists (thruthy) if it does we nothing, if not we fetch it */
const useExistOrFetch = (property, propertyId = '') => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property) {
      dispatch(fetchProperty(propertyId));
    }
  }, []);
};

export default useExistOrFetch;
