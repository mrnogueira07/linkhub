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
        group relative w-full flex items-center justify-between p-4 mb-3
        backdrop-blur-md rounded-2xl border
        transition-all duration-300 ease-out
        hover:scale-[1.02] shadow-sm
        active:scale-[0.98]
        overflow-hidden
        ${isDarkMode 
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-purple-500/20' 
          : 'bg-white/60 border-white/40 hover:bg-white/80 hover:border-purple-300 hover:shadow-purple-200/40'}
      `}
    >
      {/* Dynamic Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:animate-shimmer
        bg-gradient-to-r from-transparent via-white/5 to-transparent
      `} />

      <div className="flex items-center gap-4 z-10">
        {Icon && (
          <div className={`
            p-2.5 rounded-xl transition-colors duration-300 shadow-sm
            ${isDarkMode 
              ? 'bg-white/5 text-gray-200 group-hover:bg-purple-600 group-hover:text-white' 
              : 'bg-white/80 text-purple-600 group-hover:bg-purple-500 group-hover:text-white'}
          `}>
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
        <span className={`
          font-medium text-base transition-colors tracking-tight
          ${isDarkMode 
            ? 'text-gray-100 group-hover:text-white' 
            : 'text-gray-800 group-hover:text-black'}
        `}>
          {link.title}
        </span>
      </div>

      <div className={`
        transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 p-1 rounded-full
        ${isDarkMode 
           ? 'text-gray-400 group-hover:text-white group-hover:bg-white/10' 
           : 'text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-100'}
      `}>
        <ArrowUpRight size={18} strokeWidth={2} />
      </div>
    </a>
  );
};