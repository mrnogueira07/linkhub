import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Globe,
  MessageCircle,
  ShoppingBag,
  Code,
  ExternalLink,
  Smartphone,
  Monitor,
  Coffee,
  Youtube,
  Facebook,
  Twitch
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Map string names from DB to actual components
const iconMap: Record<string, LucideIcon> = {
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Globe,
  MessageCircle, 
  ShoppingBag,
  Code,
  ExternalLink,
  Smartphone,
  Monitor,
  Coffee,
  Youtube,
  Facebook,
  Twitch
};

export const getIconByName = (name: string): LucideIcon => {
  // Capitalize first letter just in case
  const normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return iconMap[normalizedName] || iconMap[name] || Globe;
};
