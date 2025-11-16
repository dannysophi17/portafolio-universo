"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

interface SunProps {
  position: [number, number, number];
  size: number;
  isFocused?: boolean;
  isDimmed?: boolean;
}

export default function Sun({
  position,
  size,
  isFocused = false,
  isDimmed = false,
}: SunProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // ----------------------------------------------------------
  // SHADER — Golden + White Core Glow
  // ----------------------------------------------------------
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
      },

      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;

        void main() {
          vNormal = normalize(normalMatrix * normal);

          vec4 world = modelMatrix * vec4(position, 1.0);
          vPos = world.xyz;

          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,

      fragmentShader: `
        uniform float time;

        varying vec3 vNormal;
        varying vec3 vPos;

        // ---------- NOISE ----------
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x*p.y*p.z*(p.x+p.y+p.z));
        }

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);

          f = f*f*(3.0-2.0*f);

          float n =
            mix(
              mix(
                mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
                f.y),
              mix(
                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
                f.y),
              f.z);

          return n;
        }

        float fbm(vec3 p) {
          float v = 0.0;
          float a = 0.55;

          for(int i=0;i<5;i++){
            v += a * noise(p);
            p *= 2.3;
            a *= 0.45;
          }
          return v;
        }

        void main() {
          float t = time * 0.3;

          // Ruido suave dorado
          float n1 = fbm(vNormal * 2.5 + t);
          float n2 = fbm(vNormal * 6.0 - t * 1.5);

          float mixVal = n1 * 0.6 + n2 * 0.4;

          // -------- COLORES --------
          vec3 deepGold = vec3(1.0, 0.72, 0.18);   // oro profundo
          vec3 softGold = vec3(1.0, 0.82, 0.42);   // dorado suave
          vec3 whiteCore = vec3(1.0, 0.97, 0.92);  // BLANCO cálido (centro)

          // brillo hacia el centro (muy blanco)
          float center = pow(n1, 2.0) * 1.0;

          // mezcla base
          vec3 col = mix(deepGold, softGold, mixVal);

          // integrar blanco del centro
          col = mix(col, whiteCore, center * 1.5);

          // pequeño boost de brillo
          col += center * 0.08;

          gl_FragColor = vec4(col, 1.0);
        }
      `,

      transparent: false,
    });
  }, []);

  // ----------------------------------------------------------
  // ANIMACIÓN
  // ----------------------------------------------------------
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current?.material instanceof THREE.ShaderMaterial) {
      coreRef.current.material.uniforms.time.value = t;
    }

    // Rotación muy suave
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }

    // Aura respirando
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03);
    }
  });

  return (
    <group position={position}>

      {/* AURA (más dorada ahora) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.22, 64, 64]} />
        <meshBasicMaterial
          color="#FFDB81"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* NÚCLEO */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[size, 128, 128]} />
        <primitive attach="material" object={shaderMaterial} />
      </mesh>

      {/* LUZ DORADA */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isFocused ? 9 : 6}
        distance={size * 15}
        color="#FFEEC5"
      />
    </group>
  );
}
