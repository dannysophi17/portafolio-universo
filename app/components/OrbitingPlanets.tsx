'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PlanetShader from './PlanetShader';
import Sun from './Sun';

/** Información de configuración de cada planeta */
interface PlanetInfo {
  name: string;
  color: string; // Color del planeta
  size: number; // Tamaño del planeta
  orbitRadius: number; // Distancia al centro
  orbitSpeed: number; // Velocidad de órbita
}

/** Propiedades del componente de planetas orbitantes */
interface OrbitingPlanetsProps {
  focusMode: boolean; // Si está en modo detalle
  zoomMode?: boolean; // Si está acercando al planeta
  planetIndex: number; // Planeta seleccionado actualmente
  onPlanetClick?: (index: number) => void;
  onPlanetPositionUpdate?: (position: [number, number, number]) => void;
}

export default function OrbitingPlanets({
  focusMode,
  zoomMode = false,
  planetIndex,
  onPlanetClick,
  onPlanetPositionUpdate,
}: OrbitingPlanetsProps) {
  // Referencias 3D
  const groupRef = useRef<THREE.Group>(null);
  const planetRefs = useRef<(THREE.Group | null)[]>([]); // Array de refs para cada planeta

  // Control de rotación orbital
  const rotationOffset = useRef(0); // Ángulo actual de rotación del sistema

  // Estado anterior para detectar transiciones
  const previousFocusMode = useRef(focusMode);
  const previousPlanetIndex = useRef(planetIndex);

  /** Configuración orbital de cada planeta (posición, tamaño, velocidad) */
  const orbitConfig: PlanetInfo[] = [
    { name: 'Sobre mí', color: '#FFD700', size: 3.2, orbitRadius: 0, orbitSpeed: 0 }, // Sol dorado
    { name: 'Trayectoria', color: '#6A4FA3', size: 1.6, orbitRadius: 10, orbitSpeed: 0.15 },
    { name: 'Habilidades', color: '#A18BCF', size: 1.7, orbitRadius: 15, orbitSpeed: 0.12 },
    { name: 'Proyectos', color: '#5D9A9A', size: 1.6, orbitRadius: 20, orbitSpeed: 0.1 }, // Teal suave
    { name: 'Certificaciones', color: '#D4A5A5', size: 1.4, orbitRadius: 25, orbitSpeed: 0.08 }, // Coral suave
    { name: 'Contacto', color: '#E4C88A', size: 1.4, orbitRadius: 30, orbitSpeed: 0.07 },
  ];

  // (getPlanetPosition removed - unused)

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!focusMode && !zoomMode) {
      // Rotación suave del sistema completo tipo carousel
      rotationOffset.current += delta * 0.08;
    }

    // Detectar transiciones de estado para optimizar animaciones
    const justEnteredFocus = !previousFocusMode.current && (focusMode || zoomMode);
    const justExitedFocus = previousFocusMode.current && !focusMode && !zoomMode;

    // Actualizar posiciones de cada planeta
    planetRefs.current.forEach((ref, i) => {
      if (!ref) return;

      const config = orbitConfig[i];
      const angle =
        rotationOffset.current * config.orbitSpeed + (i * Math.PI * 2) / (orbitConfig.length - 1);
      const changedPlanet = previousPlanetIndex.current !== planetIndex;

      if ((focusMode || zoomMode) && i === planetIndex) {
        // Planeta/Sol seleccionado - posicionar a la izquierda CON MOVIMIENTO
        const time = state.clock.elapsedTime;

        // Flotación suave y orgánica (movimiento en Y)
        const floatY = Math.sin(time * 0.6) * 0.8 + Math.cos(time * 0.4) * 0.3;

        // Balanceo sutil lateral (movimiento en X)
        const driftX = Math.sin(time * 0.3) * 0.4;

        // Rotación lenta en Z para efecto de balanceo
        const swayZ = Math.sin(time * 0.5) * 0.15;

        const targetX = -12 + driftX; // Más a la izquierda con drift
        const targetY = i === 0 ? 0 : floatY; // Sol sin flotación en Y
        const targetZ = swayZ; // Balanceo suave

        // Transición instantánea al entrar en focus para evitar movimiento brusco
        if (justEnteredFocus || changedPlanet) {
          ref.position.set(targetX, targetY, targetZ);
          const targetScale = i === 0 ? 2.2 : 2.8;
          ref.scale.set(targetScale, targetScale, targetScale);
        } else {
          // Interpolación suave solo cuando ya está en focus
          ref.position.x = THREE.MathUtils.lerp(ref.position.x, targetX, 0.05);
          ref.position.y = THREE.MathUtils.lerp(ref.position.y, targetY, 0.05);
          ref.position.z = THREE.MathUtils.lerp(ref.position.z, targetZ, 0.05);

          // Aumentar tamaño suavemente
          const targetScale = i === 0 ? 2.2 : 2.8;
          ref.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
        }

        // Rotación suave del planeta sobre sí mismo
        ref.rotation.y += delta * 0.3;
        ref.rotation.x = Math.sin(time * 0.2) * 0.1; // Balanceo en X
      } else if (i === 0) {
        // El sol volviendo al centro
        if (justExitedFocus) {
          // Transición rápida al salir
          ref.position.lerp(new THREE.Vector3(0, 0, 0), 0.2);
          ref.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
        } else {
          ref.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
          ref.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }
      } else {
        // Planetas en órbita normal
        const wasJustFocused = justExitedFocus && previousPlanetIndex.current === i;

        const x = Math.cos(angle) * config.orbitRadius;
        const z = Math.sin(angle) * config.orbitRadius;
        const y = Math.sin(angle * 2) * 0.5; // Ligera variación vertical

        // Transición más rápida al salir de focus
        const lerpFactor = wasJustFocused ? 0.25 : 0.05;

        ref.position.x = THREE.MathUtils.lerp(ref.position.x, x, lerpFactor);
        ref.position.y = THREE.MathUtils.lerp(ref.position.y, y, lerpFactor);
        ref.position.z = THREE.MathUtils.lerp(ref.position.z, z, lerpFactor);

        // Tamaño normal
        ref.scale.lerp(new THREE.Vector3(1, 1, 1), lerpFactor);
      }
    });

    // Reportar posición actual del planeta seleccionado
    if (onPlanetPositionUpdate && planetRefs.current[planetIndex]) {
      const pos = planetRefs.current[planetIndex]!.position;
      onPlanetPositionUpdate([pos.x, pos.y, pos.z]);
    }

    // Actualizar referencias de estado anterior
    previousFocusMode.current = focusMode;
    previousPlanetIndex.current = planetIndex;
  });

  return (
    <group ref={groupRef}>
      {/* Órbitas modernas con puntos luminosos */}
      {!focusMode &&
        !zoomMode &&
        orbitConfig.slice(1).map((config, i) => (
          <group key={`orbit-group-${i}`}>
            {/* Órbita principal más visible */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[config.orbitRadius - 0.015, config.orbitRadius + 0.015, 128]} />
              <meshBasicMaterial
                color={config.color}
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Glow sutil de órbita */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[config.orbitRadius - 0.08, config.orbitRadius + 0.08, 128]} />
              <meshBasicMaterial
                color={config.color}
                transparent
                opacity={0.08}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}

      {/* Sol en el centro */}
      <group
        ref={(el) => (planetRefs.current[0] = el)}
        position={[0, 0, 0]}
        visible={!((zoomMode || focusMode) && planetIndex !== 0)}
      >
        <Sun
          position={[0, 0, 0]}
          size={orbitConfig[0].size}
          isFocused={focusMode && planetIndex === 0}
          onSelect={() => onPlanetClick?.(0)}
        />
      </group>

      {/* Planetas orbitando */}
      {orbitConfig.slice(1).map((config, i) => {
        const actualIndex = i + 1;
        const angle = (actualIndex * Math.PI * 2) / (orbitConfig.length - 1);
        const x = Math.cos(angle) * config.orbitRadius;
        const z = Math.sin(angle) * config.orbitRadius;

        // Ocultar otros planetas cuando está en zoom o focus mode
        const shouldHide = (zoomMode || focusMode) && actualIndex !== planetIndex;

        return (
          <group
            key={`planet-${actualIndex}`}
            ref={(el) => (planetRefs.current[actualIndex] = el)}
            position={[x, 0, z]}
            visible={!shouldHide}
          >
            <PlanetShader
              color={config.color}
              position={[0, 0, 0]}
              size={config.size}
              isDimmed={false}
              isFocused={(zoomMode || focusMode) && actualIndex === planetIndex}
              onSelect={() => onPlanetClick?.(actualIndex)}
            />
          </group>
        );
      })}
    </group>
  );
}
