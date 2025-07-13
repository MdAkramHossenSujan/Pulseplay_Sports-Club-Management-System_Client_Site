import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import image1 from '../assets/Banner/Background-dark.jpg';
import image2 from '../assets/Banner/Background-light.jpg';
import slider1 from '../assets/StackSlider/360_F_1512236850_gX8QRjaqdB8jaWDUc0k9fiq3un4gP2hE.jpg';
import slider2 from '../assets/StackSlider/basketball-1355340160.jpg';
import slider3 from '../assets/StackSlider/indoor-badminton-courts.jpg';
import slider4 from '../assets/StackSlider/pexels-onbab-32352504.jpg';
import slider5 from '../assets/StackSlider/pexels-vladimirsrajber-25287801.jpg';
import slider6 from '../assets/StackSlider/tt-1724328661096.webp';
import useAuth from '../hooks/useAuth';
import { Plus, Info } from "lucide-react";

const Banner = () => {
  const { theme } = useAuth();

  const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
    slider6,
  ];

  const background = theme === 'dark' ? image1 : image2;

  return (
    <div
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-offset="200"
    >
      {/* Background image */}
      <img
        src={background}
        alt="Background"
        className="absolute w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 lg:bg-black/10 dark:bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[1400px] px-6 py-12">
        
        {/* LEFT SIDE */}
        <div
          className="w-full lg:w-[60%] flex flex-col justify-center text-center lg:text-left p-8 mb-12 lg:mb-0"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <h1
            className="text-4xl md:text-5xl caveat-brush-regular font-extrabold text-gray-100 mb-6 leading-tight"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            Elevate Your Game at Our Sports Club
          </h1>

          <p
            className="text-gray-300 mb-8 xl:text-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            From premium courts to thrilling activities — join a club where passion meets performance.
            Book your session today and bring your best game forward!
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <button className="flex items-center justify-center gap-2 px-6 py-3 cursor-pointer text-green-400 hover:text-white border border-green-600 font-semibold rounded hover:bg-green-700 transition duration-300">
              <Plus size={18} /> Book Now
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 cursor-pointer border border-gray-300 text-gray-100 hover:bg-gray-200 hover:text-gray-800 font-semibold rounded transition duration-300">
              <Info size={18} /> Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="w-full lg:w-[40%] flex justify-center"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="1200"
        >
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-72 h-72 md:w-96 md:h-96"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="relative">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 dark:bg-black/30 bg-black/20 rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;










