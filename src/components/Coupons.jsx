import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hooks/useAxios';
import { BadgePercent } from 'lucide-react';
import { Link } from 'react-router';

const Coupons = () => {
  const axiosInstance = useAxios();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coupons');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-700 dark:text-green-400">
        Loading coupons...
      </div>
    );
  }

  if (!coupons.length) {
    return (
      <div className="py-10 text-center text-gray-700 dark:text-green-400">
        No coupons available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-green-400 mb-10">
          Exclusive Coupons & Deals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="
                p-6
                rounded-2xl
                bg-white/60
                dark:bg-gray-800/40
                border
                border-gray-300
                dark:border-green-500/30
                backdrop-blur
                transition
                transform
                hover:scale-105
                hover:-translate-y-1
                duration-300
                shadow
                flex flex-col
                items-center
                text-center
              "
            >
              <BadgePercent
                className="
                  w-12 h-12 
                  text-gray-700 
                  dark:text-green-400
                  mb-4
                "
              />

              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-green-300">
                {coupon.couponName}
              </h3>

              <p className="text-gray-700 dark:text-green-300 text-2xl font-extrabold mt-2">
                {coupon.couponValue}% OFF
              </p>

              {coupon.description && (
                <p className="text-gray-600 dark:text-green-200 mt-3 text-sm">
                  {coupon.description}
                </p>
              )}

            <Link to={'/courts'}>
            <button className="
                mt-4
                px-4
                py-2
                bg-gray-700
                dark:bg-green-600
                hover:bg-gray-800
                dark:hover:bg-green-500
                text-white
                rounded-full
                transition
                duration-300
                transform
                cursor-pointer
                hover:-translate-y-1
              ">
                Grab Now
              </button>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;



