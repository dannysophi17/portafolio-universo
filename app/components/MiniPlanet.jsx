import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MiniPlanet({ color = "#8B7FC7", size = 0.25, isActive = false }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave del planeta
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;

      // Animación de flotación sutil
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }

    if (glowRef.current && isActive) {
      // Pulso del glow cuando está activo
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Planeta principal */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </mesh>

      {/* Glow/Brillo exterior */}
      {isActive && (
        <mesh ref={glowRef} scale={1.2}>
          <sphereGeometry args={[size * 1.3, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Luz puntual para iluminar */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isActive ? 0.8 : 0.3}
        color={color}
        distance={1}
      />
    </group>
  );
}
