import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LinkItem } from '../types';
import { audioService } from '../services/audioService';

interface LinkCardProps {
  link: LinkItem;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
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
        bg-gray-900/40 backdrop-blur-xl 
        border border-white/5 rounded-2xl
        shadow-lg shadow-black/10
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:bg-gray-800/60 hover:border-white/20
        hover:shadow-indigo-500/20 hover:shadow-xl
        active:scale-[0.98]
        overflow-hidden
      `}
    >
      {/* Dynamic Glow Effect based on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer`} />

      <div className="flex items-center gap-5 z-10">
        {Icon && (
          <div className={`
            p-3 rounded-xl bg-white/5 text-gray-300
            group-hover:bg-indigo-500 group-hover:text-white
            transition-colors duration-300 shadow-inner
          `}>
            <Icon size={22} strokeWidth={1.5} />
          </div>
        )}
        <span className="font-medium text-lg text-gray-100 group-hover:text-white transition-colors tracking-tight">
          {link.title}
        </span>
      </div>

      <div className="text-gray-500 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
        <ArrowUpRight size={20} strokeWidth={2} />
      </div>
    </a>
  );
};