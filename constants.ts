import { 
  Github, 
  Linkedin, 
  Instagram, 
  Globe,
  Smartphone
} from 'lucide-react';
import { Profile, LinkItem, ProjectItem } from './types';

export const PROFILE: Profile = {
  name: "Matheus Nogueira",
  role: "Desenvolvedor Full Stack & UI Designer",
  // URL atualizada para a nova foto
  avatarUrl: "https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg",
  // Nova URL do Banner (Capa LinkedIn)
  bannerUrl: "https://media.licdn.com/dms/image/v2/D4D16AQHJYXUBwsFdJA/profile-displaybackgroundimage-shrink_200_800/B4DZv7UwFTKMAU-/0/1769448085517?e=1779321600&v=beta&t=1ewAOCNUVbdiGGnLWHoJDVgTimH4FJGUBM2POILMlzQ", 
  bio: "Desenvolvendo tecnologia que simplifica o agora. Acredito que o código deve ser invisível e eficiente, para que sobre tempo para o que realmente importa: as pessoas."
};

export const LINKS: LinkItem[] = [
  {
    id: '1',
    title: 'Meu Portfólio',
    url: 'https://mrnogueira.vercel.app/',
    icon: Globe,
    color: 'border-blue-500'
  },
  {
    id: '2',
    title: 'GitHub',
    url: 'https://github.com/mrnogueira07',
    icon: Github,
    color: 'border-gray-400'
  },
  {
    id: '3',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/matheus-nogueira1080',
    icon: Linkedin,
    color: 'border-blue-700'
  },
  {
    id: '4',
    title: 'Instagram',
    url: 'https://instagram.com/mrnogueira07',
    icon: Instagram,
    color: 'border-pink-500'
  },
  {
    id: '5',
    title: 'Entre em Contato',
    url: 'https://wa.me/5592981838704',
    icon: Smartphone,
    color: 'border-green-500'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'E-Commerce Dashboard',
    description: 'Um painel administrativo completo com gráficos em tempo real e modo escuro.',
    imageUrl: 'https://picsum.photos/id/1/600/400',
    demoUrl: '#',
    tags: ['React', 'Tailwind', 'Recharts'],
    category: 'Desenvolvimento Web'
  },
  {
    id: 'p2',
    title: 'Space Shooter Unity',
    description: 'Um jogo de nave espacial 2D com física realista e sistema de pontuação.',
    imageUrl: 'https://picsum.photos/id/234/600/400',
    demoUrl: '#',
    tags: ['Unity', 'C#', 'Game Dev'],
    category: 'Desenvolvimento de Jogos'
  },
  {
    id: 'p3',
    title: 'Brand Identity Concept',
    description: 'Redesign completo da identidade visual para uma startup de finanças.',
    imageUrl: 'https://picsum.photos/id/20/600/400',
    demoUrl: '#',
    tags: ['Figma', 'Branding', 'UI/UX'],
    category: 'Design'
  },
  {
    id: 'p4',
    title: 'Cinematic Travel Vlog',
    description: 'Edição dinâmica com color grading profissional e transições suaves.',
    imageUrl: 'https://picsum.photos/id/40/600/400',
    demoUrl: '#',
    tags: ['Premiere', 'After Effects'],
    category: 'Vídeos Edit'
  },
  {
    id: 'p5',
    title: 'Sistema de Finanças',
    description: 'Controle de gastos pessoais com inteligência artificial para insights.',
    imageUrl: 'https://picsum.photos/id/180/600/400',
    demoUrl: '#',
    tags: ['Next.js', 'AI', 'Finance'],
    category: 'Desenvolvimento Web'
  }
];

export const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";