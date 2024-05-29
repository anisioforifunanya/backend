'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const slides = [
    {
        image: "landingSlide1.jpg",
        desc: "Access everything from the comfort of your mobile phone"
    },
    {
        image: "landingSlide2.jpg",
        desc: "Organise meetups with friends, family and a whole community!"
    },
    {
        image: "landingSlide3.jpg",
        desc: "Share photo and video posts with the people you love"
    },
    {
        image: "landingSlide4.jpg",
        desc: "List your products and services on our market place"
    },
    {
        image: "landingSlide5.jpg",
        desc: "We've put in place anti-fraudulent measures for your safety, Rest Assured!"
    },
    {
        image: "landingSlide6.jpg",
        desc: "Explore a new way to post Job opportunities to your network"
    },
]

export default function Slider() {
    const [slideCount, setSlideCount] = useState(2.5)
    useEffect(()=>{
        setSlideCount((window.innerWidth > 800)? 2.5 : 1)
    }, [])
    return (
          <Swiper
            style={{ width: '80vw', margin: "0", height: "100%" }} // Add this line
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={50}
            effect="coverflow" 
            centeredSlides="false" // used to center the active slide
            slidesPerView={slideCount} // number of slides per view
            loop="true" // sets the slides on a continuous loop
            // pagination={{ clickable: true }} // allows for pagination bullets to be dynamic and clickable
            coverflowEffect={{
            rotate: 20, // slide rotation degree
            // stretch: 25, // stretches the space between the slides in px
            depth: 250, // offsets the depth of neighboring slides
            modifier: 1, // effect multiplier
            slideShadows: true, // disables the shadow around the slide container
            }}
        navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        }}>
            {slides.map( ({image, desc}) => (
                <SwiperSlide key={image}>
                    <Image src={`/img/${image}`} alt="Slide 1" width={500} height={500} />
                    <p className='text-lg'>{desc}</p>
                </SwiperSlide>
            ))}
            <div className="swiper_nav">
                <div className="swiper-button-next">
                    <BsArrowRight />
                </div>
                <div className="swiper-button-prev">
                    <BsArrowLeft />
                </div>
            </div>
        </Swiper>
    )
}
