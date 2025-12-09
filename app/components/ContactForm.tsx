"use client";

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Formulario de contacto que envía emails usando EmailJS
 * Muestra estados: enviando, éxito o error
 */

interface ContactFormProps {
  translations: {
    formName: string;
    formEmail: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    formNamePlaceholder: string;
    formEmailPlaceholder: string;
    formMessagePlaceholder: string;
  };
}

export default function ContactForm({ translations: t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Envía el email usando EmailJS
      await emailjs.send(
        'service_p2yyi81',
        'template_mp3zngs',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'nmNZ6cxIiVwm_Cwxt'
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset automático después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Nombre */}
        <div className="group relative">
          <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
            {t.formName}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.formNamePlaceholder}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60"
          />
        </div>

        {/* Email */}
        <div className="group relative">
          <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
            {t.formEmail}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.formEmailPlaceholder}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60"
          />
        </div>

        {/* Mensaje */}
        <div className="group relative">
          <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
            {t.formMessage}
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            placeholder={t.formMessagePlaceholder}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60 resize-none"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group w-full rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-2.5 sm:px-6 sm:py-3 font-medium text-white text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 hover:border-white/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {status === 'sending' ? (
              <>
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.formSending}
              </>
            ) : status === 'success' ? (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>✓</span>
              </>
            ) : status === 'error' ? (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Error</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {t.formSend}
              </>
            )}
          </div>
        </button>

        {/* Mensajes de estado */}
        {status === 'success' && (
          <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-900/30 border border-emerald-700/50 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t.formSuccess}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="p-2.5 sm:p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-300 text-xs sm:text-sm flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{t.formError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
