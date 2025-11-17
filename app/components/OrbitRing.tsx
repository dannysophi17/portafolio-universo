"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface OrbitRingProps {
  planets: any[];
  planetIndex: number;
  setPlanetIndex: (i: number) => void;
  focusMode: boolean;
}

export default function OrbitRing({
  planets,
  planetIndex,
  setPlanetIndex,
  focusMode,
}: OrbitRingProps) {
  const ringRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0 });

  // Mover el anillo con el mouse
  const handleMouseMove = (e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
  };

  if (typeof window !== "undefined") {
    window.onmousemove = handleMouseMove;
  }

  useFrame((state) => {
    if (!ringRef.current) return;

    // Animación de giro suave (modo Apple)
    ringRef.current.rotation.y += 0.002;

    // Movimiento con el mouse (suavizado)
    ringRef.current.rotation.y += mouse.current.x * 0.02;
  });

  const radius = 13;

  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      {planets.map((p, i) => {
        const angle = (i / planets.length) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const isActive = i === planetIndex;
        const scale = isActive ? 1.5 : 1;

        return (
          <group
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI, 0]}
            onClick={() => {
              if (!focusMode) setPlanetIndex(i);
            }}
          >
            <group scale={[scale, scale, scale]}>
              {p.isSun ? (
                <p.component
                  size={p.size}
                  position={[0, 0, 0]}
                  isFocused={false}
                />
              ) : (
                <p.component
                  color={p.color}
                  size={p.size}
                  position={[0, 0, 0]}
                  isFocused={false}
                />
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
}

