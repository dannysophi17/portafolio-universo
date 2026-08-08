/**
 * Portafolio interactivo con navegación 3D estilo sistema solar
 * Cada planeta representa una sección diferente del portafolio
 * Tres modos: vista general, navegación entre planetas, y vista detallada
 */
'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import CameraController from './components/CameraController';
import ContactForm from './components/ContactForm';
import IntroStars from './components/IntroStars';
import LanguageSelector from './components/LanguageSelector';
import OrbitingPlanets from './components/OrbitingPlanets';
import ParallaxBackground from './components/ParallaxBackground';
import SkillsCarousel from './components/SkillsCarousel';
import { Language, translations } from './translations';

/**
 * Componente para mostrar proyectos con carrusel de imágenes
 * Incluye tecnologías usadas, demo en vivo y enlace a GitHub
 */
interface ProjectsContentProps {
  translations: {
    demo: string;
    code: string;
    memoryGift: {
      title: string;
      desc: string;
    };
    workcango: {
      title: string;
      desc: string;
      products: string;
      projectsLabel: string;
      services: string;
    };
    arcade: {
      title: string;
      desc: string;
    };
    techforge: {
      title: string;
      desc: string;
    };
  };
}

const ARCADE_IMAGES = ['/projects/arcade1.png', '/projects/arcade2.png'] as const;

const WORKCANGO_IMAGES = [
  '/projects/workcango1.png',
  '/projects/workcango2.png',
  '/projects/workcango3.png',
] as const;

