import React, { useEffect, useState } from 'react';
import Properties from '../features/Properties/Properties';
import { fetchProperties } from '../features/Properties/propertiesSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const onLocationSuccess = ({ coords }) => {
    console.log('Location: ', coords);
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

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [Longitude, setLongitude] = useState(null);
  const [Latitude, setLatitude] = useState(null);

  // run once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  }, []);

  return (
    <main className='main p-5  md:p-12 lg:p-20'>
      {/* <div className='fixed bottom-0 h-20 bg-white rounded-md w-full z-50 left-1/2 -translate-x-1/2 flex items-center px-5'>
        <button className=''></button>
        <button className='bg-green-400 p-2.5 px-5 rounded-md'>Create</button>
      </div> */}
      <Properties />
    </main>
  );
}

export default Home;
