'use client';

import { Language } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-1 py-1 backdrop-blur-xl">
      <button
        onClick={() => onLanguageChange('es')}
        className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
          currentLanguage === 'es'
            ? 'scale-105 bg-white/20 text-white shadow-lg'
            : 'text-white/60 hover:scale-105 hover:bg-white/10 hover:text-white/80'
        } `}
        aria-label="Español"
      >
        ES
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
          currentLanguage === 'en'
            ? 'scale-105 bg-white/20 text-white shadow-lg'
            : 'text-white/60 hover:scale-105 hover:bg-white/10 hover:text-white/80'
        } `}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
