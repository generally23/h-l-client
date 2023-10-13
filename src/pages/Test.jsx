import React from 'react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Test({ children }) {
  return (
    <main className='main'>
      <Swiper
        className='mySwiper'
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={2}
      >
        <SwiperSlide className='h-auto'>
          <div className='slide bg-green-400 h-full'>
            <img
              className='block bg-cover h-full'
              src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hydsj'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className='h-auto'>
          <div className='slide bg-green-400 h-full'>
            <img
              className='block bg-cover h-full'
              src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hyhag'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className='h-auto'>
          <div className='slide bg-green-400 h-full'>
            <img
              className='block bg-cover h-full'
              src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hykx6'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className='h-auto'>
          <div className='slide bg-green-400 h-full'>
            <img
              className='block bg-cover h-full'
              src='https://d21jok9tqndbay.cloudfront.net/property-img-b3d7r71w4tlm6hypb0'
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
