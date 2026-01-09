import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Globe,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { Profile, LinkItem, ProjectItem } from './types';

export const PROFILE: Profile = {
  name: "Matheus Nogueira",
  role: "Desenvolvedor Full Stack & UI Designer",
  avatarUrl: "https://github.com/mrnogueira07.png",
  bio: "Criando experiências digitais imersivas. Apaixonado por React, Design Systems e Café ☕."
};

export const LINKS: LinkItem[] = [
  {
    id: 'store',
    title: 'Minha Loja de Streamers',
    url: 'https://orelhastore.com/?ref=mrnogueira',
    icon: ShoppingBag,
    color: 'border-purple-500'
  },
  {
    id: '1',
    title: 'Meu Portfólio',
    url: 'https://portifoliomrnogueira.lovable.app/',
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
    icon: MessageCircle,
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
    tags: ['React', 'Tailwind', 'Recharts']
  },
  {
    id: 'p2',
    title: 'App de Meditação',
    description: 'Aplicativo móvel focado em bem-estar com sons binaurais e timer.',
    imageUrl: 'https://picsum.photos/id/180/600/400',
    demoUrl: '#',
    tags: ['React Native', 'Audio API']
  },
  {
    id: 'p3',
    title: 'Sistema de Finanças',
    description: 'Controle de gastos pessoais com inteligência artificial para insights.',
    imageUrl: 'https://picsum.photos/id/20/600/400',
    demoUrl: '#',
    tags: ['Next.js', 'AI', 'Finance']
  }
];

// Using a royalty-free ambient track URL (example)
export const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";