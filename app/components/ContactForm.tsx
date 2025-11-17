"use client";

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Formulario de contacto integrado con EmailJS
 * Maneja validación, envío y estados de UI (enviando, éxito, error)
 */
export default function ContactForm() {
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
      // Envío a través de EmailJS - Credenciales configuradas en EMAILJS_CONFIG.md
      await emailjs.send(
        'service_p2yyi81',
        'template_o2vpzod',
        {
          from_name: formData.name,
          from_email: formData.email,
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
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-200 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-700/40 border border-slate-600/50 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        Envíame un mensaje
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div className="group relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nombre
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60"
            placeholder="Tu nombre"
          />
        </div>

        {/* Email */}
        <div className="group relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60"
            placeholder="tu@email.com"
          />
        </div>

        {/* Mensaje */}
        <div className="group relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Mensaje
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 
                     transition-all duration-300 hover:border-slate-600/60 resize-none"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group w-full rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 hover:border-white/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <div className="flex items-center justify-center gap-2">
            {status === 'sending' ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : status === 'success' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Mensaje enviado!
              </>
            ) : status === 'error' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Error al enviar
              </>
            ) : (
              <>
                <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Enviar mensaje
              </>
            )}
          </div>
        </button>

        {/* Mensajes de estado */}
        {status === 'success' && (
          <div className="p-3 rounded-lg bg-emerald-900/30 border border-emerald-700/50 text-emerald-300 text-sm">
            ¡Gracias! Tu mensaje ha sido enviado correctamente.
          </div>
        )}
        {status === 'error' && (
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-300 text-sm">
            Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
          </div>
        )}
      </form>
    </div>
  );
}
