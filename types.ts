import { LucideIcon } from 'lucide-react';

export interface Profile {
  name: string;
  role: string;
  avatarUrl: string;
  bannerUrl?: string; // New field for profile banner
  bio: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  color?: string; // Tailwind color class for hover border/glow
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  repoUrl?: string;
  tags: string[];
  category: string; // New field for folders/tabs
}

export type ShapeType = 'circle' | 'square' | 'triangle' | 'cross';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  type: ShapeType;
  color: string; // Neon color
}