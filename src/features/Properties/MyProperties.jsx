import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function MyProperties() {
  const swiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    pagination: {
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    lazy: 'true',
    navigation: true,
    modules: [Pagination, Navigation],
  };

  return (
    <div className='account__properties' id='my-properties'>
      <h1 className='account__properties__label text-3xl font-bold mb-10 text-center'>
        Mes Propriétés
      </h1>

      {/* Account Properties Carousel */}
      <div className='account__properties__content'>
        <Swiper className='mySwiper' {...swiperOptions}>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='bg-slate-500'>
              <div className='account__properties__property__thumbnail h-52'></div>
              <div className='account__properties__property__action'>
                <button className='block w-full p-2 bg-blue-500'>
                  Manager
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MyProperties;
