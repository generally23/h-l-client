export const baseURL = 'http://localhost:9090/api/v1';
export const accountsURL = `${baseURL}/accounts`;
export const propertiesURL = `${baseURL}/properties`;
export const maxShownThumbnail = 3;

export const inputNames = {
  type: 'type',
  title: 'title',
  price: 'price',
  minPrice: 'price[gte]',
  maxPrice: 'price[gte]',
  description: 'description',
  tags: 'tags',
  area: 'area',
  minArea: 'area[gte]',
  maxArea: 'area[lte]',
  areaBuilt: 'areaBuilt',
  yearBuilt: 'yearBuilt',
  fenced: 'fenced',
  hasBathroom: 'hasBathroom',
  hasGarage: 'hasGarage',
  hasCuisine: 'hasCuisine',
  hasLivingRoom: 'hasLivingRoom',
  hasDiningRoom: 'hasDiningRoom',
  hasPool: 'hasPool',
  rooms: 'rooms',
  minRooms: 'rooms[gte]',
  externalBathrooms: 'externalBathrooms',
  internalBathrooms: 'internalBathrooms',
  minExternalBathrooms: 'externalBathrooms[gte]',
  minInternalBathrooms: 'internalBathrooms[gte]',
  address: 'address',
  location: 'location',
};

// export const uploadedFiles = ''
