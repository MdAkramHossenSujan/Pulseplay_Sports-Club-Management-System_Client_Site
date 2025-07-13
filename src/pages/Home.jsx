import React from 'react';
import Banner from '../components/Banner';
import AboutClub from '../components/Aboutme';

const Home = () => {
    return (
        <div>
           <div>
            <Banner/>
           </div>
           <div>
            <AboutClub/>
           
           </div>
        </div>
    );
};

export default Home;