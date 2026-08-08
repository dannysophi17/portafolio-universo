'use client';

import { useState, FormEvent } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      // Envía el email usando EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey,
        },
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset automático después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: unknown) {
      if (error instanceof EmailJSResponseStatus) {
        console.error('EmailJS error:', error.status, error.text);
      } else {
        console.error('Error sending email:', error);
      }

      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <form
        onSubmit={handleSubmit}
        aria-busy={status === 'sending'}
        className="space-y-3 sm:space-y-4"
      >
        {/* Nombre */}
        <div className="group relative">
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm"
          >
            {t.formName}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.formNamePlaceholder}
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 transition-all duration-300 hover:border-slate-600/60 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        {/* Email */}
        <div className="group relative">
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm"
          >
            {t.formEmail}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.formEmailPlaceholder}
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 transition-all duration-300 hover:border-slate-600/60 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        {/* Mensaje */}
        <div className="group relative">
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm"
          >
            {t.formMessage}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            placeholder={t.formMessagePlaceholder}
            className="w-full resize-none rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 transition-all duration-300 hover:border-slate-600/60 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          aria-label={
            status === 'sending'
              ? t.formSending
              : status === 'success'
                ? t.formSuccess
                : status === 'error'
                  ? t.formError
                  : t.formSend
          }
          className="group w-full cursor-pointer rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:px-6 sm:py-3 sm:text-base"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {status === 'sending' ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t.formSending}
              </>
            ) : status === 'success' ? (
              <>
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>✓</span>
              </>
            ) : status === 'error' ? (
              <>
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Error</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 transition-transform sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                {t.formSend}
              </>
            )}
          </div>
        </button>

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === 'sending'
            ? t.formSending
            : status === 'success'
              ? t.formSuccess
              : status === 'error'
                ? t.formError
                : ''}
        </div>

        {/* Mensajes de estado */}
        {status === 'success' && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-700/50 bg-emerald-900/30 p-2.5 text-xs text-emerald-300 sm:p-3 sm:text-sm">
            <svg
              className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{t.formSuccess}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 rounded-lg border border-red-700/50 bg-red-900/30 p-2.5 text-xs text-red-300 sm:p-3 sm:text-sm">
            <svg
              className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{t.formError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
