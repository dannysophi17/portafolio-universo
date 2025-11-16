"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface PlanetProps {
  color: string;
  position: [number, number, number];
  size: number;
  onSelect?: () => void;
  isDimmed?: boolean;   // <- nuevo
  isFocused?: boolean;  // <- nuevo (para el que está seleccionado)
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
  const t = Math.random() * 100; // movimiento único aesthetic

  useFrame((state) => {
    if (!planetRef.current) return;

    // Rotación: todos giran, pero el enfocado un poco más rápido
    const baseSpeed = 0.003;
    const speed = isFocused ? baseSpeed * 3 : baseSpeed;

    planetRef.current.rotation.y += speed;
    planetRef.current.rotation.x += speed * 0.4;

    // Flotación aesthetic
    planetRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime + t) * 0.15;

    // Vibración horizontal leve
    planetRef.current.position.x =
      position[0] + Math.cos(state.clock.elapsedTime * 0.3 + t) * 0.1;
  });

  return (
    <mesh
      ref={planetRef}
      castShadow
      receiveShadow
      onClick={() => onSelect && onSelect()}
    >
      <sphereGeometry args={[size, 128, 128]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.3}
        transparent
        opacity={isDimmed ? 0.18 : 1}  // <- baja opacidad en los no enfocados
      />

      {/* Atmósfera suave */}
      <mesh>
        <sphereGeometry args={[size * 1.1, 64, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} />
      </mesh>
    </mesh>
  );
}






