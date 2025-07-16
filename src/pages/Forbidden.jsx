import React from 'react';
import Lottie from 'lottie-react';
import forbidden from '../assets/Animation/forbidden403.json';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <div className="w-full max-w-md">
        <Lottie animationData={forbidden} loop={true} />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mt-6">
        403 - Forbidden
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-4">
        Sorry, this page is restricted. Only specific can access it.
      </p>
    </div>
  );
};

export default Forbidden;
