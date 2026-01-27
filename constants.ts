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
  // URL assinada do Supabase fornecida
  avatarUrl: "https://vokjjkehfdulfavagvcb.supabase.co/storage/v1/object/sign/IMG/foto.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTljODg1Ny1hMjliLTRjNzMtYjM3ZS00MzRmNzY4YmM4Y2YiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJTUcvZm90by5wbmciLCJpYXQiOjE3Njk1NDA5MTksImV4cCI6MTgwMTA3NjkxOX0.35iEPR-J-2L4oYN3-FWkmYPh7cX1iTrFQkWqtDHgxRk",
  // Nova URL do Banner (Capa LinkedIn)
  bannerUrl: "https://vokjjkehfdulfavagvcb.supabase.co/storage/v1/object/sign/IMG/capa%20linkedin%20INNYX.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTljODg1Ny1hMjliLTRjNzMtYjM3ZS00MzRmNzY4YmM4Y2YiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJTUcvY2FwYSBsaW5rZWRpbiBJTk5ZWC5qcGciLCJpYXQiOjE3Njk1NDE2NzUsImV4cCI6MTgwMTA3NzY3NX0.lMfemBWqyLUn891YO_Or4EbWAQ6uLZivEyNV_wnKHWA", 
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