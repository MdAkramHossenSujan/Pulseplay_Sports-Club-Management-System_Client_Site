import React from 'react';
import { Link, useRouteError } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/Animation/Lonely 404.json';

const ErrorPage = () => {
    const error=useRouteError()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md mx-auto">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-300 mt-8">
        {error?.error?.message}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-4 text-center max-w-xl">
        Sorry, the page you’re looking for doesn’t exist or has been moved. Let’s get you back home!
      </p>

      <Link
        to="/"
        className="
          mt-6
          inline-block
          px-6
          py-3
          rounded-full
          text-white
          bg-gray-700
          dark:bg-green-600
          hover:bg-gray-800
          dark:hover:bg-green-500
          transition
          duration-300
        "
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
