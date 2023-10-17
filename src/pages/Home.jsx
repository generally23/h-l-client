import React, { useEffect, useState } from 'react';
import Properties from '../features/Properties/Properties';
import { fetchProperties } from '../features/Properties/propertiesSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const onLocationSuccess = ({ coords }) => {
    const { latitude } = coords;
    const { longitude } = coords;

    setLongitude(longitude);
    setLatitude(latitude);

    const queryString = searchParams.toString();

    dispatch(
      fetchProperties({
        queryString,
        headers: { longitude, latitude },
      })
    );
  };

  const onLocationError = error => {
    const queryString = searchParams.toString();
    dispatch(fetchProperties({ queryString }));
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

  const [Longitude, setLongitude] = useState(null);
  const [Latitude, setLatitude] = useState(null);

  // console.log(searchParams.toString());

  return (
    <main className='main p-5  md:p-12 lg:p-14'>
      <Properties />
    </main>
  );
}

export default Home;
