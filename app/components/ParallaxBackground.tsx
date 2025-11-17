/**
 * Campo de estrellas con parallax que responde al movimiento del mouse para percepción de profundidad.
 * Mejora la conciencia espacial creando separación de capas de fondo.
 */
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface ParallaxBackgroundProps {
  mousePosition: { x: number; y: number }; // Coordenadas normalizadas del mouse (-0.5 a 0.5)
}

export default function ParallaxBackground({ mousePosition }: ParallaxBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Movimiento parallax suave - aumentado para más efecto
      const targetX = mousePosition.x * 5;
      const targetY = mousePosition.y * 5;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}
