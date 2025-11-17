"use client";

import { useState, useEffect } from 'react';
import React from 'react';

/**
 * Carousel interactivo de habilidades técnicas
 * Muestra categorías (Frontend, Backend, Cloud, etc.) con navegación por pestañas
 * Incluye iconos flotantes animados de tecnologías
 */

interface Skill {
  name: string;
  level?: string; // Opcional, usado para idiomas
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactElement;
  skills: Skill[];
  color: string;      // Color theme de la categoría
  gridCols: string;   // Layout responsivo del grid
}

export default function SkillsCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying] = useState(false);           // Auto-play deshabilitado para control manual
  const [currentIconIndex, setCurrentIconIndex] = useState(0); // Índice del carousel de iconos

  const categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'Angular' },
        { name: 'Tailwind CSS' },
        { name: 'Bootstrap' },
        { name: 'SCSS' },
      ],
      color: 'indigo',
      gridCols: 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5'
    },
    {
      id: 'backend',
      title: 'Backend & Bases de Datos',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Python' },
        { name: 'Flask' },
        { name: 'MongoDB' },
        { name: 'REST APIs' },
        { name: 'JWT' },
        { name: 'Bcrypt' },
      ],
      color: 'purple',
      gridCols: 'grid-cols-2 sm:grid-cols-4'
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      skills: [
        { name: 'AWS IAM' },
        { name: 'AWS VPC' },
        { name: 'AWS EC2' },
        { name: 'AWS S3' },
        { name: 'CloudFormation' },
        { name: 'Docker' },
        { name: 'Vercel' },
        { name: 'Git' },
        { name: 'GitHub' },
      ],
      color: 'blue',
      gridCols: 'grid-cols-2 sm:grid-cols-3'
    },
    {
      id: '3d',
      title: '3D & Diseño',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      skills: [
        { name: 'Three.js' },
        { name: 'React Three Fiber' },
        { name: 'UI/UX' },
        { name: 'Responsive Design' },
        { name: 'Figma' },
      ],
      color: 'violet',
      gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
    },
    {
      id: 'tools',
      title: 'Herramientas & Métodos',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      skills: [
        { name: 'Postman' },
        { name: 'SCRUM' },
        { name: 'Arduino' },
      ],
      color: 'pink',
      gridCols: 'grid-cols-2 sm:grid-cols-3'
    },
    {
      id: 'languages',
      title: 'Idiomas',
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      skills: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'C1' },
        { name: 'Francés', level: 'A2' },
      ],
      color: 'emerald',
      gridCols: 'grid-cols-1 sm:grid-cols-3'
    },
  ];

  // Auto-play para tabs - Manual
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length]);

  // Auto-play para iconos flotantes - Automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % techIcons.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const currentCategory = categories[activeTab];
  
  const colorClasses = {
    indigo: {
      bg: 'from-indigo-950/30 via-indigo-900/20 to-transparent',
      border: 'border-indigo-500/30',
      glow: 'shadow-indigo-500/20',
      text: 'text-indigo-200',
      icon: 'bg-indigo-900/40 border-indigo-500/30',
      card: 'bg-indigo-950/20 border-indigo-500/20 hover:border-indigo-400/40',
      tabActive: 'bg-indigo-900/30 border-indigo-500/40',
    },
    purple: {
      bg: 'from-purple-950/30 via-purple-900/20 to-transparent',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      text: 'text-purple-200',
      icon: 'bg-purple-900/40 border-purple-500/30',
      card: 'bg-purple-950/20 border-purple-500/20 hover:border-purple-400/40',
      tabActive: 'bg-purple-900/30 border-purple-500/40',
    },
    blue: {
      bg: 'from-blue-950/30 via-blue-900/20 to-transparent',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
      text: 'text-blue-200',
      icon: 'bg-blue-900/40 border-blue-500/30',
      card: 'bg-blue-950/20 border-blue-500/20 hover:border-blue-400/40',
      tabActive: 'bg-blue-900/30 border-blue-500/40',
    },
    violet: {
      bg: 'from-violet-950/30 via-violet-900/20 to-transparent',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/20',
      text: 'text-violet-200',
      icon: 'bg-violet-900/40 border-violet-500/30',
      card: 'bg-violet-950/20 border-violet-500/20 hover:border-violet-400/40',
      tabActive: 'bg-violet-900/30 border-violet-500/40',
    },
    pink: {
      bg: 'from-pink-950/30 via-pink-900/20 to-transparent',
      border: 'border-pink-500/30',
      glow: 'shadow-pink-500/20',
      text: 'text-pink-200',
      icon: 'bg-pink-900/40 border-pink-500/30',
      card: 'bg-pink-950/20 border-pink-500/20 hover:border-pink-400/40',
      tabActive: 'bg-pink-900/30 border-pink-500/40',
    },
    emerald: {
      bg: 'from-emerald-950/30 via-emerald-900/20 to-transparent',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      text: 'text-emerald-200',
      icon: 'bg-emerald-900/40 border-emerald-500/30',
      card: 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-400/40',
      tabActive: 'bg-emerald-900/30 border-emerald-500/40',
    },
  };

  const colors = colorClasses[currentCategory.color as keyof typeof colorClasses];

  // Iconos SVG para el carrusel infinito
  const techIcons = [
    { name: 'HTML5', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg> },
    { name: 'CSS3', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg> },
    { name: 'JavaScript', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg> },
    { name: 'TypeScript', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
    { name: 'Angular', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z"/></svg> },
    { name: 'Node.js', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg> },
    { name: 'MongoDB', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.291-11.375zM12 14.58c-.288.14-.691.14-.979 0-.344-.165-2.875-2.062-2.875-5.58 0-3.519 2.531-5.415 2.875-5.58.288-.14.691-.14.979 0 .344.165 2.875 2.061 2.875 5.58 0 3.518-2.531 5.415-2.875 5.58z"/></svg> },
    { name: 'Python', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
    { name: 'AWS', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.591-.894-.591-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.031-.375-1.277-.255-.246-.686-.367-1.277-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.492.492 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.263 1.005-.367C2.34 4.074 2.78 4 3.252 4c.95 0 1.636.215 2.115.646.471.43.710 1.085.710 1.963v2.427zm-3.258 1.22c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.279-.512.056-.191.088-.423.088-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.823.296zm6.413.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.168.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.239-.184.51-.32.822-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.311.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .256.215c.048.08.072.168.072.279v.375c0 .168-.064.256-.184.256-.063 0-.167-.024-.303-.08-.455-.2-.974-.296-1.532-.296-.455 0-.815.071-1.062.223-.248.152-.367.375-.367.67 0 .224.08.416.239.583.16.168.454.328.888.479l1.133.359c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.247.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg> },
    { name: 'Git', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
    { name: 'Figma', svg: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg> },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-end pt-24 md:pt-32 pb-16 md:pb-20">
      {/* Contenedor centrado verticalmente */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-3 md:px-6">
        
        {/* Tabs Navigation - Estilo planetas */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {categories.map((category, index) => {
            const catColors = colorClasses[category.color as keyof typeof colorClasses];
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(index)}
                className={`
                  group relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg
                  transition-all duration-300 transform
                  ${activeTab === index 
                    ? `${catColors.tabActive} scale-105 shadow-lg ${catColors.glow}` 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                  border backdrop-blur-sm text-xs md:text-sm min-h-11
                `}
              >
                <div className={`transition-colors shrink-0 ${activeTab === index ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                  {category.icon}
                </div>
                <span className={`font-medium transition-colors hidden xs:inline sm:inline ${activeTab === index ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Content - Centrado */}
        <div className="w-full">
          <div 
            key={activeTab}
            className="w-full animate-fadeSlideIn"
          >
            {/* Category Header con gradiente de color */}
            <div className={`relative flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-xl bg-linear-to-r ${colors.bg} border ${colors.border} backdrop-blur-sm`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg ${colors.icon} border flex items-center justify-center backdrop-blur-sm shrink-0`}>
                {currentCategory.icon}
              </div>
              <h3 className={`text-base sm:text-lg md:text-xl font-bold ${colors.text}`}>
                {currentCategory.title}
              </h3>
            </div>

            {/* Skills Grid con colores del planeta */}
            <div className={`grid ${currentCategory.gridCols} gap-2 md:gap-2.5`}>
              {currentCategory.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative opacity-0 animate-[slideUp_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card con tema del planeta */}
                  <div className={`
                    relative h-14 md:h-16 rounded-lg 
                    ${colors.card}
                    backdrop-blur-sm transition-all duration-300 
                    hover:-translate-y-1 hover:shadow-lg ${colors.glow}
                    flex flex-col items-center justify-center p-2
                  `}>
                    <span className={`relative text-xs md:text-sm font-semibold ${colors.text} text-center group-hover:text-white transition-colors`}>
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="relative text-xs text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
                        {skill.level}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Iconos flotantes 3D estilo estrellas - Carrusel automático */}
        <div className="relative w-full h-16 sm:h-20 overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center px-2 sm:px-4 gap-4 sm:gap-6 animate-scrollIcons" style={{ perspective: '1000px' }}>
            {/* Duplicar iconos para loop infinito en todas las resoluciones */}
            {[...techIcons, ...techIcons].map((tech, index) => (
              <div
                key={`tech-${index}`}
                className="opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-pointer shrink-0"
              >
                <div className="text-white/70 hover:text-white transition-colors scale-75 sm:scale-100">
                  {tech.svg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