function ProjectsContent({ translations: t }: ProjectsContentProps) {
  // Estado del carrusel para cada proyecto con múltiples imágenes
  const [arcadeImageIndex, setArcadeImageIndex] = useState(0);
  const [workcangoImageIndex, setWorkcangoImageIndex] = useState(0);

  useEffect(() => {
    const arcadeInterval = setInterval(() => {
      setArcadeImageIndex((prev) => (prev + 1) % ARCADE_IMAGES.length);
    }, 3000);

    const workcangoInterval = setInterval(() => {
      setWorkcangoImageIndex((prev) => (prev + 1) % WORKCANGO_IMAGES.length);
    }, 3000);

    return () => {
      clearInterval(arcadeInterval);
      clearInterval(workcangoInterval);
    };
  }, []);

  const projects = [
    {
      title: t.memoryGift.title,
      tech: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'Zustand'],
      year: '2026',
      images: ['/projects/memory-gift.png'],
      description: t.memoryGift.desc,
      demo: 'https://3d-memory-gift-template.vercel.app/',
      github: 'https://github.com/dannysophi17/3d-memory-gift-template',
      color: 'from-violet-500/20 via-indigo-500/20',
      borderColor: 'border-violet-500/30',
      glowColor: 'shadow-violet-500/20',
      hasCarousel: false,
      hasMultipleDemos: false,
    },
    {
      title: t.workcango.title,
      tech: ['React', 'Tailwind CSS', 'Netlify'],
      year: '2025',
      images: WORKCANGO_IMAGES,
      currentImageIndex: workcangoImageIndex,
      description: t.workcango.desc,
      demos: [
        {
          label: t.workcango.products,
          url: 'https://productallworkcango.netlify.app/',
        },
        {
          label: t.workcango.projectsLabel,
          url: 'https://proyectosallworkcango.netlify.app/',
        },
        {
          label: t.workcango.services,
          url: 'https://serviciosallworkcango.netlify.app/',
        },
      ],
      github: null,
      color: 'from-blue-500/20 via-indigo-500/20',
      borderColor: 'border-blue-500/30',
      glowColor: 'shadow-blue-500/20',
      hasCarousel: true,
      hasMultipleDemos: true,
    },
    {
      title: t.arcade.title,
      tech: ['Angular', 'Node.js', 'MongoDB', 'Express'],
      year: '2025',
      images: ARCADE_IMAGES,
      currentImageIndex: arcadeImageIndex,
      description: t.arcade.desc,
      demo: 'https://tareas-arcade-final-git-main-daniela-coavas-projects.vercel.app/login',
      github: 'https://github.com/dannysophi17/Tareas-arcade-final',
      color: 'from-red-500/20 via-pink-500/20',
      borderColor: 'border-red-500/30',
      glowColor: 'shadow-red-500/20',
      hasCarousel: true,
      hasMultipleDemos: false,
    },
    {
      title: t.techforge.title,
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Dominio Propio'],
      year: '2024',
      images: ['/projects/techforges.png'],
      description: t.techforge.desc,
      demo: 'https://www.techforges.com/',
      github: 'https://github.com/dannysophi17/TechForge_Front_end',
      color: 'from-purple-500/20 via-violet-500/20',
      borderColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/20',
      hasCarousel: false,
      hasMultipleDemos: false,
    },
  ];

  return (
    <div className="relative h-full space-y-6 overflow-y-auto px-4 py-4 pb-14 md:px-6">
      {projects.map((p, i) => {
        const currentImage = p.hasCarousel ? p.images[p.currentImageIndex!] : p.images[0];

        return (
          <div
            key={i}
            className="group animate-fadeIn relative overflow-visible opacity-0"
            style={{
              animation: `fadeIn 0.6s ease-out ${0.1 + i * 0.2}s forwards`,
            }}
          >
            {/* Glow effect - Ahora con overflow visible */}
            <div
              className={`absolute -inset-1 bg-linear-to-r ${p.color} -z-10 rounded-2xl to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40`}
            />

            <div
              className={`relative rounded-2xl border bg-white/10 p-3 sm:p-4 md:bg-white/5 md:p-5 ${p.borderColor} hover:border-opacity-50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${p.glowColor} overflow-hidden`}
            >
              {/* Header con título y año */}
              <div className="mb-3 flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex flex-1 items-start gap-2 sm:gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl bg-linear-to-br sm:h-12 sm:w-12 ${p.color} border to-transparent ${p.borderColor} flex shrink-0 items-center justify-center backdrop-blur-sm`}
                  >
                    <svg
                      className="h-5 w-5 text-white sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="group-hover:text-opacity-90 mb-1 text-base font-bold text-white transition-colors sm:text-lg md:text-xl">
                      {p.title}
                    </h3>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {p.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/70 backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70">
                  {p.year}
                </span>
              </div>

              {/* Imagen del proyecto con carrusel */}
              <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 transition-shadow duration-500 group-hover:shadow-lg">
                {p.hasCarousel && (
                  <div className="absolute right-2 bottom-2 z-10 flex gap-1.5">
                    {p.images.map((_, idx) => {
                      const isWorkCango = p.title === t.workcango.title;
                      const activeColor = isWorkCango ? 'bg-blue-500' : 'bg-white';
                      const inactiveColor = isWorkCango ? 'bg-blue-300/60' : 'bg-white/40';
                      return (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full shadow-lg transition-all duration-300 ${
                            idx === p.currentImageIndex ? `${activeColor} w-6` : inactiveColor
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-white/5 to-white/10">
                  <Image
                    src={currentImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Descripción */}
              <p className="mb-4 text-sm leading-relaxed text-white/80">{p.description}</p>

              {/* Botones */}
              <div className="flex flex-wrap gap-2">
                {p.hasMultipleDemos ? (
                  // Múltiples demos para WorkCango
                  <>
                    {p.demos?.map((demo, idx) => (
                      <a
                        key={idx}
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/25 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        <svg
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {demo.label}
                      </a>
                    ))}
                  </>
                ) : (
                  // Demo único para otros proyectos
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/25 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {t.demo}
                  </a>
                )}

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t.code}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Estructura de datos del planeta conteniendo posición, configuración de cámara y contenido de sección.
 */
type PlanetInfo = {
  name: string; // Nombre de la sección mostrado en UI
  planetPos: [number, number, number]; // Posición 3D en la escena [x, y, z]
  cameraPos: [number, number, number]; // Posición objetivo de cámara cuando está enfocado
  title: string; // Título de sección (opcional, usado en algunas vistas)
  content: React.ReactNode; // Componente React o JSX a mostrar en el panel
  focusDepth: number; // Valor de profundidad de campo para modo focus
};

/**
 * Datos de las secciones del portafolio mapeados a posiciones planetarias.
 * Índice 0: Sol (Sobre mí) en el origen [0,0,0]
 * Los demás planetas orbitan en posiciones calculadas con colores y contenido únicos.
 */
const planetsData: PlanetInfo[] = [
  {
    name: 'Sobre mí',
    planetPos: [0, 0, 0],
    cameraPos: [0, 0, 15],
    focusDepth: 0.018,
    title: '',
    content: null,
  },
  {
    name: 'Trayectoria',
    planetPos: [-12, 3, 0],
    cameraPos: [-6, 3, 8],
    focusDepth: 0.02,
    title: '',
    content: null,
  },
  {
    name: 'Habilidades',
    planetPos: [6, -2, -1],
    cameraPos: [6, -2, 8],
    focusDepth: 0.02,
    title: '',
    content: null,
  },
  {
    name: 'Proyectos',
    planetPos: [-6, 3, -1],
    cameraPos: [-6, 3, 8],
    focusDepth: 0.02,
    title: '',
    content: null,
  },
  {
    name: 'Certificaciones',
    planetPos: [6, -3, 1],
    cameraPos: [6, -3, 9],
    focusDepth: 0.021,
    title: '',
    content: null,
  },
  {
    name: 'Contacto',
    planetPos: [-5, -3, -1],
    cameraPos: [-5, -3, 8],
    focusDepth: 0.02,
    title: '',
    content: null,
  },
];

/**
 * Componente principal que gestiona el estado de navegación y renderizado de la escena 3D.
 * Flujo de estados: start → overviewMode → navegación (selección planeta) → zoomMode → focusMode (mostrar contenido).
 */
export default function Home() {
  const [start, setStart] = useState(false); // Pantalla de entrada con botón "Comenzar"
  const [overviewMode, setOverviewMode] = useState(true); // Vista amplia del universo mostrando todos los planetas
  const [planetIndex, setPlanetIndex] = useState(0); // Planeta actualmente seleccionado (0-5)
  const [focusMode, setFocusMode] = useState(false); // Panel de contenido visible en lado derecho
  const [zoomMode, setZoomMode] = useState(false); // Estado de transición antes de mostrar contenido
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPlanetPosition, setCurrentPlanetPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [language, setLanguage] = useState<Language>('es'); // Idioma actual

  const t = translations[language]; // Traducciones actuales

  // Nombres de planetas traducidos (en orden: Sobre mí, Trayectoria, Habilidades, Proyectos, Certificaciones, Contacto)
  const planetNames = React.useMemo(
    () => [
      t.planets.aboutMe,
      t.planets.journey,
      t.planets.skills,
      t.planets.projects,
      t.planets.certifications,
      t.planets.contact,
    ],
    [
      t.planets.aboutMe,
      t.planets.journey,
      t.planets.skills,
      t.planets.projects,
      t.planets.certifications,
      t.planets.contact,
    ],
  );

  // Actualizar título del documento según la sección actual
  useEffect(() => {
    const baseTitle = 'Daniela Coavas';
    if (focusMode && planetNames[planetIndex]) {
      document.title = `${planetNames[planetIndex]} | ${baseTitle}`;
    } else {
      document.title = `${baseTitle} | Full Stack Developer`;
    }
  }, [focusMode, planetIndex, planetNames]);

  // Clonar planetsData y actualizar el contenido con traducciones
  const planets = React.useMemo(() => {
    const clonedPlanets = [...planetsData];

    // Actualizar el planeta Sobre mí (índice 0)
    if (clonedPlanets[0]) {
      clonedPlanets[0] = {
        ...clonedPlanets[0],
        content: (
          <div className="relative h-full space-y-4 overflow-y-auto px-3 py-3 sm:space-y-6 sm:px-4 sm:py-4 md:px-6">
            {/* Header con foto */}
            <div
              className="group animate-fadeIn relative overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.1s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 sm:p-5 md:bg-black/40 md:p-6">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                  <div className="relative shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-amber-400/50 shadow-2xl sm:h-20 sm:w-20 md:h-24 md:w-24">
                      <Image
                        src="/projects/imagenDaniela.jpg"
                        alt="Daniela Sophia Coavas Barboza"
                        fill
                        sizes="(max-width: 768px) 80px, 96px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-[3px] border-black bg-emerald-400 shadow-lg sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h1 className="mb-1 text-xl font-bold text-white sm:mb-2 sm:text-2xl md:text-xl lg:text-2xl">
                      Daniela Sophia Coavas Barboza
                    </h1>
                    <p className="mb-2 text-xs text-slate-300 sm:mb-3 sm:text-sm md:text-xs lg:text-sm">
                      {language === 'es'
                        ? 'Desarrolladora Full Stack Junior | Freelancer'
                        : 'Junior Full Stack Developer | Freelancer'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="animate-pulse rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                        • {t.about.available}
                      </span>
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                        {t.about.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen profesional */}
            <div
              className="group animate-fadeIn relative overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.25s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 md:bg-black/40">
                <div className="mb-3 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h3 className="text-base font-bold tracking-wider text-white uppercase">
                    {t.about.summary}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{t.about.summaryText}</p>
              </div>
            </div>

            {/* Grid de logros */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {/* Universidad EAN */}
              <div
                className="group animate-fadeIn relative overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.4s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-4 md:bg-black/40">
                  <svg
                    className="mb-2 h-6 w-6 text-indigo-300 sm:mb-3 sm:h-7 sm:w-7 md:h-8 md:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                  <p className="mb-1 text-xs font-semibold text-slate-500 uppercase">
                    {t.about.student}
                  </p>
                  <p className="mb-1 text-sm font-semibold text-white sm:text-base">
                    {t.about.degree}
                  </p>
                  <p className="text-xs text-slate-400 sm:text-sm">{t.about.university}</p>
                </div>
              </div>

              {/* AWS Certification */}
              <div
                className="group animate-fadeIn relative overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.5s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-4 md:bg-black/40">
                  <svg
                    className="mb-2 h-6 w-6 text-violet-300 sm:mb-3 sm:h-7 sm:w-7 md:h-8 md:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  <p className="mb-1 text-xs font-semibold text-slate-500 uppercase">
                    {t.about.certification}
                  </p>
                  <p className="mb-1 text-sm font-semibold text-white sm:text-base">
                    {t.about.awsCertified}
                  </p>
                  <p className="text-xs text-slate-400 sm:text-sm">{t.about.awsYear}</p>
                </div>
              </div>

              {/* Full Stack Bootcamp */}
              <div
                className="group animate-fadeIn relative overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.6s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-4 md:bg-black/40">
                  <svg
                    className="mb-2 h-6 w-6 text-blue-300 sm:mb-3 sm:h-7 sm:w-7 md:h-8 md:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <p className="mb-1 text-xs font-semibold text-slate-500 uppercase">
                    {t.about.bootcamp}
                  </p>
                  <p className="mb-1 font-semibold text-white">{t.about.bootcampTitle}</p>
                  <p className="text-sm text-slate-400">{t.about.bootcampInstitute}</p>
                </div>
              </div>

              {/* Women in Cloud */}
              <div
                className="group animate-fadeIn relative overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.7s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 md:bg-black/40">
                  <svg
                    className="mb-3 h-8 w-8 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="mb-1 text-xs font-semibold text-slate-500 uppercase">
                    {t.about.leadership}
                  </p>
                  <p className="mb-1 font-semibold text-white">{t.about.womenInCloud}</p>
                  <p className="text-sm text-slate-400">{t.about.awsCloudClub}</p>
                </div>
              </div>
            </div>

            {/* Sección de descarga de CV */}
            <div
              className="group animate-fadeIn relative overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.85s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 md:bg-black/40">
                <div className="mb-4 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-base font-bold tracking-wider text-white uppercase">
                    {t.about.cvTitle}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-slate-300">{t.about.cvDescription}</p>

                <div className="flex flex-wrap gap-3">
                  {/* CV en Español */}
                  <a
                    href="/CV_2026_ES.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative flex items-center gap-2 rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-4 py-2.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span className="font-medium">{t.about.cvSpanish}</span>
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">PDF</span>
                  </a>

                  {/* CV en Inglés */}
                  <a
                    href="/CV_2026_ENG.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative flex items-center gap-2 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-4 py-2.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span className="font-medium">{t.about.cvEnglish}</span>
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ),
      };
    }

    // Actualizar el planeta Trayectoria (índice 1)
    if (clonedPlanets[1]) {
      clonedPlanets[1] = {
        ...clonedPlanets[1],
        content: (
          <div className="relative h-full space-y-4 overflow-x-hidden overflow-y-auto py-3 pr-2 sm:space-y-5 sm:py-4 sm:pr-3 md:space-y-6 md:py-6 md:pr-4">
            {/* Cards horizontales modernas */}
            {[
              {
                title: t.journey.systemsEngineering,
                subtitle: t.journey.eanUniversity,
                year: language === 'es' ? '2024 - Actualidad' : '2024 - Present',
                badge: t.journey.currentSemester,
                desc: t.journey.systemsDesc,
                icon: (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v6.5"
                    />
                  </svg>
                ),
                color: 'indigo',
              },
              {
                title: t.journey.womenInCloud,
                subtitle: t.journey.awsCloudClub,
                year: language === 'es' ? '2025 - Actualidad' : '2025 - Present',
                desc: t.journey.womenDesc,
                icon: (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                ),
                color: 'blue',
              },
              {
                title: t.journey.awsCertified,
                subtitle: t.journey.amazonWebServices,
                year: t.journey.year2025,
                desc: t.journey.awsDesc,
                icon: (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                ),
                color: 'amber',
              },
              {
                title: t.journey.fullStackBootcamp,
                subtitle: t.journey.bitInstitute,
                year: t.journey.dateRange,
                desc: t.journey.bootcampDesc,
                icon: (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806A3.42 3.42 0 0120.1 7.835a3.42 3.42 0 01.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806A3.42 3.42 0 013.1 15.165 3.42 3.42 0 012.294 13.22a3.42 3.42 0 010-4.438A3.42 3.42 0 013.1 6.835a3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
                color: 'purple',
              },
              {
                title: t.journey.aiDevelopment,
                subtitle: t.journey.ibmCoursera,
                year: t.journey.year2024,
                desc: t.journey.aiDesc,
                icon: (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                color: 'cyan',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group perspective-1000 animate-fadeIn relative opacity-0"
                style={{
                  animation: `fadeIn 0.6s ease-out ${0.1 + index * 0.12}s forwards`,
                }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-0.5 bg-linear-to-r from-${item.color}-600 to-${item.color}-500 rounded-2xl opacity-0 blur transition duration-500 group-hover:opacity-60`}
                />

                {/* Card - más transparente */}
                <div
                  className={`relative bg-${item.color}-950/20 border border-${item.color}-800/30 rounded-2xl p-3 backdrop-blur-xl transition-all duration-500 sm:p-4 md:p-5 lg:p-6 hover:border-${item.color}-700/50 hover:shadow-2xl hover:shadow-${item.color}-600/20 hover:-translate-y-2`}
                >
                  {/* Header con icono y badge */}
                  <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
                      <div
                        className={`h-10 w-10 rounded-xl sm:h-12 sm:w-12 md:h-14 md:w-14 bg-${item.color}-900/60 border border-${item.color}-700/60 flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 text-${item.color}-300 shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`mb-0.5 text-base font-bold text-white sm:mb-1 sm:text-lg group-hover:text-${item.color}-200 transition-colors`}
                        >
                          {item.title}
                        </h3>
                        <p className="truncate text-xs text-slate-400 sm:text-sm">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="shrink-0 rounded-full border border-emerald-700/50 bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p className="mb-2 text-xs leading-relaxed text-slate-300 sm:mb-3 sm:text-sm">
                    {item.desc}
                  </p>

                  {/* Año */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 sm:gap-2">
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {item.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      };
    }

    // Actualizar el planeta Skills (índice 2)
    if (clonedPlanets[2]) {
      clonedPlanets[2] = {
        ...clonedPlanets[2],
        content: <SkillsCarousel translations={t.skills} language={language} />,
      };
    }

    // Actualizar el planeta Projects (índice 3) - necesita modificar ProjectsContent
    if (clonedPlanets[3]) {
      clonedPlanets[3] = {
        ...clonedPlanets[3],
        content: <ProjectsContent translations={t.projects} />,
      };
    }

    // Actualizar el planeta Certifications (índice 4)
    if (clonedPlanets[4]) {
      clonedPlanets[4] = {
        ...clonedPlanets[4],
        content: (
          <div className="relative flex h-full flex-col justify-center space-y-2 px-3 py-2 sm:space-y-2.5 sm:px-4 sm:py-3 md:px-6">
            {/* AWS Cloud Practitioner */}
            <a
              href="https://www.credly.com/badges/5e711328-7f2e-4b42-b67e-84e69f017ff1/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-fadeIn relative block overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.1s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-orange-500/20 via-amber-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-orange-500/20 sm:p-3.5 md:bg-black/40">
                <div className="mb-2 flex items-start justify-between gap-2 sm:mb-2.5 sm:gap-3 md:gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 text-sm font-bold text-white sm:mb-1 sm:text-base">
                      {t.certifications.awsTitle}
                    </h3>
                    <p className="mb-0.5 text-xs text-slate-300 sm:text-sm">
                      {t.certifications.awsOrg}
                    </p>
                    <p className="text-xs text-slate-500">{t.certifications.year2025}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 backdrop-blur-sm sm:px-2.5 sm:py-1">
                    {t.certifications.valid}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/40 bg-orange-600/20 px-3 py-1.5 text-xs font-medium text-orange-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-orange-400/60 hover:bg-orange-600/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                  <svg
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.certifications.viewBadge}
                </div>
              </div>
            </a>

            {/* Full Stack Developer - BIT Institute */}
            <div
              className="group animate-fadeIn relative block overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.25s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-indigo-500/20 via-violet-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-indigo-500/20 sm:p-3.5 md:bg-black/40">
                <div className="mb-2 flex items-start justify-between gap-2 sm:mb-2.5 sm:gap-3 md:gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 text-sm font-bold text-white sm:mb-1 sm:text-base">
                      {t.certifications.fullStackTitle}
                    </h3>
                    <p className="mb-0.5 text-sm text-slate-300">{t.certifications.fullStackOrg}</p>
                    <p className="text-xs text-slate-500">{t.certifications.year2025}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
                    {t.certifications.valid}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://bit.learn.ada-school.org/certifications/686597f9443dfd1abec6ccd7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-4 py-2 text-sm font-medium text-indigo-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-400/60 hover:bg-indigo-600/30"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {t.certifications.viewCertificate}
                  </a>
                  <a
                    href="/projects/FullStackBIT.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-400/50 hover:bg-indigo-600/20"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.certifications.viewPdf}
                  </a>
                </div>
              </div>
            </div>

            {/* Inglés C1 - Cambridge Linguaskill */}
            <a
              href="/projects/Ingles.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-fadeIn relative block overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.55s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-green-500/20 via-emerald-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-green-500/20 md:bg-black/40">
                <div className="mb-2.5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">
                      {t.certifications.englishTitle}
                    </h3>
                    <p className="mb-0.5 text-sm text-slate-300">{t.certifications.englishOrg}</p>
                    <p className="text-xs text-slate-500">{t.certifications.year2026}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
                    {t.certifications.valid}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-600/20 px-4 py-2 text-sm font-medium text-green-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-400/60 hover:bg-green-600/30">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {t.certifications.viewPdf}
                </div>
              </div>
            </a>

            {/* Francés B2 - SMART */}
            <a
              href="/projects/Frances.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-fadeIn relative block overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.7s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-rose-500/20 via-pink-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-rose-500/20 md:bg-black/40">
                <div className="mb-2.5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">
                      {t.certifications.frenchTitle}
                    </h3>
                    <p className="mb-0.5 text-sm text-slate-300">{t.certifications.frenchOrg}</p>
                    <p className="text-xs text-slate-500">{t.certifications.year2026}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
                    {t.certifications.valid}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-600/20 px-4 py-2 text-sm font-medium text-rose-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-rose-400/60 hover:bg-rose-600/30">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {t.certifications.viewPdf}
                </div>
              </div>
            </a>

            {/* AI Developer - IBM */}
            <a
              href="https://www.credly.com/badges/dee28785-a30c-4f87-925f-879e807a0024/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-fadeIn relative block overflow-visible opacity-0"
              style={{ animation: 'fadeIn 0.6s ease-out 0.85s forwards' }}
            >
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-blue-500/20 md:bg-black/40">
                <div className="mb-2.5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">
                      {t.certifications.aiTitle}
                    </h3>
                    <p className="mb-0.5 text-sm text-slate-300">{t.certifications.aiOrg}</p>
                    <p className="text-xs text-slate-500">{t.certifications.year2024}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
                    {t.certifications.valid}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-200 shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400/60 hover:bg-blue-600/30">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.certifications.viewBadge}
                </div>
              </div>
            </a>
          </div>
        ),
      };
    }

    // Actualizar el planeta de contacto (índice 5) con el formulario que tiene traducciones
    if (clonedPlanets[5]) {
      clonedPlanets[5] = {
        ...clonedPlanets[5],
        content: (
          <div className="relative h-full space-y-4 overflow-y-auto px-3 py-3 sm:space-y-6 sm:px-4 sm:py-4 md:px-6">
            {/* Título de sección */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                {t.contact.subtitle}
              </h2>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
                {t.contact.description}
              </p>
            </div>

            {/* Información de Contacto - Tarjetas modernas */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:danielacoavas@gmail.com"
                className="group animate-fadeIn relative block overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.1s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-blue-500/20 sm:p-4 md:bg-black/40 md:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/20 sm:h-12 sm:w-12">
                      <svg
                        className="h-5 w-5 text-blue-300 sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        {t.contact.email}
                      </p>
                      <p className="truncate text-sm font-medium text-white sm:text-base">
                        danielacoavas@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/daniela-coavas-desarrolladoraweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-fadeIn relative block overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.25s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-blue-600/20 via-blue-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-blue-600/20 sm:p-4 md:bg-black/40 md:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/20 sm:h-12 sm:w-12">
                      <svg
                        className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        {t.contact.linkedin}
                      </p>
                      <p className="truncate text-sm font-medium text-white sm:text-base">
                        daniela-coavas-desarrolladoraweb
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-blue-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/dannysophi17"
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-fadeIn relative block overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.4s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-purple-500/20 via-pink-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-purple-500/20 sm:p-4 md:bg-black/40 md:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/20 sm:h-12 sm:w-12">
                      <svg
                        className="h-5 w-5 text-purple-300 sm:h-6 sm:w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        {t.contact.github}
                      </p>
                      <p className="font-medium text-white">dannysophi17</p>
                    </div>
                    <svg
                      className="h-5 w-5 text-purple-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Ubicación */}
              <div
                className="group animate-fadeIn relative overflow-visible opacity-0"
                style={{ animation: 'fadeIn 0.6s ease-out 0.55s forwards' }}
              >
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-emerald-500/20 via-green-500/20 to-transparent opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black/70 to-blue-950/20 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-emerald-500/20 sm:p-4 md:bg-black/40 md:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/20 sm:h-12 sm:w-12">
                      <svg
                        className="h-5 w-5 text-emerald-300 sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        {t.contact.location}
                      </p>
                      <p className="font-medium text-white">{t.contact.locationValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold text-white">{t.contact.sendMessage}</h3>
                <ContactForm translations={t.contact} />
              </div>
            </div>
          </div>
        ),
      };
    }
    return clonedPlanets;
  }, [language, t]);

  // Parallax effect
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const returnToOverview = () => {
    setFocusMode(false);
    setZoomMode(false);
    setOverviewMode(true);
  };

  const enterPlanet = () => {
    // En mobile, ir directo al focusMode sin animación de zoom
    const isMobile = window.innerWidth < 768;
    setOverviewMode(false);

    if (isMobile) {
      setFocusMode(true);
    } else {
      // En desktop, hacer zoom al planeta primero
      setZoomMode(true);
      // Después de 0.4 segundos, mostrar la información
      setTimeout(() => {
        setFocusMode(true);
      }, 400);
    }
  };

  const exitPlanet = () => {
    setFocusMode(false);
    setZoomMode(false);
  };

  const handlePlanetClick = (index: number) => {
    setOverviewMode(false); // Salir de vista amplia
    setPlanetIndex(index);

    // En mobile, ir directo al focusMode sin animación de zoom
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setFocusMode(true);
    } else {
      setZoomMode(true);
      setTimeout(() => {
        setFocusMode(true);
      }, 400);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* PANTALLA DE INICIO - Solo estrellas y botón Comenzar */}
      {!start && (
        <>
          <div className="absolute inset-0">
            <IntroStars />
          </div>

          {/* Selector de idioma en la esquina superior derecha */}
          <div className="absolute top-4 right-4 z-60 sm:top-6 sm:right-6 md:top-10 md:right-10">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          </div>

          {/* Anuncio de cambio de idioma - animado */}
          <div className="absolute top-18 right-4 z-50 animate-[fadeInOut_8s_ease-in-out_infinite] sm:top-24 sm:right-10">
            <div className="group relative animate-[floatAnnouncement_3s_ease-in-out_infinite]">
              {/* Glow effect */}
              <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-50 blur-lg transition duration-500 group-hover:opacity-75" />

              {/* Content */}
              <div className="relative flex items-center gap-2 rounded-2xl border border-white/20 bg-black/60 px-4 py-2.5 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-3">
                {/* Icon */}
                <svg
                  className="h-4 w-4 animate-bounce text-blue-400 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>

                {/* Text */}
                <span className="text-xs font-medium text-white/90 sm:text-sm">
                  {t.languageAnnouncement}
                </span>

                {/* Arrow pointing up */}
                <svg
                  className="h-3 w-3 animate-pulse text-white/60 sm:h-4 sm:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 z-60 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <button
              onClick={() => setStart(true)}
              className="animate-startFloat cursor-pointer rounded-full bg-white/5 px-8 py-3 text-center text-base font-light tracking-wide whitespace-nowrap text-white shadow-[0_0_40px_rgba(255,255,255,0.45)] transition-all duration-700 hover:scale-[1.08] sm:px-10 sm:py-3.5 sm:text-lg md:px-12 md:py-4"
            >
              {t.start}
            </button>
          </div>
        </>
      )}

      {/* CONTENIDO PRINCIPAL - Solo se muestra después de presionar Comenzar */}
      {start && (
        <>
          {/* TÍTULO PRINCIPAL — APPLE VISION PRO STYLE */}
          <div
            className={`absolute top-20 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ease-out ${
              focusMode
                ? 'pointer-events-none -translate-y-8 opacity-0'
                : 'animate-fadeIn translate-y-0 opacity-100'
            }`}
          >
            <div className="space-y-5 text-center select-none">
              {/* CONTENEDOR CINEMÁTICO */}
              <div className="relative flex flex-col items-center">
                {/* NEBLINA / AURORA */}
                <div className="absolute -inset-20 animate-[pulseAurora_6s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,_rgba(140,90,255,0.25),_transparent_70%)] opacity-70 blur-3xl" />

                {/* TITULO */}
                <h1 className="xs:text-5xl relative animate-[titlePop_1.4s_ease-out] bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text px-4 font-['SF_Pro_Display'] text-4xl font-semibold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] sm:text-6xl md:text-7xl lg:text-8xl">
                  {t.title}
                </h1>

                {/* LÍNEA ANIMADA SUBTIL */}
                <div className="mt-3 h-[2px] w-16 animate-[lineGlow_3s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* SUBTITULO */}
                <p className="xs:text-lg mt-3 animate-[fadeIn_1.6s_ease-out] bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 bg-clip-text px-4 text-center text-base font-light tracking-wide text-transparent sm:text-xl md:text-2xl">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Overlay derecha en focus - Oculto en móvil con transición suave */}
          {focusMode && (
            <div className="animate-fadeIn pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-1/2 bg-black/40 backdrop-blur-xl transition-opacity duration-700 ease-in-out md:block" />
          )}

          {/* Selector de idioma - oculto en mobile cuando está en focusMode */}
          <div
            className={`absolute top-4 right-4 z-[100] sm:top-6 sm:right-6 md:top-10 md:right-10 ${focusMode ? 'hidden md:block' : ''}`}
          >
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          </div>

          {/* Botón para empezar recorrido en overview mode */}
          {!focusMode && overviewMode && (
            <>
              <div className="absolute bottom-32 left-1/2 z-40 -translate-x-1/2 sm:top-6 sm:bottom-auto sm:left-6 sm:translate-x-0 md:top-10 md:left-10">
                {/* Efecto de brillo en mobile */}
                <div className="absolute -inset-2 animate-pulse rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 opacity-60 blur-xl sm:hidden" />

                <button
                  onClick={() => {
                    setOverviewMode(false);
                    setPlanetIndex(0);
                  }}
                  className="group relative flex cursor-pointer items-center gap-1.5 rounded-full border border-white/30 bg-black/50 px-4 py-2.5 text-xs font-medium text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out hover:scale-105 hover:border-white/40 hover:bg-black/60 sm:gap-2 sm:border-white/20 sm:bg-black/40 sm:px-4 sm:py-2.5 sm:text-sm sm:shadow-lg md:px-5 md:py-2.5"
                  style={{ animation: 'fadeIn 0.6s ease-out 0.3s forwards' }}
                  aria-label={t.startJourney}
                >
                  <svg
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.startJourney}
                </button>
              </div>

              {/* Anuncio para empezar recorrido - solo visible en tablets y escritorio */}
              <div className="absolute top-16 left-4 z-30 hidden animate-[fadeInOut_8s_ease-in-out_infinite] sm:top-20 sm:left-6 md:top-24 md:left-10 md:block">
                <div className="group relative animate-[floatAnnouncement_3s_ease-in-out_infinite]">
                  {/* Efecto de brillo */}
                  <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 opacity-50 blur-lg transition duration-500 group-hover:opacity-75" />

                  {/* Contenido */}
                  <div className="relative flex items-center gap-2 rounded-2xl border border-white/20 bg-black/60 px-4 py-2.5 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-3">
                    {/* Flecha apuntando arriba */}
                    <svg
                      className="h-4 w-4 animate-bounce text-emerald-400 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>

                    {/* Texto */}
                    <span className="text-xs font-medium text-white/90 sm:text-sm">
                      {t.journeyAnnouncement}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botón para volver a vista amplia */}
          <button
            onClick={returnToOverview}
            className={`group absolute top-4 left-4 z-40 flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl transition-all duration-500 ease-out hover:scale-105 hover:border-white/40 hover:bg-black/60 sm:top-6 sm:left-6 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:top-10 md:left-10 md:px-5 md:py-2.5 ${
              focusMode || overviewMode
                ? 'pointer-events-none -translate-x-8 opacity-0'
                : 'translate-x-0 opacity-100'
            }`}
            aria-label={t.overviewMode}
          >
            <svg
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden sm:inline">{t.overviewMode}</span>
            <span className="sm:hidden">{language === 'es' ? 'Universo' : 'Universe'}</span>
          </button>

          {/* NAVEGACIÓN CON FLECHAS */}
          {!focusMode && !zoomMode && !overviewMode && (
            <>
              <div className="absolute bottom-32 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:bottom-20 sm:gap-3 md:bottom-10 md:gap-4">
                <button
                  onClick={() =>
                    setPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1))
                  }
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-black/60 sm:h-11 sm:w-11 sm:text-xl md:h-12 md:w-12 md:text-2xl"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ‹
                  </span>
                </button>

                <button
                  onClick={enterPlanet}
                  className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-black/60 sm:gap-2 sm:px-6 sm:py-3 md:gap-3 md:px-8 md:py-4"
                >
                  <div
                    className="h-2.5 w-2.5 animate-pulse rounded-full transition-all duration-300 group-hover:scale-125 sm:h-3 sm:w-3"
                    style={{
                      backgroundColor:
                        planetIndex === 0
                          ? '#FFD700'
                          : planetIndex === 1
                            ? '#6A4FA3'
                            : planetIndex === 2
                              ? '#A18BCF'
                              : planetIndex === 3
                                ? '#5D9A9A'
                                : planetIndex === 4
                                  ? '#D4A5A5'
                                  : planetIndex === 5
                                    ? '#E4C88A'
                                    : '#DCD6F7',
                      boxShadow: `0 0 15px ${
                        planetIndex === 0
                          ? '#FFD700'
                          : planetIndex === 1
                            ? '#6A4FA3'
                            : planetIndex === 2
                              ? '#A18BCF'
                              : planetIndex === 3
                                ? '#5D9A9A'
                                : planetIndex === 4
                                  ? '#D4A5A5'
                                  : planetIndex === 5
                                    ? '#E4C88A'
                                    : '#DCD6F7'
                      }`,
                    }}
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-white group-hover:text-white/90 sm:text-sm md:text-base">
                      {planetNames[planetIndex]}
                    </span>
                    <span className="text-[10px] font-medium text-white/60 sm:text-[11px] md:text-xs">
                      <span className="hidden sm:inline">
                        {planetIndex + 1} {language === 'es' ? 'de' : 'of'} {planets.length} •{' '}
                      </span>
                      {t.clickExplore}
                    </span>
                  </div>
                  <svg
                    className="h-3.5 w-3.5 text-white/70 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4 md:h-5 md:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Flecha Derecha - al lado de la barra */}
                <button
                  onClick={() =>
                    setPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1))
                  }
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-black/60 sm:h-11 sm:w-11 sm:text-xl md:h-12 md:w-12 md:text-2xl"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                </button>
              </div>
            </>
          )}

          {/* PANEL DE INFORMACIÓN - Pantalla completa en móvil, mitad derecha en desktop */}
          {focusMode && (
            <div className="animate-slideInRight absolute inset-0 z-40 flex h-full w-full flex-col bg-black will-change-transform md:right-0 md:left-auto md:w-2/3 md:bg-transparent lg:w-1/2">
              {/* Estrellas borrosas de fondo - Solo en mobile */}
              <div className="absolute inset-0 opacity-30 md:hidden">
                <div
                  className="absolute top-[10%] left-[15%] h-1 w-1 animate-pulse rounded-full bg-white blur-sm"
                  style={{ animationDelay: '0s' }}
                />
                <div
                  className="absolute top-[25%] right-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-200 blur-sm"
                  style={{ animationDelay: '1s' }}
                />
                <div
                  className="absolute top-[45%] left-[25%] h-1 w-1 animate-pulse rounded-full bg-purple-200 blur-sm"
                  style={{ animationDelay: '2s' }}
                />
                <div
                  className="absolute top-[60%] right-[30%] h-1 w-1 animate-pulse rounded-full bg-white blur-sm"
                  style={{ animationDelay: '1.5s' }}
                />
                <div
                  className="absolute top-[75%] left-[35%] h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-200 blur-sm"
                  style={{ animationDelay: '0.5s' }}
                />
                <div
                  className="absolute top-[15%] right-[40%] h-1 w-1 animate-pulse rounded-full bg-white blur-sm"
                  style={{ animationDelay: '2.5s' }}
                />
                <div
                  className="absolute top-[35%] left-[10%] h-1 w-1 animate-pulse rounded-full bg-cyan-200 blur-sm"
                  style={{ animationDelay: '1.2s' }}
                />
                <div
                  className="absolute top-[80%] right-[15%] h-1 w-1 animate-pulse rounded-full bg-white blur-sm"
                  style={{ animationDelay: '0.8s' }}
                />
              </div>

              {/* Máscara de difuminado hacia el universo - Solo en desktop */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-linear-to-r from-transparent via-transparent to-transparent transition-opacity duration-700 ease-in-out md:block"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 100%)',
                }}
              />

              {/* Fondo del panel con difuminado suave - Más opaco en móvil para legibilidad */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-950/95 via-purple-950/90 to-black/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:from-indigo-950/3 md:via-purple-950/2 md:to-black/5 md:duration-700" />

              {/* Gradiente de fondo sutil que se integra con el universo */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.02),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.02),_transparent_50%)] transition-opacity duration-700" />

              {/* Header con botón volver y nombre de sección - STICKY */}
              <div
                className="pointer-events-auto sticky top-0 right-0 left-0 z-50 flex items-center gap-3 bg-linear-to-b from-black/95 via-black/90 to-transparent px-4 py-3 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-3 sm:px-6 sm:py-4 md:from-black/80 md:via-black/60 md:px-8 md:py-6"
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                <button
                  onClick={exitPlanet}
                  className="group flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-white/40 hover:bg-black/80 sm:gap-2 sm:px-4 sm:text-sm md:px-5 md:py-2.5"
                  aria-label={t.back}
                >
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180 sm:h-4 sm:w-4"
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
                </button>

                {/* Nombre de la sección */}
                <div className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/70 px-3 py-1.5 shadow-lg backdrop-blur-xl sm:px-4 sm:py-2 md:flex-initial">
                  {/* Brillo sutil animado */}
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  <div
                    className={`z-10 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${
                      planetIndex === 0
                        ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                        : planetIndex === 1
                          ? 'bg-purple-400 shadow-lg shadow-purple-400/50'
                          : planetIndex === 2
                            ? 'bg-violet-400 shadow-lg shadow-violet-400/50'
                            : planetIndex === 3
                              ? 'bg-teal-400 shadow-lg shadow-teal-400/50'
                              : planetIndex === 4
                                ? 'bg-rose-400 shadow-lg shadow-rose-400/50'
                                : planetIndex === 5
                                  ? 'bg-amber-300 shadow-lg shadow-amber-300/50'
                                  : 'bg-purple-400 shadow-lg shadow-purple-400/50'
                    }`}
                  />
                  <span className="z-10 truncate text-xs font-bold text-white sm:text-sm">
                    {planetNames[planetIndex]}
                  </span>
                </div>
              </div>

              {/* Contenido con scroll */}
              <div
                className="animate-fadeInContent relative flex-1 overflow-y-auto px-3 pb-6 sm:px-6 sm:pb-8 md:px-12 lg:px-16 xl:px-20"
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                <div>{planets[planetIndex].content}</div>
              </div>
            </div>
          )}

          {/* CANVAS PRINCIPAL - Oculto inmediatamente en móvil, con transición en desktop */}
          <Canvas
            className={
              focusMode
                ? 'hidden md:block md:transition-opacity md:duration-700 md:ease-out'
                : 'transition-opacity duration-700 ease-in'
            }
            camera={{ position: [0, 8, 50], fov: 55 }}
          >
            <CameraController
              start={start}
              overviewMode={overviewMode}
              focusMode={focusMode}
              zoomMode={zoomMode}
              focusedPlanetPos={currentPlanetPosition}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              enableDamping={false}
            />

            <ParallaxBackground mousePosition={mousePosition} />

            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.2} />
            <pointLight
              position={[0, 0, 0]}
              intensity={3.5}
              color="#FFF4E0"
              distance={60}
              decay={2}
            />
            <hemisphereLight args={['#ffffff', '#444444', 0.8]} />

            {/* Efectos de post-procesamiento REMOVIDOS para evitar borrosidad */}

            <OrbitingPlanets
              focusMode={focusMode}
              zoomMode={zoomMode}
              planetIndex={planetIndex}
              onPlanetClick={handlePlanetClick}
              onPlanetPositionUpdate={setCurrentPlanetPosition}
            />
          </Canvas>
        </>
      )}
    </div>
  );
}
