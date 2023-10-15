import React, { useEffect } from 'react';
import Properties from '../features/Properties/Properties';
import { fetchProperties } from '../features/Properties/propertiesSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const onLocationSuccess = ({ coords }) => {
    const Latitude = coords.latitude;
    const Longitude = coords.longitude;
    dispatch(
      fetchProperties({
        url: `http://localhost:9090/api/v1/properties?${searchParams.toString()}`,
        headers: { Longitude, Latitude },
      })
    );
  };
  const onLocationError = error => {
    dispatch(
      fetchProperties({
        url: `http://localhost:9090/api/v1/properties?${searchParams.toString()}`,
      })
    );
  };

  // run once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  }, []);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  // console.log(searchParams.toString());

  return (
    <main className='main p-5  md:p-12 lg:p-14'>
      <Properties />
    </main>
  );
}

export default Home;
