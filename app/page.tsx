"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Vignette } from "@react-three/postprocessing";

import Planet from "./components/Planet";
import Sun from "./components/Sun";
import MiniPlanet from "./components/MiniPlanet";
import CameraController from "./components/CameraController";

type PlanetInfo = {
  name: string;
  planetPos: [number, number, number];
  cameraPos: [number, number, number];
  title: string;
  content: React.ReactNode;
  focusDepth: number; // para DOF
};

export default function Home() {
  const [start, setStart] = useState(false);
  const [planetIndex, setPlanetIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  // ----------------------------------------------------------
  // PLANETAS DEL SISTEMA (CON CONTENIDO + PROFUNDIDAD DE FOCO)
  // ----------------------------------------------------------
  const planets: PlanetInfo[] = [
    {
      name: "Sobre mí",
      planetPos: [0, 0, 0],
      cameraPos: [0, 0, 15],
      focusDepth: 0.018,
      title: "",
      content: (
        <div className="relative flex flex-col gap-6">

          {/* Nebulosa interna */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-10 -left-10 w-52 h-52 bg-purple-500/25 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-pink-500/20 blur-3xl rounded-full" />
          </div>

          {/* Avatar + nombre */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-300 opacity-60 blur-xl" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl border border-white/20">
                <span className="text-3xl">👩‍💻</span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-white">
                Daniela Coavas
              </h1>
              <p className="text-sm text-purple-100/90">
                Desarrolladora{" "}
                <span className="font-medium text-purple-200">
                  Full Stack Junior
                </span>
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Bio más humana */}
          <p className="text-sm leading-relaxed text-white/85">
            Me gusta construir experiencias digitales que se sientan vivas:
            interfaces cuidadas, animaciones suaves y soluciones que realmente
            le faciliten la vida a las personas. Estudio Ingeniería en la{" "}
            <span className="font-medium text-purple-200">Universidad EAN</span>{" "}
            y estoy certificada como{" "}
            <span className="font-medium text-yellow-200">
              AWS Cloud Practitioner
            </span>
            , combinando{" "}
            <span className="font-medium text-purple-100">
              desarrollo web
            </span>{" "}
            con <span className="font-medium text-purple-100">cloud</span>.
          </p>

          {/* Chips tipo timeline */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/4 px-4 py-3">
              <span className="mt-0.5 text-lg">🎓</span>
              <div>
                <p className="text-sm text-purple-100">
                  Graduada del Bootcamp Full Stack del{" "}
                  <span className="font-medium text-purple-200">
                    BIT Institute
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/4 px-4 py-3">
              <span className="mt-0.5 text-lg">🌟</span>
              <div>
                <p className="text-sm text-purple-100">
                  Liderazgo en{" "}
                  <span className="font-medium text-purple-200">
                    Women in Cloud
                  </span>{" "}
                  y core team del{" "}
                  <span className="font-medium text-purple-200">
                    AWS Cloud Club EAN
                  </span>
                  , impulsando comunidad y aprendizaje en la nube.
                </p>
              </div>
            </div>
          </div>

          {/* Áreas de interés */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Áreas de interés
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-purple-200/25 bg-purple-500/20 px-3 py-1 text-xs text-purple-100">
                ☁️ Cloud Architecture
              </span>
              <span className="rounded-full border border-emerald-200/25 bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100">
                🔧 Backend
              </span>
              <span className="rounded-full border border-pink-200/40 bg-pink-500/20 px-3 py-1 text-xs text-pink-100">
                🎨 UI / UX & Animaciones
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // ---------------- OTROS PLANETAS ----------------
    {
      name: "Educación",
      planetPos: [-6, 3, -1],
      cameraPos: [-6, 3, 8],
      focusDepth: 0.02,
      title: "Formación Académica",
      content: (
        <div className="space-y-5">
          <div className="border-l-2 border-white/18 pl-4">
            <h3 className="text-base font-light text-white">
              Ingeniería de Sistemas
            </h3>
            <p className="text-sm text-white/70">Universidad EAN</p>
            <p className="text-xs text-white/45">2023 — Actualidad</p>
          </div>
          <div className="border-l-2 border-white/18 pl-4">
            <h3 className="text-base font-light text-white">
              Bootcamp Full Stack
            </h3>
            <p className="text-sm text-white/70">BIT Institute</p>
            <p className="text-xs text-white/45">2024</p>
          </div>
        </div>
      ),
    },

    {
      name: "Full Stack",
      planetPos: [6, -2, -1],
      cameraPos: [6, -2, 8],
      focusDepth: 0.02,
      title: "Tecnologías",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-white/90">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-sky-300/20 bg-sky-500/15 px-3 py-1 text-xs text-sky-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-white/90">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Express", "MongoDB", "MySQL"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Cloud",
      planetPos: [0, 6, -1.5],
      cameraPos: [0, 6, 8],
      focusDepth: 0.02,
      title: "Cloud & DevOps",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/12 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">AWS</h3>
            <p className="text-xs text-white/70">
              Certified Cloud Practitioner
            </p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">Azure / AI</h3>
            <p className="text-xs text-white/70">Fundamentos de IA</p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">Docker</h3>
            <p className="text-xs text-white/70">Contenedores</p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">GitHub</h3>
            <p className="text-xs text-white/70">CI/CD & automatización</p>
          </div>
        </div>
      ),
    },

    {
      name: "Proyectos",
      planetPos: [0, -6, 1],
      cameraPos: [0, -6, 9],
      focusDepth: 0.021,
      title: "Proyectos Destacados",
      content: (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/12 bg-gradient-to-br from-purple-500/15 to-pink-500/10 p-4">
            <h3 className="text-sm font-semibold text-white">Tareas Arcade</h3>
            <p className="mt-1 text-xs text-white/75">
              Gestor de tareas con autenticación, estadísticas y una UI
              inspirada en videojuegos.
            </p>
          </div>
          <div className="rounded-xl border border-white/12 bg-gradient-to-br from-sky-500/15 to-cyan-500/10 p-4">
            <h3 className="text-sm font-semibold text-white">TechForge</h3>
            <p className="mt-1 text-xs text-white/75">
              Plataforma tipo e-commerce para servicios tecnológicos, con
              integración de pagos y flujos administrables.
            </p>
          </div>
        </div>
      ),
    },

    {
      name: "Certificaciones",
      planetPos: [-5, -3, -1],
      cameraPos: [-5, -3, 8],
      focusDepth: 0.02,
      title: "Certificaciones",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-500/20 text-xl">
              ☁️
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                AWS Cloud Practitioner
              </p>
              <p className="text-xs text-white/60">Amazon Web Services</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/20 text-xl">
              🤖
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Azure AI Fundamentals
              </p>
              <p className="text-xs text-white/60">Microsoft</p>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Contacto",
      planetPos: [5, 3, -1],
      cameraPos: [5, 3, 8],
      focusDepth: 0.02,
      title: "Conectemos",
      content: (
        <div className="space-y-5">
          <p className="text-sm text-white/85">
            Si quieres sumar a tu equipo a alguien que mezcla{" "}
            <span className="font-medium text-purple-200">
              backend, frontend y cloud
            </span>{" "}
            con buena energía y ganas de aprender, hablemos. 🚀
          </p>

          <div className="space-y-3">
            <a
              href="mailto:daniela.coavas.d@gmail.com"
              className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3 transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/25 text-lg group-hover:scale-110 transition">
                📧
              </div>
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-xs text-white/65">
                  daniela.coavas.d@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/daniela-coavas-desarrolladoraweb"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3 transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/25 text-lg group-hover:scale-110 transition">
                💼
              </div>
              <div>
                <p className="text-sm font-medium text-white">LinkedIn</p>
                <p className="text-xs text-white/65">daniela-coavas</p>
              </div>
            </a>

            <a
              href="https://github.com/dannysophi17"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3 transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/25 text-lg group-hover:scale-110 transition">
                💻
              </div>
              <div>
                <p className="text-sm font-medium text-white">GitHub</p>
                <p className="text-xs text-white/65">@dannysophi17</p>
              </div>
            </a>
          </div>
        </div>
      ),
    },
  ];

  const nextPlanet = () => {
    setFocusMode(false);
    setPlanetIndex((prev) => (prev + 1) % planets.length);
  };

  const prevPlanet = () => {
    setFocusMode(false);
    setPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
  };

  const enterPlanet = () => setFocusMode(true);

  // ----------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-[#050816] via-[#050818] to-[#02010a]">

      {/* Overlay solo en la mitad derecha para que el sol NO se vuelva borroso */}
      {focusMode && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-black/40 backdrop-blur-xl" />
      )}

      {/* BOTÓN COMENZAR */}
      {!start && (
        <button
          onClick={() => setStart(true)}
          className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-xl text-white shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
        >
          ✨ Comenzar ✨
        </button>
      )}

      {/* FLECHAS */}
      {start && !focusMode && (
        <>
          <button
            onClick={prevPlanet}
            className="absolute left-6 top-1/2 z-40 -translate-y-1/2 text-5xl text-white opacity-70 transition hover:scale-110 hover:opacity-100"
          >
            ‹
          </button>

          <button
            onClick={nextPlanet}
            className="absolute right-6 top-1/2 z-40 -translate-y-1/2 text-5xl text-white opacity-70 transition hover:scale-110 hover:opacity-100"
          >
            ›
          </button>
        </>
      )}

      {/* BOTÓN VER INFO FLOTANTE */}
      {start && !focusMode && (
        <button
          onClick={enterPlanet}
          className="absolute right-40 top-1/2 z-40 -translate-y-1/2 animate-[float_4s_ease-in-out_infinite] rounded-full bg-white/10 px-9 py-4 text-base font-light text-white shadow-[0_0_20px_rgba(255,255,255,0.18)] backdrop-blur-2xl transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_35px_rgba(255,255,255,0.45)]"
        >
          Ver info
        </button>
      )}

      {/* BOTÓN ATRÁS EN MODO FOCUS */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="absolute left-1/2 top-1/2 z-50 -translate-y-1/2 translate-x-[130px] rounded-full bg-white/10 px-5 py-2 text-xl text-white shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-white/20"
        >
          ‹
        </button>
      )}

      {/* PANEL DE INFORMACIÓN NEBULA */}
      {focusMode && (
        <div
          className="absolute right-12 top-1/2 z-40 flex h-[460px] w-[520px] -translate-y-1/2 flex-col overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-br from-[#0b0b1a]/92 via-[#060617]/95 to-[#050512]/98 shadow-[0_0_40px_rgba(140,90,255,0.35)] backdrop-blur-2xl animate-fadeIn"
        >
          {/* Glow externo */}
          <div className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.3),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.3),_transparent_55%)]" />

          {/* Partículas internas suaves */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-10 top-6 h-1 w-1 animate-[float_5s_ease-in-out_infinite] rounded-full bg-white/50" />
            <div className="absolute right-14 top-20 h-1 w-1 animate-[float_6s_ease-in-out_infinite] rounded-full bg-purple-200/80" />
            <div className="absolute bottom-10 left-1/3 h-1 w-1 animate-[float_7s_ease-in-out_infinite] rounded-full bg-pink-200/70" />
          </div>

          <div className="flex-1 overflow-y-auto px-10 py-9">
            {planets[planetIndex].content}
          </div>
        </div>
      )}

      {/* MENÚ VERTICAL MINI PLANETAS */}
      {start && !focusMode && (
        <div className="absolute left-24 top-1/2 z-40 -translate-y-1/2">
          <div className="rounded-3xl border border-white/20 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col items-center gap-5">
              {planets.map((p, i) => {
                const color =
                  i === 0
                    ? "#CFC1FF"
                    : i === 1
                    ? "#6A4FA3"
                    : i === 2
                    ? "#A18BCF"
                    : i === 3
                    ? "#4F3D7A"
                    : i === 4
                    ? "#B8A5D8"
                    : i === 5
                    ? "#E4C88A"
                    : "#DCD6F7";

                const isActive = i === planetIndex;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setFocusMode(false);
                      setPlanetIndex(i);
                    }}
                    className={`group relative transition ${
                      isActive
                        ? "scale-125"
                        : "scale-100 opacity-60 hover:scale-110 hover:opacity-100"
                    }`}
                  >
                    <div className="h-14 w-14">
                      <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
                        <ambientLight intensity={0.8} />
                        <MiniPlanet color={color} size={0.25} isActive={isActive} />
                      </Canvas>
                    </div>

                    {isActive && (
                      <div className="absolute -right-10 top-1/2 -translate-y-1/2">
                        <div className="h-0 w-0 border-b-4 border-t-4 border-b-transparent border-t-transparent border-l-8 border-l-white/80" />
                      </div>
                    )}

                    <div className="absolute left-20 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-lg">
                        {p.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CANVAS PRINCIPAL */}
      <Canvas camera={{ position: [0, 0, 25], fov: 50 }}>
        <CameraController
          start={start}
          cameraPos={planets[planetIndex].cameraPos}
          planetPos={planets[planetIndex].planetPos}
          focusMode={focusMode}
        />

        <OrbitControls enableZoom={false} />

        {/* Estrellas animadas */}
        <Stars radius={110} depth={90} count={6500} factor={4} fade speed={1} />

        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} />

        {/* POSTPROCESSING: enfoque al planeta actual */}
        {start && (
          <EffectComposer>
            <DepthOfField
              focusDistance={planets[planetIndex].focusDepth}
              focalLength={0.02}
              bokehScale={2.2}
              height={480}
            />
            <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
            <Vignette eskil={false} offset={0.15} darkness={0.6} />
          </EffectComposer>
        )}

        {/* PLANETAS */}
        {planets.map((p, i) => {
          const baseSize =
            i === 0
              ? 2.4
              : i === 1
              ? 1.3
              : i === 2
              ? 1.4
              : i === 3
              ? 1.2
              : i === 4
              ? 1.1
              : i === 5
              ? 1.1
              : 1.0;

          const isFocused = focusMode && i === planetIndex;
          const isDimmed = focusMode && i !== planetIndex;

          const pos: [number, number, number] = [
            isFocused ? -7 : p.planetPos[0],
            isFocused ? 0 : p.planetPos[1],
            p.planetPos[2],
          ];

          // Sol
          if (i === 0) {
            return (
              <Sun
                key={i}
                position={pos}
                size={isFocused ? baseSize * 2 : baseSize}
                isFocused={isFocused}
                isDimmed={isDimmed}
              />
            );
          }

          // Otros planetas
          return (
            <Planet
              key={i}
              color={
                i === 1
                  ? "#6A4FA3"
                  : i === 2
                  ? "#A18BCF"
                  : i === 3
                  ? "#4F3D7A"
                  : i === 4
                  ? "#B8A5D8"
                  : i === 5
                  ? "#E4C88A"
                  : "#DCD6F7"
              }
              position={pos}
              size={isFocused ? baseSize * 2 : baseSize}
              isDimmed={isDimmed}
              isFocused={isFocused}
            />
          );
        })}
      </Canvas>
    </div>
  );
}










