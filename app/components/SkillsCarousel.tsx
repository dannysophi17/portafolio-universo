"use client";

import { useState, useEffect } from 'react';
import React from 'react';

interface Skill {
  name: string;
  level?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactElement;
  skills: Skill[];
  color: string;
  gridCols: string;
}

export default function SkillsCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying] = useState(false); // Siempre manual

  const categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'Angular' },
        { name: 'Bootstrap' },
        { name: 'SCSS' },
        { name: 'Figma' },
      ],
      color: 'slate',
      gridCols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'REST APIs' },
        { name: 'MongoDB' },
        { name: 'Python' },
        { name: 'Flask' },
      ],
      color: 'zinc',
      gridCols: 'grid-cols-2 sm:grid-cols-3'
    },
    {
      id: 'cloud',
      title: 'Nube y Herramientas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      skills: [
        { name: 'AWS IAM' },
        { name: 'AWS VPC' },
        { name: 'AWS EC2' },
        { name: 'AWS S3' },
        { name: 'CloudFormation' },
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Postman' },
        { name: 'SCRUM' },
      ],
      color: 'indigo',
      gridCols: 'grid-cols-2 sm:grid-cols-3'
    },
    {
      id: 'hardware',
      title: 'Hardware y Diseño',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      skills: [
        { name: 'Arduino' },
        { name: 'UI/UX' },
        { name: 'Responsive Design' },
        { name: 'LaTeX' },
      ],
      color: 'purple',
      gridCols: 'grid-cols-2 sm:grid-cols-4'
    },
    {
      id: 'languages',
      title: 'Idiomas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      skills: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'C1' },
        { name: 'Francés', level: 'A2' },
      ],
      color: 'teal',
      gridCols: 'grid-cols-1 sm:grid-cols-3'
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % categories.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length]);

  const currentCategory = categories[activeTab];

  return (
    <div className="relative h-full flex flex-col py-8 px-4 md:px-8">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(index)}
            className={`
              group relative flex items-center gap-2 px-4 py-2.5 rounded-xl
              transition-all duration-500 transform
              ${activeTab === index 
                ? `bg-${category.color}-800/70 border-${category.color}-600/80 scale-105 shadow-lg shadow-${category.color}-600/30` 
                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/50 hover:scale-105'
              }
              border backdrop-blur-sm
            `}
          >
            <div className={`transition-colors ${activeTab === index ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {category.icon}
            </div>
            <span className={`text-sm font-medium transition-colors hidden sm:inline ${activeTab === index ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {category.title}
            </span>
            
            {/* Active indicator */}
            {activeTab === index && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Skills Content with Animation */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          key={activeTab}
          className="w-full max-w-5xl animate-fadeIn"
        >
          {/* Category Title */}
          <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3 text-${currentCategory.color}-100`}>
            <div className={`w-12 h-12 rounded-xl bg-${currentCategory.color}-700/50 border border-${currentCategory.color}-600/60 flex items-center justify-center backdrop-blur-sm shadow-lg`}>
              {currentCategory.icon}
            </div>
            {currentCategory.title}
          </h3>

          {/* Skills Grid */}
          <div className={`grid ${currentCategory.gridCols} gap-4 md:gap-6`}>
            {currentCategory.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative animate-[slideUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-linear-to-r from-${currentCategory.color}-600 to-${currentCategory.color}-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-500`} />
                
                {/* Card */}
                <div className={`
                  relative h-24 md:h-28 rounded-xl 
                  bg-${currentCategory.color}-950/60 border border-${currentCategory.color}-900/70 
                  backdrop-blur-sm transition-all duration-500 
                  hover:scale-110 hover:border-${currentCategory.color}-800/80 
                  hover:shadow-2xl hover:shadow-${currentCategory.color}-600/30 
                  hover:-translate-y-3 
                  flex flex-col items-center justify-center p-3 md:p-4 
                  group-hover:bg-${currentCategory.color}-900/70
                `}>
                  {/* Inner glow */}
                  <div className={`absolute inset-0 bg-linear-to-t from-${currentCategory.color}-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  
                  {/* Text */}
                  <span className={`relative text-sm md:text-base font-bold text-${currentCategory.color}-200 text-center group-hover:text-white transition-colors z-10`}>
                    {skill.name}
                  </span>
                  {skill.level && (
                    <span className={`relative text-xs text-${currentCategory.color}-400 group-hover:text-${currentCategory.color}-300 transition-colors z-10 mt-1`}>
                      {skill.level}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex gap-2 justify-center mt-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            aria-label={`Ir a ${category.title}`}
            className={`
              h-1.5 rounded-full transition-all duration-500
              ${activeTab === index ? 'w-8 bg-white' : 'w-1.5 bg-slate-600 hover:bg-slate-400'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
