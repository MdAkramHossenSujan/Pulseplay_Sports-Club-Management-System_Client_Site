import React from 'react';
import Banner from '../components/Banner';
import AboutClub from '../components/Aboutme';
import CourtMapImage from '../components/CourtMap';
import PopularGames from '../components/PopularGames';

const Home = () => {
    return (
        <div>
           <div>
            <Banner/>
           </div>
           <div>
            <AboutClub/>
           
           </div>
           <div>
            <CourtMapImage/>
           </div>
           <div>
            <PopularGames/>
           </div>
        </div>
    );
};

export default Home;