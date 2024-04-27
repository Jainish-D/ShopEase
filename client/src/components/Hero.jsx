import React from 'react';
import bgImage from '../assets/bgtop.jpg'; // Adjust the path accordingly

const Hero = () => {
  return (
    <div className="wall bg-blue-200 flex justify-between items-center">
      {/* Content */}
      <div className="desc px-8 py-6 text-black">
        <p className="heading text-4xl lg:text-5xl font-bold mb-4">Order groceries for delivery or pickup today</p>
        <p>Whatever you want from local stores, brought right to your door.</p>
      </div>
      {/* Background Image */}
      <div className="wallimg">
        <img src={bgImage} alt="" className="bgtop" />
      </div>
    </div>
  );
};

export default Hero;
