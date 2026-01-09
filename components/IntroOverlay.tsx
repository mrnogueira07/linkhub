import React, { useEffect, useState } from 'react';
import { PROFILE } from '../constants';

interface IntroOverlayProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete, isDarkMode }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately (avatar pop)
    setTimeout(() => setShowContent(true), 100);

    // Start exit animation after 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Complete (unmount) after animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isExiting ? '-translate-y-full' : 'translate-y-0'}
        ${isDarkMode ? 'bg-gray-950' : 'bg-orange-50'}
      `}
    >
      <div className={`
        relative flex flex-col items-center
        transition-all duration-700 delay-100
        ${showContent ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'}
        ${isExiting ? 'opacity-0 scale-95' : ''}
      `}>
        {/* Pulsing Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-orange-500/30 animate-[ping_2s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-orange-500/10 animate-[ping_2s_ease-in-out_infinite_delay-300]" />

        {/* Main Avatar */}
        <div className="relative z-10 p-2 rounded-full border-2 border-orange-500/50 backdrop-blur-md">
          <img 
            src={PROFILE.avatarUrl} 
            alt="Logo" 
            className="w-24 h-24 rounded-full object-cover shadow-2xl"
          />
        </div>

        {/* Text */}
        <div className="mt-8 text-center space-y-2">
          <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Link<span className="text-orange-500">HUB</span>
          </h1>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
          <p className={`text-sm tracking-widest uppercase opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Carregando Experiência
          </p>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-12 w-48 h-1 bg-gray-200/20 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 animate-[loading_2.5s_ease-in-out_forwards]" style={{ width: '0%' }} />
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};