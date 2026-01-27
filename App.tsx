import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, Sun, Moon } from 'lucide-react';
import { Background } from './components/Background';
import { LinkCard } from './components/LinkCard';
import { ProjectGrid } from './components/ProjectGrid';
import { ShareModal } from './components/ShareModal';
import { audioService } from './services/audioService';
import { supabase } from './services/supabase';
import { getIconByName } from './utils/iconMap';
import { PROFILE as DEFAULT_PROFILE, LINKS as DEFAULT_LINKS, PROJECTS as DEFAULT_PROJECTS, AMBIENT_MUSIC_URL } from './constants';
import { Profile, LinkItem, ProjectItem } from './types';

const App: React.FC = () => {
  // Check system preference or default to dark
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Data State
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(DEFAULT_LINKS);
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);

  useEffect(() => {
    // Trigger main entrance animation immediately on mount
    const timer = setTimeout(() => setIsReady(true), 100);

    // Fetch data from Supabase
    const fetchData = async () => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .single();

        if (profileData && !profileError) {
          // Usamos explicitamente as constantes DEFAULT_PROFILE para avatar e banner
          // para garantir que as URLs assinadas fornecidas no código sejam usadas,
          // ignorando o que está no banco de dados temporariamente.
          setProfile({
            name: profileData.name || DEFAULT_PROFILE.name,
            role: profileData.role || DEFAULT_PROFILE.role,
            avatarUrl: DEFAULT_PROFILE.avatarUrl,
            bannerUrl: DEFAULT_PROFILE.bannerUrl, 
            bio: profileData.bio || DEFAULT_PROFILE.bio
          });
        } else {
           // Fallback to default if DB is empty
           setProfile(DEFAULT_PROFILE);
        }

        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .order('order_index', { ascending: true });

        if (linksData && !linksError && linksData.length > 0) {
          const formattedLinks: LinkItem[] = linksData.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            url: item.url,
            icon: getIconByName(item.icon_name || 'Globe'),
            color: item.color || 'border-purple-400'
          }));
          setLinks(formattedLinks);
        }

        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (projectsData && !projectsError && projectsData.length > 0) {
          const formattedProjects: ProjectItem[] = projectsData.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description,
            imageUrl: item.image_url || 'https://picsum.photos/600/400',
            demoUrl: item.demo_url || '#',
            repoUrl: item.repo_url,
            tags: item.tags || [],
            category: item.category || 'Desenvolvimento Web'
          }));
          setProjects(formattedProjects);
        }

      } catch (error) {
        console.warn("Supabase integration warning: Could not fetch data, using defaults.", error);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
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

  // Logic to determine button classes based on Music State (Glass Effect)
  const getButtonClass = () => {
    const baseClass = "p-2.5 rounded-full transition-all active:scale-95 shadow-sm border";
    
    // If Music is ON (!isMuted), use Glass Style
    if (!isMuted) {
      return `${baseClass} backdrop-blur-xl bg-white/20 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:border-white/60`;
    }

    // Default Styles
    return `${baseClass} backdrop-blur-md ${isDarkMode 
      ? 'bg-black/40 hover:bg-black/60 text-gray-200 hover:text-white border-white/10' 
      : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-purple-600 border-white/40'}`;
  };

  // Helper to construct image source with cache busting that respects existing query params
  const getAvatarSrc = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}t=${new Date().getTime()}`;
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className={`
        relative min-h-screen font-inter selection:bg-purple-500 selection:text-white
        ${isDarkMode ? 'text-gray-100 animate-gradient-dark' : 'text-gray-900 animate-gradient-light bg-purple-50'}
        transition-colors duration-500
        flex flex-col items-center justify-center py-6 sm:py-10 overflow-hidden
      `}>
        {/* Canvas Layer for Minimalist Shapes */}
        <Background isDarkMode={isDarkMode} />

        {/* Sun Flash Overlay - Only Active when Music is ON */}
        {!isMuted && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sun-pass blur-3xl"></div>
          </div>
        )}

        {/* Main Content Card */}
        <main className={`
          relative z-10 w-full max-w-[600px] mx-4 flex flex-col items-center
          rounded-[2.5rem] border shadow-2xl backdrop-blur-xl overflow-hidden
          transition-all duration-1000 ease-out
          ${isDarkMode 
            ? 'bg-gray-950/40 border-white/10 shadow-black/40' 
            : 'bg-white/40 border-white/60 shadow-purple-500/10'}
          ${isReady ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}
        `}>
          
          {/* Banner Section */}
          <div className="w-full h-32 md:h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            {profile.bannerUrl && (
              <img 
                src={profile.bannerUrl} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Top Controls - Positioned over banner */}
            <div className="absolute top-4 right-4 flex gap-3 z-50">
              <button 
                onClick={toggleTheme}
                className={getButtonClass()}
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button 
                onClick={toggleMute}
                className={getButtonClass()}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <button 
                onClick={handleShareClick}
                className={getButtonClass()}
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="w-full px-6 pb-10 flex flex-col items-center">
            {/* Profile Section with Overlapping Avatar */}
            <div className="flex flex-col items-center text-center mb-8 relative -mt-16 z-20">
              <div className="relative group cursor-default">
                {/* Avatar Glow - Neon Theme */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                {/* Image with positioning fix - object-[center_35%] moves focus slightly up to capture face */}
                <img 
                  src={getAvatarSrc(profile.avatarUrl)}
                  alt={profile.name}
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('ui-avatars')) {
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random&size=128`;
                    }
                  }}
                  className={`
                    relative w-32 h-32 rounded-full border-4 object-cover object-[center_35%] shadow-2xl transition-transform duration-500 group-hover:scale-105
                    ${isDarkMode ? 'border-gray-900 bg-gray-900' : 'border-white bg-white'}
                  `}
                />
                {/* Status Indicator */}
                <div className={`
                  absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-4 rounded-full z-20 animate-pulse
                  ${isDarkMode ? 'border-gray-900' : 'border-white'}
                `}></div>
              </div>
              
              <h1 className={`mt-4 text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {profile.name}
              </h1>
              <div className={`
                mt-3 px-4 py-1.5 rounded-full border inline-block backdrop-blur-sm
                ${isDarkMode 
                  ? 'bg-purple-500/10 border-purple-500/20' 
                  : 'bg-purple-100/50 border-purple-200'}
              `}>
                <p className="text-purple-500 font-bold tracking-wide text-[10px] uppercase">
                  {profile.role}
                </p>
              </div>
              <p className={`mt-4 max-w-sm leading-relaxed text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {profile.bio}
              </p>
            </div>

            {/* Links Section */}
            <div className="w-full space-y-3">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} isDarkMode={isDarkMode} />
              ))}
            </div>

            {/* Projects Section */}
            <ProjectGrid projects={projects} isDarkMode={isDarkMode} />

            {/* Footer */}
            <footer className={`mt-16 text-center text-xs pb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <p>© {new Date().getFullYear()} {profile.name}.</p>
              <p className="mt-1 opacity-60">Link HUB</p>
            </footer>
          </div>
        </main>

        {/* Share Modal */}
        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          url={window.location.href}
          title={`Confira o Link HUB de ${profile.name}`}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default App;