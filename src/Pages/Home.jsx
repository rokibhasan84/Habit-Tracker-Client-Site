import React from 'react';
import HeroSlider from '../Component/HeroSlider';
import HomeCard from '../Component/HomeCard';
import WhyBuildHabits from '../Component/WhyBuildHabits';
import ExtraSection from '../Component/ExtraSection';

const Home = () => {
  return (
    <div className='max-w-6xl mx-auto py-15 px-4'>
      <HeroSlider></HeroSlider>
      <HomeCard></HomeCard>
      <WhyBuildHabits></WhyBuildHabits>
      <ExtraSection></ExtraSection>



    </div>
  );
};

export default Home;