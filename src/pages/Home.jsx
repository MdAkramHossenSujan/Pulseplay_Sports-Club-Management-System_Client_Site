import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import AboutClub from '../components/Aboutme';
import CourtMapImage from '../components/CourtMap';
import PopularGames from '../components/PopularGames';
import HowPulsePlayWorks from '../components/HowPulsePlayWorks';
import WhyPulsePlay from '../components/WhyPulsePlay';
import Coupons from '../components/Coupons';
import Review from '../components/Review';
import ContactUs from '../components/ContactUs';

const Home = () => {
    useEffect(() => {
        document.title = `Home | PulsePlay`; 
        window.scrollTo(0, 0); 
      }, []);
    return (
        <div>
           <div>
            <Banner/>
           </div>
           <div>
            <AboutClub/>
           
           </div>
           <div>
            <HowPulsePlayWorks/>
           </div>
           <div>
            <CourtMapImage/>
           </div>
           <div>
            <PopularGames/>
           </div>
           <div>
            <WhyPulsePlay/>
           </div>
           <div>
            <Coupons/>
           </div>
           <div>
            <Review/>
           </div>
           <div>
            <ContactUs/>
           </div>
        </div>
    );
};

export default Home;