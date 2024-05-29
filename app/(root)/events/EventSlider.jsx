'use client'
import React, { useRef } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './styles.css';

import {EffectFade, Keyboard, Navigation, Autoplay, Pagination } from 'swiper/modules';

import { formatDateShort, snakeToTitle, capitalize } from '@/utils/stringHelperFuncts';

export default function EventSlider({ slides, handleClick }) {
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
          disableOnInteraction: true,
        }}
        pagination={{clickable: true}}
        loop ={true}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }}
        modules={[EffectFade, Keyboard, Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <div className="swiper-button-next"><BsArrowRight /></div>
        <div className="swiper-button-prev"><BsArrowLeft /></div>
        {slides?.map( slide =>(
            <SwiperSlide key={slide.id}>
                <div className='event_slide cursor-pointer' onClick={()=>handleClick(slide.id)}>
                    <img src={slide.picture || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Event%20Pic'} alt={slide.title} height={800} width={1200}/>
                    <div className='relative'>
                        <p className='text-2xl font-bold'>{capitalize(slide.title)}</p>
                        <p className='font-bold text-sm px-1 text-black bg-yellow-400 rounded w-fit'>{snakeToTitle(slide.category)}</p>
                        <p>{slide?.description?.slice(0, 100) + '...'}</p>
                        <hr />
                        <div className='flex gap-2'>
                          <p>{slide.location}</p>
                        </div>
                        <p className='event_date_badge absolute right-[100px] bottom-[80px] p-3 rounded-lg bg-red-800 font-semibold text-2xl'>{formatDateShort(slide.date)}</p>
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