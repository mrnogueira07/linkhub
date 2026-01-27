import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, isDarkMode }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`
      fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
      flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border
      transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}
      ${isDarkMode 
        ? 'bg-gray-900/90 border-yellow-500/30 text-white shadow-yellow-500/10' 
        : 'bg-white/90 border-yellow-500/30 text-gray-800 shadow-yellow-500/10'}
    `}>
      <AlertCircle className="text-yellow-500" size={20} />
      <span className="text-sm font-medium whitespace-nowrap">{message}</span>
      <button 
        onClick={onClose}
        className={`ml-2 p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
      >
        <X size={14} />
      </button>
    </div>
  );
};