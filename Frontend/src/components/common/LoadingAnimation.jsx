import React, { useState, useEffect } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onLoadingComplete) onLoadingComplete();
            }, 500);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-container">
        <h1 className="logo">RescueGrid</h1>
        <p className="tagline">AI-Powered Disaster Coordination Platform</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;