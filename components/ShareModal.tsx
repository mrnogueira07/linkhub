import React, { useState } from 'react';
import { X, Copy, Check, Linkedin, Send, MessageCircle, Instagram } from 'lucide-react';
import { audioService } from '../services/audioService';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      audioService.playClickSound();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = (network: string) => {
    audioService.playClickSound();
    let shareUrl = '';

    switch (network) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct web share link, so we copy and open
        handleCopy();
        window.open('https://instagram.com/', '_blank');
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-2xl transform transition-all animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Compartilhar</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white text-green-500 transition-all duration-300">
              <MessageCircle size={24} />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">WhatsApp</span>
          </button>

          <button
            onClick={() => handleShare('telegram')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center group-hover:bg-blue-400 group-hover:text-white text-blue-400 transition-all duration-300">
              <Send size={24} />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Telegram</span>
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-700/10 border border-blue-700/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300">
              <Linkedin size={24} />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
          </button>

          <button
            onClick={() => handleShare('instagram')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white text-pink-500 transition-all duration-300">
              <Instagram size={24} />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Instagram</span>
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
            <span className="text-sm text-gray-400 truncate flex-1 font-mono">{url}</span>
            <button
              onClick={handleCopy}
              className={`
                px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2
                ${copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20'}
              `}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};