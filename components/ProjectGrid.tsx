import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';
import { audioService } from '../services/audioService';

interface ProjectGridProps {
  projects: ProjectItem[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="w-full mt-16 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent flex-1" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
          Projetos em Destaque
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            onMouseEnter={() => audioService.playHoverSound()}
            className="group relative bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/20"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section */}
              <div className="w-full md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Content Section */}
              <div className="p-7 md:w-3/5 flex flex-col justify-between relative z-10 bg-gradient-to-b from-transparent to-gray-900/50">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-indigo-200 border border-white/5 font-medium tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a 
                    href={project.demoUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => audioService.playClickSound()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform active:scale-95"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => audioService.playClickSound()}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 active:scale-95"
                      aria-label="View Code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};