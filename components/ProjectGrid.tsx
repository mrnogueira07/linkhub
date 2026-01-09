import React from 'react';
import { Construction } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectGridProps {
  projects: ProjectItem[];
  isDarkMode?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isDarkMode = true }) => {
  return (
    <div className="w-full mt-16 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-8">
        <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-orange-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-orange-300 to-transparent'}`} />
        <h2 className={`text-2xl font-bold bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-orange-200 via-white to-orange-200' : 'bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700'}`}>
          Projetos
        </h2>
        <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-orange-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-orange-300 to-transparent'}`} />
      </div>

      <div className={`
        group relative w-full py-16 px-6 text-center rounded-3xl border border-dashed backdrop-blur-md flex flex-col items-center justify-center gap-6 overflow-hidden transition-all duration-500
        ${isDarkMode 
          ? 'bg-gray-900/30 border-gray-700 hover:border-orange-500/30' 
          : 'bg-white/50 border-orange-200 hover:border-orange-400'}
      `}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className={`
          relative z-10 p-5 rounded-full ring-1 ring-inset transition-transform duration-500 group-hover:scale-110
          ${isDarkMode 
            ? 'bg-gray-800/50 text-orange-400 ring-orange-500/20 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]' 
            : 'bg-orange-50 text-orange-600 ring-orange-200 shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]'}
        `}>
          <Construction size={40} strokeWidth={1.5} className="animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-sm mx-auto space-y-3">
          <h3 className={`text-lg font-semibold tracking-wide uppercase text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Em Breve Novidades
          </h3>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Estou preparando uma seleção especial dos meus melhores trabalhos. 
            Esta seção será atualizada em breve com novos projetos incríveis.
          </p>
        </div>
      </div>
    </div>
  );
};