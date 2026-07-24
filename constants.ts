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
  role: "",
  // URL atualizada para a nova foto
  avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQHxU4emL5ZJGA/profile-displayphoto-scale_400_400/B4DZ.E_8V1I0Ag-/0/1784642785033?e=1786579200&v=beta&t=CzCzB_VjkLtkHfGb0h27f1xsemD5h8_VDtAh3npPDk8",
  // Nova URL do Banner (Capa LinkedIn)
  bannerUrl: "https://media.licdn.com/dms/image/v2/D4D16AQHJYXUBwsFdJA/profile-displaybackgroundimage-shrink_350_1400/B4DZv7UwFTKMAY-/0/1769448085517?e=1786579200&v=beta&t=EdQEZ7A_WGnl9l_jIqobFZwWW5BR_bWfjTL1a6CmHx0", 
  bio: "Desenvolvedor de Jogos & Web | Designer & Editor de Vídeo | Unindo Código, Interatividade e Design"
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
    id: 'michel-silva-bjj',
    title: 'Clube Michel Silva BJJ',
    description: 'Landing page para equipe e academia de Jiu-Jitsu, com foco na captação de alunos, turmas e modalidades.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    demoUrl: 'https://clube-michel-silva-bjj.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'Landing Page', 'SEO'],
    category: 'Landing Page'
  },
  {
    id: 'emanuel-car',
    title: 'Emanuel Car',
    description: 'Landing page moderna, responsiva e otimizada para conversão de vendas no setor automotivo.',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    demoUrl: 'https://emanuelcar.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'Landing Page', 'SEO'],
    category: 'Landing Page'
  },
  {
    id: 'portal-parintins',
    title: 'Portal Parintins',
    description: 'Portal de notícias regional completo com gestão de conteúdo, SEO otimizado e alta performance.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    demoUrl: 'https://www.portalparintins.com.br/',
    tags: ['React', 'Next.js', 'SEO', 'Portal de Notícias'],
    category: 'Portal de Notícias'
  }
];

export const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";