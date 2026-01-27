import React, { useState, useMemo } from 'react';
import { Construction, Folder, Code, Gamepad2, Palette, Video, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import { audioService } from '../services/audioService';

interface ProjectGridProps {
  projects: ProjectItem[];
  isDarkMode?: boolean;
  onProjectClick: () => void; // New prop for handling clicks
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isDarkMode = true, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(projects.map(p => p.category || 'Outros')));
    return ['Todos', ...uniqueCats.sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') return projects;
    return projects.filter(p => (p.category || 'Outros') === activeCategory);
  }, [projects, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    audioService.playClickSound();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    audioService.playClickSound();
    onProjectClick(); // Trigger the warning
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Todos': return Layers;
      case 'Desenvolvimento Web': return Code;
      case 'Desenvolvimento de Jogos': return Gamepad2;
      case 'Design': return Palette;
      case 'Vídeos Edit': return Video;
      default: return Folder;
    }
  };

  return (
    <div className="w-full mt-16 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-300 to-transparent'}`} />
        <h2 className={`text-2xl font-bold bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-purple-200 via-white to-purple-200' : 'bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700'}`}>
          Projetos
        </h2>
        <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-300 to-transparent'}`} />
      </div>

      {/* Category Tabs / Folders */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat);
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border
                ${isActive 
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/25 scale-105' 
                  : isDarkMode
                    ? 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                    : 'bg-white/50 text-gray-600 border-gray-200 hover:bg-white hover:text-purple-600'
                }
              `}
            >
              <Icon size={14} />
              {cat}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className={`
          group relative w-full py-16 px-6 text-center rounded-3xl border border-dashed backdrop-blur-md flex flex-col items-center justify-center gap-6 overflow-hidden transition-all duration-500
          ${isDarkMode 
            ? 'bg-gray-900/30 border-gray-700 hover:border-purple-500/30' 
            : 'bg-white/50 border-purple-200 hover:border-purple-400'}
        `}>
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className={`
            relative z-10 p-5 rounded-full ring-1 ring-inset transition-transform duration-500 group-hover:scale-110
            ${isDarkMode 
              ? 'bg-gray-800/50 text-purple-400 ring-purple-500/20 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]' 
              : 'bg-purple-50 text-purple-600 ring-purple-200 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]'}
          `}>
            <Construction size={40} strokeWidth={1.5} className="animate-pulse" />
          </div>
          
          <div className="relative z-10 max-w-sm mx-auto space-y-3">
            <h3 className={`text-lg font-semibold tracking-wide uppercase text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Nenhum projeto nesta categoria
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Em breve adicionarei trabalhos de {activeCategory}.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
             <a 
               key={project.id}
               href={project.demoUrl}
               onClick={handleCardClick} // Intercept click here
               className={`
                 group relative flex flex-col p-4 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                 hover:-translate-y-2 hover:shadow-xl cursor-pointer
                 ${isDarkMode 
                   ? 'bg-gray-900/40 border-white/10 hover:border-purple-500/30 hover:shadow-purple-500/10' 
                   : 'bg-white/60 border-purple-100 hover:border-purple-300 hover:shadow-purple-200/20'}
               `}
             >
               <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                 <img 
                   src={project.imageUrl} 
                   alt={project.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                 
                 {/* Category Badge on Card */}
                 <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-black/60 text-white backdrop-blur-sm border border-white/10">
                      {project.category}
                    </span>
                 </div>
               </div>
               
               <h3 className={`font-bold text-lg mb-1 transition-colors ${isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-700'}`}>{project.title}</h3>
               <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
               
               <div className="flex flex-wrap gap-2 mt-auto">
                 {project.tags.map(tag => (
                   <span key={tag} className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${isDarkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:border-purple-500/40' : 'bg-purple-50 border-purple-200 text-purple-600 group-hover:border-purple-300'}`}>
                     {tag}
                   </span>
                 ))}
               </div>
             </a>
          ))}
        </div>
      )}
    </div>
  );
};