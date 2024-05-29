'use client'
import React, { useRef } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateShort } from '@/utils/stringHelperFuncts';
import { useRouter } from 'next/navigation'


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../../styles/EventsSlider.css';

import {EffectFade, Keyboard, Navigation, Autoplay, Pagination } from 'swiper/modules';

export default function EventSlider({ slides }) {
  const { push } = useRouter()
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className='sliderContainer'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        keyboard={{enabled: true}}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{clickable: true}}
        loop="true"
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }}
        modules={[EffectFade, Keyboard, Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {slides && slides.length === 0 ? <SwiperSlide>
            <div className='event_slide cursor-pointer'>
              <img src='https://placehold.co/600x400/EEE/31343C?font=raleway&text=No%20events%20to%20show' alt='placeholder' height={800} width={1200} />
            </div>
        </SwiperSlide> : null}
        {slides.filter(slide => slide.picture? true : false ).map( slide =>(
            <SwiperSlide key={slide?.id}>
                <div className='event_slide cursor-pointer' onClick={()=> push(`/home/events/${slide?.id}`)}>
                    <img src={slide?.picture} alt={slide?.title} height={800} width={1200} />
                    <div>
                        <div className="flex justify-between items-center">
                            <p className='text-2xl font-bold leading-none'>{slide?.title}</p>
                            <p className='text-2xl font-bold rounded-lg p-2 text-center bg-red-700 text-white'>{formatDateShort(slide?.date)}</p>
                        </div>
                        <p className='truncate'>{slide.organizer}</p>
                        <hr className="pb-1" />
                        <div className='flex justify-between'>
                          <p>{slide?.location}</p>
                          <p>
                                {slide.tags?.map((tag, index) => (
                                    <React.Fragment key={index}>
                                        <span className=' font-semibold text-sm px-1 text-red-800 bg-white rounded w-fit'>{tag}</span>
                                        {" "}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </ div>
  );
}