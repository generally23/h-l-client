import React, { useEffect } from 'react';
import Properties from '../features/Properties/Properties';
import { fetchProperties } from '../features/Properties/propertiesSlice';
import { useDispatch } from 'react-redux';

function Home() {
  const onLocationSuccess = ({ coords }) => {
    const Latitude = coords.latitude;
    const Longitude = coords.longitude;
    dispatch(
      fetchProperties({
        headers: { Longitude, Latitude },
      })
    );
  };
  const onLocationError = error => {
    console.error(error);
    dispatch(fetchProperties('http://localhost:9090/api/v1/properties'));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      <main className='mx-5 my-8 md:my-12 lg:mx-16'>
        <Properties />
      </main>
    </>
  );
}

export default Home;
