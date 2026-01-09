import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2 } from 'lucide-react';
import { Background } from './components/Background';
import { LinkCard } from './components/LinkCard';
import { ProjectGrid } from './components/ProjectGrid';
import { ShareModal } from './components/ShareModal';
import { audioService } from './services/audioService';
import { PROFILE, LINKS, PROJECTS, AMBIENT_MUSIC_URL } from './constants';

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Initialize music on first user interaction to comply with browser policies
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

  const handleShareClick = () => {
    audioService.playClickSound();
    setIsShareModalOpen(true);
  };

  // Intro animation effect
  useEffect(() => {
    // If user doesn't click start, we just show content after a brief delay purely visual
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-100 selection:bg-indigo-500 selection:text-white animate-gradient font-inter">
      {/* Canvas Layer for Minimalist Shapes */}
      <Background />

      {/* Main Content */}
      <main className={`
        relative z-10 max-w-2xl mx-auto px-6 py-12 min-h-screen flex flex-col items-center
        transition-all duration-1000 ease-out
        ${isReady ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}
      `}>
        
        {/* Top Controls */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button 
            onClick={toggleMute}
            className="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-gray-300 hover:text-white transition-all active:scale-95 border border-white/5 shadow-lg"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            onClick={handleShareClick}
            className="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-gray-300 hover:text-white transition-all active:scale-95 border border-white/5 shadow-lg"
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-12 mt-12">
          <div className="relative group cursor-default">
            {/* Avatar Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <img 
              src={PROFILE.avatarUrl} 
              alt={PROFILE.name} 
              className="relative w-36 h-36 rounded-full border-4 border-gray-950 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-gray-950 rounded-full z-20 animate-pulse"></div>
          </div>
          
          <h1 className="mt-8 text-4xl font-bold text-white tracking-tight">
            {PROFILE.name}
          </h1>
          <div className="mt-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 inline-block">
            <p className="text-indigo-300 font-semibold tracking-wide text-xs uppercase">
              {PROFILE.role}
            </p>
          </div>
          <p className="mt-6 text-gray-400 max-w-sm leading-relaxed text-base font-light">
            {PROFILE.bio}
          </p>
        </div>

        {/* Links Section */}
        <div className="w-full space-y-4">
          {LINKS.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>

        {/* Projects Section */}
        <ProjectGrid projects={PROJECTS} />

        {/* Footer */}
        <footer className="mt-20 text-center text-xs text-gray-600 pb-8">
          <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
          <p className="mt-2 opacity-70">Design inspirado em Lovable.dev</p>
        </footer>
      </main>

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        url={window.location.href}
        title={`Confira o portfólio de ${PROFILE.name}`}
      />

      {/* Floating Entry Overlay */}
      {isMuted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={handleStart}
            className="group px-8 py-3 bg-white text-gray-900 text-sm font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-3 animate-bounce"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Iniciar Experiência
          </button>
        </div>
      )}
    </div>
  );
};

export default App;