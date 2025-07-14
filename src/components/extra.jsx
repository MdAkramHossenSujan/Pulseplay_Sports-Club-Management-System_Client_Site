import React, { useState } from 'react';
import imageone from '../assets/StackSlider/istockphoto-1403780865-612x612.jpg';
import imagetwo from '../assets/field.jpg';
import imagethre from '../assets/StackSlider/Untitled-design--10-.jpg';

const WhyPulsePlay = () => {
  const [activeImage, setActiveImage] = useState(2);

  const images = [
    {
      id: 1,
      src: imageone,
      mt: 'lg:mt-24',
      ml: '',
      mr: '',
    },
    {
      id: 2,
      src: imagetwo,
      mt: 'lg:-mt-48',
      ml: '',
      mr: 'lg:mr-30',
    },
    {
      id: 3,
      src: imagethre,
      mt: 'lg:-mt-62',
      ml: 'lg:ml-30',
      mr: '',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <section className="py-16 flex-1 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
            Why Choose PulsePlay
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Managing sports facilities shouldn’t be complicated. PulsePlay transforms how
            venues operate, helping you save time on admin and grow your business.
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Increase Revenue",
                desc: "Your venue can be booked 24/7 with online reservations, even while you sleep.",
              },
              {
                title: "Business Intelligence",
                desc: "Monitor key metrics like usage, occupancy, and sales with insightful reports.",
              },
              {
                title: "Easy Invoicing & Payments",
                desc: "Handle invoicing and accept payments seamlessly through our secure platform.",
              },
              {
                title: "Financial Reports",
                desc: "Track revenue, payments, and occupancy, simplifying your financial management.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-green-600 mb-2">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image stack */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 lg:gap-0 px-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`
              relative w-72 h-72 sm:w-80 sm:h-80 xl:w-96 xl:h-96
              ${image.mt} ${image.ml} ${image.mr}
              ${activeImage === image.id ? 'z-10 brightness-100 scale-105' : 'z-0 brightness-50 scale-100'}
              rounded-lg cursor-pointer transition-all duration-500 ease-in-out
            `}
            onClick={() => setActiveImage(image.id)}
          >
            <img
              src={image.src}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyPulsePlay;