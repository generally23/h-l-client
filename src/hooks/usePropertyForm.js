import dayjs from 'dayjs';
import { useState } from 'react';

export const usePropertyForm = property => {
  // make sure property is not null or undefined
  property = property ? property : {};

  // Basic Step State
  const [type, setType] = useState(property.type || '');
  const [title, setTitle] = useState(property.title || '');
  const [price, setPrice] = useState(property.price || 0);
  const [description, setDescription] = useState(property.description || '');
  const [tags, setTags] = useState(property.tags || []);

  // Area Step State
  const [area, setArea] = useState(property.area || '');
  const [areaBuilt, setAreaBuilt] = useState(property.areaBuilt || '');

  const [yearBuilt, setYearBuilt] = useState(
    dayjs(property.yearBuilt ? `${property.yearBuilt}-01-01` : new Date())
  );
  const [fenced, setFenced] = useState(property.fenced || false);

  // Interior Step State

  // checkboxes

  // check to see if internal or external bathrooms are thruthy (v > 0) then this property has Bathrooms
  const bathroom = !!property.externalBathrooms || !!property.internalBathrooms;
  const [hasBathroom, setHasBathroom] = useState(bathroom || false);
  const [hasGarage, setHasGarage] = useState(property.hasGarage || false);
  const [hasCuisine, sethasCuisine] = useState(property.hasCuisine || false);
  const [hasLivingRoom, setHasLivingRoom] = useState(
    property.hasLivingRoom || false
  );
  const [hasDiningRoom, setHasDiningRoom] = useState(
    property.hasDiningRoom || false
  );
  const [hasPool, setHasPool] = useState(property.hasPool || false);

  // Values
  const [rooms, setRooms] = useState(property.rooms || 1);
  const [externalBathrooms, setExternalBathrooms] = useState(
    property.externalBathrooms || 0
  );
  const [internalBathrooms, setInternalBathrooms] = useState(
    property.internalBathrooms || 0
  );

  // Location Step State
  const [address, setAddress] = useState(property.address || '');
  const [location, setLocation] = useState(property.location || null);

  // Images Step
  const [uploadedFiles, setUploadedFiles] = useState(property.images || []);

  return {
    id: property.id,
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
    location,
    uploadedFiles,
    setType,
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
    setLocation,
    setUploadedFiles,
  };
};
