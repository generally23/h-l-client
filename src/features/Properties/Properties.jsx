import React from 'react';
import { useSelector } from 'react-redux';
import { selectProperties } from './propertiesSlice';
import Property from './Property';
import { Grid } from '@mui/material';
import ControlForm from './Forms/Get/ControlForm';
import PropertySkeleton from './PropertySkeleton';

function Properties() {
  // contains result from fetching properties, includes properties and pagination etc...
  const { properties, loading } = useSelector(selectProperties);

  const propertiesList = properties?.docs || [];

  const propertiesJsx = propertiesList.map(property => (
    <Property key={property.id} property={property} />
  ));

  return (
    <>
      {/* {propertiesList.length ? <ControlForm></ControlForm> : null} */}
      <ControlForm></ControlForm>
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {loading ? <PropertySkeleton /> : propertiesJsx}
      </Grid>
    </>
  );
}

export default Properties;
