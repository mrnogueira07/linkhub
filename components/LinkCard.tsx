import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LinkItem } from '../types';
import { audioService } from '../services/audioService';

interface LinkCardProps {
  link: LinkItem;
  isDarkMode?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, isDarkMode = true }) => {
  const Icon = link.icon;

  const handleMouseEnter = () => {
    audioService.playHoverSound();
  };

  const handleClick = () => {
    audioService.playClickSound();
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`
        group relative w-full flex items-center justify-between p-5 mb-4
        backdrop-blur-xl rounded-2xl border
        transition-all duration-300 ease-out
        hover:scale-[1.02] shadow-sm
        active:scale-[0.98]
        overflow-hidden
        ${isDarkMode 
          ? 'bg-gray-900/40 border-white/5 hover:bg-gray-800/60 hover:border-orange-500/30 hover:shadow-orange-900/20' 
          : 'bg-white/80 border-gray-200 hover:bg-white hover:border-orange-400/50 hover:shadow-orange-200/50'}
      `}
    >
      {/* Dynamic Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:animate-shimmer
        bg-gradient-to-r from-transparent via-orange-500/10 to-transparent
      `} />

      <div className="flex items-center gap-5 z-10">
        {Icon && (
          <div className={`
            p-3 rounded-xl transition-colors duration-300 shadow-inner
            ${isDarkMode 
              ? 'bg-white/5 text-gray-300 group-hover:bg-orange-600 group-hover:text-white' 
              : 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'}
          `}>
            <Icon size={22} strokeWidth={1.5} />
          </div>
        )}
        <span className={`
          font-medium text-lg transition-colors tracking-tight
          ${isDarkMode 
            ? 'text-gray-100 group-hover:text-white' 
            : 'text-gray-800 group-hover:text-black'}
        `}>
          {link.title}
        </span>
      </div>

      <div className={`
        transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5
        ${isDarkMode ? 'text-gray-500 group-hover:text-orange-400' : 'text-gray-400 group-hover:text-orange-500'}
      `}>
        <ArrowUpRight size={20} strokeWidth={2} />
      </div>
    </a>
  );
};