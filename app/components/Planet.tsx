"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface PlanetProps {
  color: string;
  position: [number, number, number];
  size: number;
  onSelect?: () => void;
  isDimmed?: boolean;
  isFocused?: boolean;
}

export default function Planet({
  color,
  position,
  size,
  onSelect,
  isDimmed = false,
  isFocused = false,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const t = Math.random() * 100;

  useFrame((state) => {
    if (!planetRef.current || !groupRef.current) return;

    // Rotación constante y suave - más lenta y elegante
    const rotationSpeed = isFocused ? 0.008 : 0.002;
    planetRef.current.rotation.y += rotationSpeed;
    planetRef.current.rotation.x += rotationSpeed * 0.3;

    // Efecto de "respiración" - escala pulsante cuando está enfocado
    if (isFocused) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.8) * 0.015 + 0.75; // Reducido a 75% del tamaño original
      groupRef.current.scale.setScalar(breathe);
    } else {
      groupRef.current.scale.setScalar(1);
    }

    // Flotación SIEMPRE activa - más pronunciada cuando está enfocado
    if (isFocused) {
      // Movimiento complejo y orgánico cuando está enfocado - MÁS LENTO
      const time = state.clock.elapsedTime;
      planetRef.current.position.y =
        position[1] + 
        Math.sin(time * 0.3) * 0.15 + // Reducido de 0.6 a 0.3
        Math.cos(time * 0.2) * 0.1;   // Reducido de 0.4 a 0.2
      
      // Ligero balanceo en X y Z para más vida - MÁS LENTO
      planetRef.current.position.x = 
        position[0] + Math.sin(time * 0.15) * 0.08; // Reducido de 0.3 a 0.15
      planetRef.current.position.z = 
        position[2] + Math.cos(time * 0.18) * 0.08; // Reducido de 0.35 a 0.18
    } else {
      // Flotación sutil cuando no está enfocado - MÁS LENTA
      planetRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.4 + t) * 0.08; // Reducido de 0.8 a 0.4
    }

    // Efecto de glow pulsante cuando está enfocado - MÁS INTENSO
    if (isFocused && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.8) * 0.2 + 1.1;
      glowRef.current.scale.setScalar(pulse);
    }

    // Fade suave para planetas no enfocados
    if (atmosphereRef.current) {
      const targetOpacity = isDimmed ? 0.03 : 0.12;
      const material = atmosphereRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        targetOpacity,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={planetRef}
        castShadow
        receiveShadow
        onClick={() => onSelect && onSelect()}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[size, 128, 128]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.4}
          transparent
          opacity={isDimmed ? 0.15 : 1}
          emissive={color}
          emissiveIntensity={isFocused ? 0.3 : 0.1}
        />
      </mesh>

      {/* Atmósfera */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[size * 1.12, 64, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDimmed ? 0.03 : 0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Glow exterior cuando está enfocado */}
      {isFocused && (
        <mesh ref={glowRef} scale={1.3}>
          <sphereGeometry args={[size * 1.25, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Anillo orbital sutil - permanente */}
      {!isDimmed && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[size * 1.8, size * 1.85, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Anillo adicional cuando está enfocado */}
      {isFocused && (
        <>
          <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
            <ringGeometry args={[size * 2.2, size * 2.25, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[Math.PI / 1.8, -Math.PI / 5, 0]}>
            <ringGeometry args={[size * 1.5, size * 1.52, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* Luz del planeta */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isFocused ? 1.5 : isDimmed ? 0.1 : 0.5}
        color={color}
        distance={isFocused ? 15 : 8}
      />
    </group>
  );
}






