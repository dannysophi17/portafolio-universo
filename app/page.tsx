"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Planet from "./components/Planet";
import Sun from "./components/Sun";
import CameraController from "./components/CameraController";
import IntroStars from "./components/IntroStars";
import OrbitingPlanets from "./components/OrbitingPlanets";
import ParallaxBackground from "./components/ParallaxBackground";
import ContactForm from "./components/ContactForm";
import SkillsCarousel from "./components/SkillsCarousel";

type PlanetInfo = {
  name: string;
  planetPos: [number, number, number];
  cameraPos: [number, number, number];
  title: string;
  content: React.ReactNode;
  focusDepth: number;
};

const planetsData: PlanetInfo[] = [
  {
    name: "Sobre mí",
    planetPos: [0, 0, 0],
    cameraPos: [0, 0, 15],
    focusDepth: 0.018,
    title: "",
    content: (
      <div className="flex h-full flex-col justify-center gap-8">
        {/* Header */}
        <div className="flex items-start gap-5">
          <div className="relative shrink-0">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-bold">D</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-400 border-[3px] border-black shadow-lg" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Daniela Sophia Coavas Barboza</h1>
            <p className="text-white/70 text-lg mb-4">Desarrolladora Full Stack Junior | Freelancer</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/25 text-indigo-200 text-sm font-medium backdrop-blur-sm">
                • Disponible para trabajar
              </span>
              <span className="px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-200 text-sm backdrop-blur-sm">
                Bogotá, Colombia
              </span>
            </div>
          </div>
        </div>

        {/* Resumen profesional */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300/70 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Resumen
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Desarrolladora Full Stack Junior certificada AWS Cloud Practitioner. Estudiante de Ingeniería de Sistemas (3er semestre) en la Universidad EAN. Líder Women in Cloud y Core Team del AWS Cloud Club EAN. Graduada del Bootcamp Full Stack de BIT Institute.
          </p>
        </div>
        
        {/* Grid de logros con iconos SVG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="group p-3 rounded-xl bg-indigo-500/5 border border-indigo-400/20 hover:bg-indigo-500/10 hover:border-indigo-400/30 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm animate-fadeIn">
            <svg className="w-8 h-8 mb-2 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <p className="text-xs text-white/50">Estudiante</p>
            <p className="text-base text-white font-semibold">Ingeniería de Sistemas</p>
            <p className="text-sm text-white/60">Universidad EAN</p>
          </div>
          
          <div className="group p-3 rounded-xl bg-violet-500/5 border border-violet-400/20 hover:bg-violet-500/10 hover:border-violet-400/30 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <svg className="w-8 h-8 mb-2 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <p className="text-xs text-white/50">Certificación</p>
            <p className="text-base text-white font-semibold">AWS Certified</p>
            <p className="text-sm text-white/60">Cloud Practitioner 2025</p>
          </div>
          
          <div className="group p-3 rounded-xl bg-blue-600/5 border border-blue-500/20 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <svg className="w-8 h-8 mb-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <p className="text-xs text-white/50">Bootcamp</p>
            <p className="text-base text-white font-semibold">Full Stack Developer</p>
            <p className="text-sm text-white/60">BIT Institute 2024</p>
          </div>
          
          <div className="group p-3 rounded-xl bg-purple-600/5 border border-purple-500/20 hover:bg-purple-600/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <svg className="w-8 h-8 mb-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xs text-white/50">Liderazgo</p>
            <p className="text-base text-white font-semibold">Women in Cloud</p>
            <p className="text-sm text-white/60">AWS Cloud Club EAN</p>
          </div>
        </div>
      </div>
    ),
  },
  {
  name: "Trayectoria",
  planetPos: [-6, 3, -1],
  cameraPos: [-6, 3, 8],
  focusDepth: 0.02,
  title: "Mi Trayectoria",
  content: (
    <div className="relative h-full overflow-y-auto overflow-x-hidden pr-4 py-6 space-y-6">
      {/* Cards horizontales modernas */}
      {[
        {
          title: "Ingeniería de Sistemas",
          subtitle: "Universidad EAN",
          year: "2024 - Actualidad",
          badge: "3er Semestre",
          desc: "Formación enfocada en desarrollo de software, análisis de sistemas y arquitectura de soluciones. Énfasis en programación full stack y computación en la nube.",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v6.5" />
            </svg>
          ),
          color: "indigo",
        },
        {
          title: "Líder Women in Cloud & Core Team",
          subtitle: "AWS Cloud Club EAN",
          year: "2025 - Actualidad",
          desc: "Lidero la iniciativa Women in Cloud y organizo eventos para promover la participación femenina en tecnología. Cofacilitadora en sesiones técnicas de AWS, diseñando sesiones sobre fundamentos de AWS (Solutions Architect - Associate).",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
          color: "blue",
        },
        {
          title: "AWS Cloud Practitioner",
          subtitle: "Amazon Web Services",
          year: "2025",
          desc: "Certificación en fundamentos de cloud computing, servicios AWS y mejores prácticas de arquitectura en la nube.",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          ),
          color: "amber",
        },
        {
          title: "Bootcamp Full Stack Developer",
          subtitle: "BIT Institute",
          year: "febrero 2025 - julio 2025",
          desc: "Bootcamp intensivo de 400 horas orientado al desarrollo web Full Stack con el ecosistema MEAN (MongoDB, ExpressJS, Angular y NodeJS). Aplicación de metodologías ágiles (SCRUM), control de versiones con Git y desarrollo de aplicación web completa.",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806A3.42 3.42 0 0120.1 7.835a3.42 3.42 0 01.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806A3.42 3.42 0 013.1 15.165 3.42 3.42 0 012.294 13.22a3.42 3.42 0 010-4.438A3.42 3.42 0 013.1 6.835a3.42 3.42 0 013.138-3.138z" />
            </svg>
          ),
          color: "purple",
        },
        {
          title: "Desarrollo con IA",
          subtitle: "IBM / Coursera",
          year: "2024",
          desc: "Especialización en integración de inteligencia artificial en aplicaciones modernas y machine learning.",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          color: "cyan",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="group relative perspective-1000 animate-fadeIn"
          style={{animationDelay: `${index * 0.1}s`}}
        >
          {/* Glow effect */}
          <div className={`absolute -inset-0.5 bg-linear-to-r from-${item.color}-600 to-${item.color}-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500`} />
          
          {/* Card - más transparente */}
          <div className={`relative bg-${item.color}-950/20 border border-${item.color}-800/30 rounded-2xl p-5 md:p-6 backdrop-blur-xl transition-all duration-500 hover:border-${item.color}-700/50 hover:shadow-2xl hover:shadow-${item.color}-600/20 hover:-translate-y-2`}>
            
            {/* Header con icono y badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}-900/60 border border-${item.color}-700/60 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-${item.color}-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-bold text-white mb-1 group-hover:text-${item.color}-200 transition-colors`}>{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.subtitle}</p>
                </div>
              </div>
              {item.badge && (
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-medium shrink-0">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {item.desc}
            </p>

            {/* Año */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.year}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
},
  {
    name: "Habilidades",
    planetPos: [6, -2, -1],
    cameraPos: [6, -2, 8],
    focusDepth: 0.02,
    title: "Habilidades Técnicas",
    content: <SkillsCarousel />,
  },
  {
    name: "Proyectos",
    planetPos: [-6, 3, -1],
    cameraPos: [-6, 3, 8],
    focusDepth: 0.02,
    title: "Proyectos Destacados",
    content: (
      <div className="relative h-full overflow-y-auto overflow-x-hidden pr-4 md:pr-6 py-4 space-y-6 md:space-y-7">
        {/* Arcade Task Manager - Tarjeta espacial 3D */}
        <div className="group relative perspective-1000 animate-fadeIn">
          <div className="absolute -inset-1 bg-linear-to-r from-slate-600 via-indigo-600 to-slate-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 animate-pulse-slow" />
          <div className="relative bg-slate-900/30 border border-slate-700/40 rounded-2xl p-5 md:p-6 backdrop-blur-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-indigo-600/40 transform-gpu hover:rotateX-2 hover:rotateY-1">
            {/* Efecto 3D interno */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-700/20 via-transparent to-indigo-700/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Partículas flotantes */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-400/60 animate-ping" />
            <div className="absolute bottom-8 right-12 w-1.5 h-1.5 rounded-full bg-slate-400/50 animate-pulse" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-5 gap-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-slate-800/70 border border-slate-700/70 flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg className="w-7 h-7 md:w-9 md:h-9 text-slate-300 group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-indigo-100 transition-colors">Arcade Task Manager</h3>
                    <p className="text-xs md:text-sm text-slate-400">Angular + Node.js + MongoDB</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/60 text-indigo-300 text-xs font-bold shadow-lg">2025</span>
              </div>
              
              <p className="text-white/85 mb-5 leading-relaxed">
                Aplicación web de una sola página (SPA) desarrollada en Angular 17 con autenticación JWT, protección de rutas con AuthGuard y operaciones CRUD completas para gestión de tareas. Integré APIs RESTful con Express.js y Axios, implementé estilos con SCSS y realicé el despliegue en Vercel.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {['Angular', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'SCSS', 'Axios'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs font-semibold hover:bg-slate-700/70 hover:border-slate-600/70 hover:scale-105 transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a href="https://github.com/dannysophi17/arcade-task-manager" target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-slate-600 to-slate-500 rounded-xl blur opacity-0 group-hover/btn:opacity-70 transition duration-300" />
                  <div className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/70 border border-slate-700/70 hover:bg-slate-700/80 hover:border-slate-600/80 transition-all duration-300">
                    <svg className="w-4 h-4 text-slate-300 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="text-sm font-bold text-slate-200">GitHub</span>
                  </div>
                </a>
                <a href="https://arcade-task-manager.vercel.app" target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-600 to-indigo-500 rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300" />
                  <div className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-900/60 border border-indigo-700/70 hover:bg-indigo-800/70 hover:border-indigo-600/80 transition-all duration-300">
                    <svg className="w-4 h-4 text-indigo-300 group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-sm font-bold text-indigo-200">Demo</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TechForge Solutions - Tarjeta espacial 3D */}
        <div className="group relative perspective-1000 animate-fadeIn" style={{animationDelay: '0.15s'}}>
          <div className="absolute -inset-1 bg-linear-to-r from-zinc-600 via-slate-600 to-zinc-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 animate-pulse-slow" />
          <div className="relative bg-zinc-900/30 border border-zinc-700/40 rounded-2xl p-5 md:p-6 backdrop-blur-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 hover:border-zinc-600/60 hover:shadow-2xl hover:shadow-zinc-600/40 transform-gpu hover:rotateX-2 hover:rotateY-1">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-700/20 via-transparent to-slate-700/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-zinc-400/60 animate-ping" />
            <div className="absolute bottom-8 right-12 w-1.5 h-1.5 rounded-full bg-slate-400/50 animate-pulse" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-5 gap-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-800/70 border border-zinc-700/70 flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <svg className="w-7 h-7 md:w-9 md:h-9 text-zinc-300 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-zinc-100 transition-colors">TechForge Solutions</h3>
                    <p className="text-xs md:text-sm text-slate-400">HTML5 + CSS3 + JavaScript</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/60 text-indigo-300 text-xs font-bold shadow-lg">2025</span>
              </div>
              
              <p className="text-white/85 mb-5 leading-relaxed">
                Página web estática desarrollada para TechForge Solutions, empresa de servicios tecnológicos, con el objetivo de mostrar su portafolio y fortalecer su presencia digital. Construido con HTML, CSS y JavaScript, usando estructura modular con componentes reutilizables. Diseño responsivo adaptable a distintos dispositivos y desplegado en Vercel.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 text-xs font-semibold hover:bg-zinc-700/70 hover:border-zinc-600/70 hover:scale-105 transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a href="https://github.com/dannysophi17/techforge-solutions" target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-zinc-600 to-zinc-500 rounded-xl blur opacity-0 group-hover/btn:opacity-70 transition duration-300" />
                  <div className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-800/70 border border-zinc-700/70 hover:bg-zinc-700/80 hover:border-zinc-600/80 transition-all duration-300">
                    <svg className="w-4 h-4 text-zinc-300 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="text-sm font-bold text-zinc-200">GitHub</span>
                  </div>
                </a>
                <a href="https://techforge-solutions.vercel.app" target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-600 to-indigo-500 rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300" />
                  <div className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-900/60 border border-indigo-700/70 hover:bg-indigo-800/70 hover:border-indigo-600/80 transition-all duration-300">
                    <svg className="w-4 h-4 text-indigo-300 group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-sm font-bold text-indigo-200">Sitio Web</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Certificaciones",
    planetPos: [0, -6, 1],
    cameraPos: [0, -6, 9],
    focusDepth: 0.021,
    title: "Certificaciones Profesionales",
    content: (
      <div className="relative h-full overflow-y-auto overflow-x-hidden pr-4 py-4 space-y-4 md:space-y-5">
        {/* AWS Cloud Practitioner */}
        <a href="https://www.credly.com/badges/your-aws-badge-id" target="_blank" rel="noopener noreferrer" className="group relative block animate-fadeIn">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-700 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-indigo-950/25 border border-indigo-800/40 backdrop-blur-xl hover:border-indigo-700/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-700/30">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:rotate-3 transition-all duration-500">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">AWS Certified Cloud Practitioner</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-1">Amazon Web Services</p>
              <p className="text-xs text-slate-500">2025</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-medium shrink-0">
              Vigente
            </div>
          </div>
        </a>

        {/* Bootcamp Full Stack */}
        <a href="https://bitinstitute.cl/certificados/your-certificate-id" target="_blank" rel="noopener noreferrer" className="group relative block animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <div className="absolute -inset-0.5 bg-linear-to-r from-slate-700 to-zinc-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-900/25 border border-slate-700/40 backdrop-blur-xl hover:border-slate-600/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-700/30">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:-rotate-3 transition-all duration-500">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-slate-200 transition-colors">Bootcamp Full Stack Developer</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-1">BIT Institute</p>
              <p className="text-xs text-slate-500">2025</p>
            </div>
          </div>
        </a>

        {/* IBM AI Development */}
        <a href="https://www.coursera.org/account/accomplishments/verify/your-certificate-id" target="_blank" rel="noopener noreferrer" className="group relative block animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <div className="absolute -inset-0.5 bg-linear-to-r from-zinc-700 to-slate-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-zinc-900/25 border border-zinc-700/40 backdrop-blur-xl hover:border-zinc-600/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-700/30">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:rotate-3 transition-all duration-500">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-zinc-200 transition-colors">Desarrollo con Inteligencia Artificial</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-1">IBM / Coursera</p>
              <p className="text-xs text-slate-500">2024</p>
            </div>
          </div>
        </a>

        {/* Certificado Inglés C1 */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="group relative block animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-700 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-blue-950/25 border border-blue-800/40 backdrop-blur-xl hover:border-blue-700/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/30">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-900/60 border border-blue-700/60 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:-rotate-3 transition-all duration-500">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">Inglés Nivel C1 - Avanzado</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-1">Duolingo English Test</p>
              <p className="text-xs text-slate-500">Certificado 2024</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-medium shrink-0">
              Vigente
            </div>
          </div>
        </a>

        {/* Certificado Francés A2 */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="group relative block animate-fadeIn" style={{animationDelay: '0.4s'}}>
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-700 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-purple-950/25 border border-purple-800/40 backdrop-blur-xl hover:border-purple-700/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-700/30">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-purple-900/60 border border-purple-700/60 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:rotate-3 transition-all duration-500">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">Francés Nivel A2 - Básico</h3>
              <p className="text-xs md:text-sm text-slate-400 mb-1">Educación EAN</p>
              <p className="text-xs text-slate-500">En progreso</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-medium shrink-0">
              Vigente
            </div>
          </div>
        </a>
      </div>
    ),
  },
  {
    name: "Contacto",
    planetPos: [-5, -3, -1],
    cameraPos: [-5, -3, 8],
    focusDepth: 0.02,
    title: "Contacto",
    content: (
      <div className="relative h-full overflow-y-auto overflow-x-hidden pr-6 py-4 space-y-8">
        {/* Formulario de contacto funcional */}
        <ContactForm />

        {/* Separador visual */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-4 text-slate-500">O contáctame directamente</span>
          </div>
        </div>

        {/* Información de Contacto - Tarjetas mejoradas */}
        <div className="space-y-4">
          <a href="mailto:danielacoavas@gmail.com" className="group relative block">
            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-700 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-indigo-950/60 border border-indigo-900/70 backdrop-blur-xl hover:border-indigo-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-700/30">
              <div className="w-14 h-14 rounded-xl bg-indigo-900/70 border border-indigo-800/70 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-7 h-7 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Email</p>
                <p className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">danielacoavas@gmail.com</p>
              </div>
              <svg className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a href="https://linkedin.com/in/daniela-coavas" target="_blank" rel="noopener noreferrer" className="group relative block">
            <div className="absolute -inset-0.5 bg-linear-to-r from-slate-600 to-zinc-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800/70 backdrop-blur-xl hover:border-slate-700/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-700/30">
              <div className="w-14 h-14 rounded-xl bg-slate-800/70 border border-slate-700/70 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:-rotate-3 transition-all duration-500">
                <svg className="w-7 h-7 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">LinkedIn</p>
                <p className="text-base font-bold text-white group-hover:text-slate-200 transition-colors">linkedin.com/in/daniela-coavas</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>

          <a href="https://github.com/dannysophi17" target="_blank" rel="noopener noreferrer" className="group relative block">
            <div className="absolute -inset-0.5 bg-linear-to-r from-zinc-600 to-slate-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/70 backdrop-blur-xl hover:border-zinc-700/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-zinc-700/30">
              <div className="w-14 h-14 rounded-xl bg-zinc-800/70 border border-zinc-700/70 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-7 h-7 text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">GitHub</p>
                <p className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">github.com/dannysophi17</p>
              </div>
              <svg className="w-5 h-5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-slate-600 to-zinc-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800/70 backdrop-blur-xl hover:border-slate-700/80 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-700/30">
              <div className="w-14 h-14 rounded-xl bg-slate-800/70 border border-slate-700/70 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Ubicación</p>
                <p className="text-base font-bold text-white">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  const [start, setStart] = useState(false);
  const [overviewMode, setOverviewMode] = useState(true); // Vista amplia inicial del universo
  const [planetIndex, setPlanetIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [zoomMode, setZoomMode] = useState(false); // Zoom antes de ver info
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPlanetPosition, setCurrentPlanetPosition] = useState<[number, number, number]>([0, 0, 0]);

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
  const [showZoomControls, setShowZoomControls] = useState(true);

  const planets = planetsData;

  const nextPlanet = () => {
    setOverviewMode(false); // Salir de vista amplia al navegar
    setPlanetIndex((prev) => (prev + 1) % planets.length);
  };

  const prevPlanet = () => {
    setOverviewMode(false); // Salir de vista amplia al navegar
    setPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
  };

  const returnToOverview = () => {
    setFocusMode(false);
    setZoomMode(false);
    setOverviewMode(true);
  };

  const enterPlanet = () => {
    // Salir de vista amplia y hacer zoom al planeta
    setOverviewMode(false);
    setZoomMode(true);
    // Después de 0.4 segundos, mostrar la información
    setTimeout(() => {
      setFocusMode(true);
    }, 400);
  };

  const exitPlanet = () => {
    setFocusMode(false);
    setZoomMode(false);
  };

  const handlePlanetClick = (index: number) => {
    setOverviewMode(false); // Salir de vista amplia
    setPlanetIndex(index);
    setZoomMode(true);
    setTimeout(() => {
      setFocusMode(true);
    }, 400);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* PANTALLA DE INICIO - Solo estrellas y botón Comenzar */}
      {!start && (
        <>
          <div className="absolute inset-0">
            <IntroStars />
          </div>

          <button
            onClick={() => setStart(true)}
            className="
              absolute left-1/2 top-1/2 z-60
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              px-12 py-4
              text-lg font-light tracking-wide text-white
              bg-white/5
              shadow-[0_0_40px_rgba(255,255,255,0.45)]
              animate-startFloat
              transition-all duration-700
              hover:scale-[1.08]
            "
          >
            ✦ Comenzar ✦
          </button>
        </>
      )}

      {/* TODO EL CONTENIDO - Solo se muestra después de presionar Comenzar */}
      {start && (
        <>
          {/* TÍTULO PRINCIPAL — APPLE VISION PRO STYLE */}
          <div className={`absolute left-1/2 top-20 z-40 -translate-x-1/2 transition-opacity duration-100 ${
            focusMode ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-fadeIn'
          }`}>
    <div className="text-center space-y-5 select-none">

      {/* CONTENEDOR CINEMÁTICO */}
      <div className="relative flex flex-col items-center">

        {/* NEBLINA / AURORA */}
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,_rgba(140,90,255,0.25),_transparent_70%)] blur-3xl opacity-70 animate-[pulseAurora_6s_ease-in-out_infinite]" />

        {/* TITULO */}
        <h1 className="
          relative text-transparent bg-clip-text
          bg-gradient-to-b from-white via-white/90 to-white/60
          font-['SF_Pro_Display'] tracking-tight font-semibold
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]
          animate-[titlePop_1.4s_ease-out]
        ">
          Daniela Coavas
        </h1>

        {/* LÍNEA ANIMADA SUBTIL */}
        <div className="
          mt-3 h-[2px] w-16 rounded-full 
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          animate-[lineGlow_3s_ease-in-out_infinite]
        " />

        {/* SUBTITULO */}
        <p className="
          mt-3 text-base sm:text-lg md:text-xl
          bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 text-transparent bg-clip-text
          animate-[fadeIn_1.6s_ease-out]
          font-light tracking-wide
        ">
          Full Stack Developer · Freelancer · Cloud Enthusiast
        </p>
      </div>

    </div>
  </div>


          {/* Overlay derecha en focus */}
          {focusMode && (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-black/40 backdrop-blur-xl" />
          )}

          {/* Botón para empezar recorrido en overview mode */}
          {!focusMode && overviewMode && (
            <button
              onClick={() => {
                setOverviewMode(false);
                setPlanetIndex(0);
              }}
              className="group absolute left-10 top-10 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-opacity duration-200 hover:scale-105 hover:border-white/40 hover:bg-black/60"
              aria-label="Empezar recorrido"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Empezar recorrido
            </button>
          )}

          {/* Botón para volver a vista amplia */}
          <button
            onClick={returnToOverview}
            className={`group absolute left-4 top-4 md:left-10 md:top-10 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-opacity duration-150 hover:scale-105 hover:border-white/40 hover:bg-black/60 ${
              focusMode || overviewMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Vista del universo"
          >
              <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">Vista del universo</span>
              <span className="sm:hidden">Universo</span>
            </button>

          {/* NAVEGACIÓN CON FLECHAS */}
          {!focusMode && !zoomMode && !overviewMode && (
            <>
              <div className="absolute bottom-4 md:bottom-10 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1))}
                  className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl md:text-2xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-black/60"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">‹</span>
                </button>

                <button
                  onClick={enterPlanet}
                  className="group flex items-center gap-2 md:gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 md:px-8 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-black/60"
                >
                  <div 
                    className="h-3 w-3 rounded-full animate-pulse transition-all duration-300 group-hover:scale-125" 
                    style={{ 
                      backgroundColor: planetIndex === 0 ? '#FFD700' : 
                                     planetIndex === 1 ? '#6A4FA3' : 
                                     planetIndex === 2 ? '#A18BCF' : 
                                     planetIndex === 3 ? '#4F3D7A' : 
                                     planetIndex === 4 ? '#B8A5D8' : 
                                     planetIndex === 5 ? '#E4C88A' : '#DCD6F7',
                      boxShadow: `0 0 15px ${planetIndex === 0 ? '#FFD700' : 
                                            planetIndex === 1 ? '#6A4FA3' : 
                                            planetIndex === 2 ? '#A18BCF' : 
                                            planetIndex === 3 ? '#4F3D7A' : 
                                            planetIndex === 4 ? '#B8A5D8' : 
                                            planetIndex === 5 ? '#E4C88A' : '#DCD6F7'}`
                    }} 
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm md:text-base font-semibold text-white group-hover:text-white/90">{planets[planetIndex].name}</span>
                    <span className="text-[10px] md:text-xs text-white/50"><span className="hidden sm:inline">{planetIndex + 1} de {planets.length} • </span>Click para explorar</span>
                  </div>
                  <svg className="h-4 w-4 md:h-5 md:w-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Flecha Derecha - al lado de la barra */}
                <button
                  onClick={() => setPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1))}
                  className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl md:text-2xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-black/60"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
                </button>
              </div>
            </>
          )}

          {/* PANEL DE INFORMACIÓN - MITAD DERECHA */}
          {focusMode && (
            <div className="absolute right-0 top-0 z-40 flex h-full w-full md:w-2/3 lg:w-1/2 flex-col animate-slideInRight">
              {/* Máscara de difuminado hacia el universo */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-transparent via-transparent to-transparent" style={{
                maskImage: 'linear-gradient(to right, transparent, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 100%)'
              }} />
              
              {/* Fondo del panel con difuminado suave */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-950/15 via-purple-950/10 to-black/15 backdrop-blur-xl" />
              
              {/* Gradiente de fondo sutil que se integra con el universo */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.06),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.06),_transparent_50%)]" />
              
              {/* Header con botón volver y nombre de sección */}
              <div className="absolute left-4 md:left-8 top-4 md:top-8 z-50 flex items-center gap-3">
                <button
                  onClick={exitPlanet}
                  className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/40 hover:bg-black/60"
                  aria-label="Volver"
                >
                  <svg className="h-3 w-3 md:h-4 md:w-4 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Nombre de la sección */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs md:text-sm font-medium text-white/90">{planets[planetIndex].name}</span>
                </div>
              </div>

              {/* Contenido con scroll */}
              <div className="relative flex h-full flex-col justify-start px-16 md:px-20 lg:px-24 py-20 md:py-24 animate-fadeInContent overflow-y-auto">
                <div className="pb-8">
                  {planets[planetIndex].content}
                </div>
              </div>
            </div>
          )}

          {/* CANVAS PRINCIPAL */}
          <Canvas camera={{ position: [0, 8, 50], fov: 55 }}>
            <CameraController
              start={start}
              overviewMode={overviewMode}
              focusMode={focusMode}
              zoomMode={zoomMode}
              planetIndex={planetIndex}
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
            <pointLight position={[0, 0, 0]} intensity={3.5} color="#FFF4E0" distance={60} decay={2} />
            <hemisphereLight args={["#ffffff", "#444444", 0.8]} />

            {/* Efectos de post-procesamiento REMOVIDOS para evitar borrosidad */}

            <OrbitingPlanets
              planets={planets}
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

