import React from 'react';
import loadingAnimation from '../assets/Animation/Animation - 1751968204375_Loading.json'
import Lottie from 'lottie-react';
const LoadingMiddle = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh] w-full">
                    <Lottie
                        className="md:w-48 md:h-48 w-32 h-32"
                        animationData={loadingAnimation}
                        loop={true}
                    />
                </div>
    );
};

export default LoadingMiddle;