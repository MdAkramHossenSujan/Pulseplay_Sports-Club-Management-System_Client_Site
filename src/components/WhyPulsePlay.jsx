import React, { useState } from 'react';
import imageone from '../assets/StackSlider/istockphoto-1403780865-612x612.jpg';
import imagetwo from '../assets/field.jpg';
import imagethre from '../assets/StackSlider/Untitled-design--10-.jpg';

const WhyPulsePlay = () => {
    const [activeImage, setActiveImage] = useState(2);
    const advantages = [
        {
          title: "Increase Revenue",
          desc: "Boost your earnings with 24/7 online bookings, dynamic pricing, and promotions that keep your courts busy even outside regular hours.",
        },
        {
          title: "Business Intelligence",
          desc: "Track usage, occupancy, and revenue with clear analytics to help you make smarter decisions and optimize your operations.",
        },
        {
          title: "Easy Invoicing & Payments",
          desc: "Streamline your finances by creating invoices and accepting secure payments effortlessly, reducing manual work and errors.",
        },
        {
          title: "Financial Reports",
          desc: "Get detailed financial reports that simplify tracking income, expenses, and occupancy, helping you plan your growth confidently.",
        },
      ];
      
      
    const images = [
        {
            id: 1,
            src: imageone,
            smMd: '',
            lg: 'xl:mt-24 lg:mt-18',
        },
        {
            id: 2,
            src: imagetwo,
            smMd: 'md:-mt-24 md:-ml-24 -ml-12 -mt-16',
            lg: 'xl:-mt-68 xl:-ml-34 lg:-mt-48',
        },
        {
            id: 3,
            src: imagethre,
            smMd: 'md:-ml-24 -ml-12',
            lg: 'xl:-mt-72 xl:ml-48 lg:-mt-48 lg:ml-28',
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-14 md:gap-24 lg:gap-6 max-w-7xl mx-auto px-6 py-12">
            <section className="flex-1 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-gray-200 mb-8">
                        Why Choose PulsePlay
                    </h2>

                    <p className=" text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
                        Managing sports facilities shouldn’t be complicated. PulsePlay transforms how
                        venues operate, helping you save time on admin and grow your business.
                    </p>

                    <div className="space-y-6">
                        {advantages.map(({ title, desc }) => (
                            <div
                                key={title}
                                className="p-6 rounded-lg shadow hover:shadow-md border border-gray-500 dark:border-gray-400 transition"
                            >
                                <h3 className="text-xl font-bold text-green-600 mb-2">{title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image stack */}
            <div className="
        relative flex-1
        flex flex-row items-center justify-center
        flex-wrap
        lg:flex-col lg:gap-0
        px-4
      ">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`
              relative
              w-32 h-32
              sm:w-48 sm:h-48
              md:w-72 md:h-72
              xl:w-96 xl:h-96
              ${image.smMd}
              ${image.lg}
              ${activeImage === image.id
                                ? 'z-10 brightness-100 scale-105'
                                : 'z-0 brightness-50 scale-100'}
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


