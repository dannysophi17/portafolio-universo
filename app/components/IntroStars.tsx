/**
 * Campo de estrellas cinemático mostrado en la pantalla de entrada inicial antes de que el usuario haga clic en "Comenzar".
 * Incluye parallax suave con el mouse y animación de pulso respiratorio para efecto inmersivo.
 */
'use client';

import * as THREE from 'three';
import { Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function CinematicSpace() {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame(({ mouse, clock }) => {
    if (!group.current) return;

    time.current = clock.elapsedTime;

    // Parallax ultra suave (no brusco)
    const smoothFactor = 0.045;
    group.current.rotation.y += (mouse.x * 0.15 - group.current.rotation.y) * smoothFactor;
    group.current.rotation.x += (mouse.y * 0.1 - group.current.rotation.x) * smoothFactor;

    // Movimiento interno del universo (respiración)
    const pulse = Math.sin(time.current * 0.35) * 0.02;
    group.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
  });

  return (
    <group ref={group}>
      <Stars radius={150} depth={80} count={8500} factor={3.8} saturation={0.4} fade speed={0.4} />
    </group>
  );
}

export default function IntroStars() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
      <ambientLight intensity={1} />
      <CinematicSpace />
    </Canvas>
  );
}
