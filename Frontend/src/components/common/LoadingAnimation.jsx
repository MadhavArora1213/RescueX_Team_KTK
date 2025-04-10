import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import rescueAnimation from '../../assets/animations/rescue-animation.json';

const LoadingAnimation = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Optional: You can add logic to track when animation is complete
    // For now we rely on the parent component to control the timing
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-64 h-64 mb-8">
        <Lottie
          animationData={rescueAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      <h1 className="text-3xl font-bold text-emergency-red mb-2">RescueGrid</h1>
      <p className="text-gray-600">Emergency Response Platform</p>
      <div className="mt-8 loader"></div>
    </div>
  );
};

export default LoadingAnimation;