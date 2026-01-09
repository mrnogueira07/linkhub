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

  // Initialize music on first user interaction
  const handleStart = () => {
    setIsMuted(false);
    setIsReady(true);
    audioService.initAmbientMusic(AMBIENT_MUSIC_URL);
    audioService.setMuted(false);
    audioService.playClickSound();
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioService.setMuted(newMutedState);
    audioService.playClickSound();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    audioService.playClickSound();
  };

  const handleShareClick = () => {
    audioService.playClickSound();
    setIsShareModalOpen(true);
  };

  // Intro animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className={`
        relative min-h-screen font-inter selection:bg-orange-500 selection:text-white
        ${isDarkMode ? 'text-gray-100 animate-gradient-dark' : 'text-gray-900 animate-gradient-light bg-orange-50'}
        transition-colors duration-500
      `}>
        {/* Canvas Layer for Minimalist Shapes */}
        <Background isDarkMode={isDarkMode} />

        {/* Main Content */}
        <main className={`
          relative z-10 max-w-2xl mx-auto px-6 py-12 min-h-screen flex flex-col items-center
          transition-all duration-1000 ease-out
          ${isReady ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}
        `}>
          
          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={toggleTheme}
              className={`
                p-3 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-lg border
                ${isDarkMode 
                  ? 'bg-black/20 hover:bg-black/40 text-gray-300 hover:text-white border-white/5' 
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 hover:text-orange-600 border-orange-200'}
              `}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={toggleMute}
              className={`
                p-3 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-lg border
                ${isDarkMode 
                  ? 'bg-black/20 hover:bg-black/40 text-gray-300 hover:text-white border-white/5' 
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 hover:text-orange-600 border-orange-200'}
              `}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <button 
              onClick={handleShareClick}
              className={`
                p-3 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-lg border
                ${isDarkMode 
                  ? 'bg-black/20 hover:bg-black/40 text-gray-300 hover:text-white border-white/5' 
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 hover:text-orange-600 border-orange-200'}
              `}
              aria-label="Share"
            >
              <Share2 size={20} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-12 mt-12">
            <div className="relative group cursor-default">
              {/* Avatar Glow - Orange Theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img 
                src={PROFILE.avatarUrl} 
                alt={PROFILE.name} 
                className={`
                  relative w-36 h-36 rounded-full border-4 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105
                  ${isDarkMode ? 'border-gray-950' : 'border-white'}
                `}
              />
              {/* Status Indicator */}
              <div className={`
                absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 rounded-full z-20 animate-pulse
                ${isDarkMode ? 'border-gray-950' : 'border-white'}
              `}></div>
            </div>
            
            <h1 className={`mt-8 text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {PROFILE.name}
            </h1>
            <div className={`
              mt-3 px-4 py-1.5 rounded-full border inline-block
              ${isDarkMode 
                ? 'bg-orange-500/10 border-orange-500/20' 
                : 'bg-orange-100 border-orange-200'}
            `}>
              <p className="text-orange-500 font-bold tracking-wide text-xs uppercase">
                {PROFILE.role}
              </p>
            </div>
            <p className={`mt-6 max-w-sm leading-relaxed text-base font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {PROFILE.bio}
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full space-y-4">
            {LINKS.map((link) => (
              <LinkCard key={link.id} link={link} isDarkMode={isDarkMode} />
            ))}
          </div>

          {/* Projects Section */}
          <ProjectGrid projects={PROJECTS} isDarkMode={isDarkMode} />

          {/* Footer */}
          <footer className={`mt-20 text-center text-xs pb-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>
            <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
            <p className="mt-2 opacity-70">Link HUB</p>
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

        {/* Floating Entry Overlay */}
        {isMuted && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button 
              onClick={handleStart}
              className="group px-8 py-3 bg-white text-gray-900 text-sm font-bold rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-3 animate-bounce"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Iniciar Experiência
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;