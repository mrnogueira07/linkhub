import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, Sun, Moon } from 'lucide-react';
import { Background } from './components/Background';
import { LinkCard } from './components/LinkCard';
import { ProjectGrid } from './components/ProjectGrid';
import { ShareModal } from './components/ShareModal';
import { audioService } from './services/audioService';
import { PROFILE, LINKS, PROJECTS, AMBIENT_MUSIC_URL } from './constants';

const App: React.FC = () => {
  // Check system preference or default to dark
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    // Trigger main entrance animation immediately on mount
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Initialize music if turning sound on for the first time
    if (!newMutedState) {
      audioService.initAmbientMusic(AMBIENT_MUSIC_URL);
    }
    
    audioService.setMuted(newMutedState);
    
    if (!newMutedState) {
      audioService.playClickSound();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    audioService.playClickSound();
  };

  const handleShareClick = () => {
    audioService.playClickSound();
    setIsShareModalOpen(true);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className={`
        relative min-h-screen font-inter selection:bg-orange-500 selection:text-white
        ${isDarkMode ? 'text-gray-100 animate-gradient-dark' : 'text-gray-900 animate-gradient-light bg-orange-50'}
        transition-colors duration-500
        flex flex-col items-center justify-center py-10
      `}>
        {/* Canvas Layer for Minimalist Shapes */}
        <Background isDarkMode={isDarkMode} />

        {/* Main Content Card */}
        <main className={`
          relative z-10 w-full max-w-[600px] mx-4 px-6 py-10 flex flex-col items-center
          rounded-[2.5rem] border shadow-2xl backdrop-blur-xl
          transition-all duration-1000 ease-out
          ${isDarkMode 
            ? 'bg-gray-950/40 border-white/10 shadow-black/20' 
            : 'bg-white/40 border-white/60 shadow-orange-500/10'}
          ${isReady ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}
        `}>
          
          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={toggleTheme}
              className={`
                p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-sm border
                ${isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border-white/10' 
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-orange-600 border-white/40'}
              `}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button 
              onClick={toggleMute}
              className={`
                p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-sm border
                ${isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border-white/10' 
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-orange-600 border-white/40'}
              `}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <button 
              onClick={handleShareClick}
              className={`
                p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-sm border
                ${isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border-white/10' 
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-orange-600 border-white/40'}
              `}
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-10 mt-6">
            <div className="relative group cursor-default">
              {/* Avatar Glow - Orange Theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img 
                src={PROFILE.avatarUrl} 
                alt={PROFILE.name} 
                className={`
                  relative w-32 h-32 rounded-full border-4 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105
                  ${isDarkMode ? 'border-gray-900' : 'border-white'}
                `}
              />
              {/* Status Indicator */}
              <div className={`
                absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 rounded-full z-20 animate-pulse
                ${isDarkMode ? 'border-gray-900' : 'border-white'}
              `}></div>
            </div>
            
            <h1 className={`mt-6 text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {PROFILE.name}
            </h1>
            <div className={`
              mt-3 px-4 py-1.5 rounded-full border inline-block backdrop-blur-sm
              ${isDarkMode 
                ? 'bg-orange-500/10 border-orange-500/20' 
                : 'bg-orange-100/50 border-orange-200'}
            `}>
              <p className="text-orange-500 font-bold tracking-wide text-[10px] uppercase">
                {PROFILE.role}
              </p>
            </div>
            <p className={`mt-4 max-w-sm leading-relaxed text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              {PROFILE.bio}
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full space-y-3">
            {LINKS.map((link) => (
              <LinkCard key={link.id} link={link} isDarkMode={isDarkMode} />
            ))}
          </div>

          {/* Projects Section */}
          <ProjectGrid projects={PROJECTS} isDarkMode={isDarkMode} />

          {/* Footer */}
          <footer className={`mt-16 text-center text-xs pb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
            <p className="mt-1 opacity-60">Link HUB</p>
          </footer>
        </main>

        {/* Share Modal */}
        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          url={window.location.href}
          title={`Confira o Link HUB de ${PROFILE.name}`}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default App;