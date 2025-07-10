import React from 'react';
import image from '../assets/Animation/Animation - 1751980631636_no_data.json'
import Lottie from 'lottie-react';
const NoData = () => {
    return (
        <div className="flex justify-center items-center">
        <Lottie
          className="md:h-84 md:w-84 h-36 w-36"
          animationData={image}
          loop={true}
        />
      </div>
      
    );
};

export default NoData;