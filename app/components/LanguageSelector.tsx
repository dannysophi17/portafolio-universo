"use client";

import { Language } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-1 py-1 backdrop-blur-xl">
      <button
        onClick={() => onLanguageChange('es')}
        className={`
          rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 cursor-pointer
          ${currentLanguage === 'es' 
            ? 'bg-white/20 text-white shadow-lg scale-105' 
            : 'text-white/60 hover:text-white/80 hover:bg-white/10 hover:scale-105'
          }
        `}
        aria-label="Español"
      >
        ES
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`
          rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 cursor-pointer
          ${currentLanguage === 'en' 
            ? 'bg-white/20 text-white shadow-lg scale-105' 
            : 'text-white/60 hover:text-white/80 hover:bg-white/10 hover:scale-105'
          }
        `}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
