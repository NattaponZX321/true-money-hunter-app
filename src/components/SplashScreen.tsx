
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      <div className="flex flex-col items-center">
        <div className="animate-bounce-limited mb-4">
          <Logo />
        </div>
        <div className="mt-6">
          <div className="loading-spinner"></div>
        </div>
        <div className="mt-6 text-blue-400 animate-pulse text-sm">กำลังโหลด...</div>
      </div>
    </div>
  );
};

export default SplashScreen;
