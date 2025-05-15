import React from 'react';
import HeroSection from '../Components/Main/HeroSection';
import ReservationSection from '../Components/Main/ReservationSection';
import MenuHighlight from '../Components/Main/MenuHighlight';
import HeroVideo from '../Components/Main/hero_video';
import Reviews from '../Components/Main/Reviews';

const Home = () => (
  <>
    <HeroSection />
    <HeroVideo/>
    <ReservationSection />
    <MenuHighlight />
    <Reviews />
  </>
);
export default Home;
