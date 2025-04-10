import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import rescueAnimation from '../../assets/animations/rescue-animation.json';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingProgress >= 100) {
      // Wait for 1 second to show the completed state before hiding
      const timeout = setTimeout(() => {
        // Start exit animation
        setShowAnimation(false);
        
        // Wait for exit animation to complete
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 1000);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [loadingProgress, onLoadingComplete]);

  const handleAnimationClick = () => {
    // Add some interactivity - speed up the animation on click
    if (animationRef.current) {
      animationRef.current.setSpeed(animationRef.current.animationSpeed === 1 ? 2 : 1);
    }
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    document.querySelector('.loading-container').appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <div className={`loading-screen ${showAnimation ? 'active' : 'fade-out'}`}>
      <div className="loading-container" onClick={handleAnimationClick}>
        <div className="animation-wrapper">
          <Lottie 
            animationData={rescueAnimation} 
            loop={true}
            lottieRef={animationRef}
            className="rescue-animation"
          />
        </div>
        
        <div className="loading-text">
          <h1>RescueGrid</h1>
          <p>AI-Powered Disaster Coordination Platform</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(loadingProgress)}%</div>
        </div>
        
        <div className="interactive-hint">
          <span className="pulse"></span>
          Click Animation For Interaction
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;