/**
 * Sol animado que representa la sección "Sobre mí"
 * Usa shaders personalizados para crear efecto de fuego
 * Se ilumina más cuando está enfocado
 */
'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createGlowMaterial } from './glowMaterial';

interface SunProps {
  position: [number, number, number]; // Posición en el espacio 3D
  size: number; // Tamaño del sol
  isFocused?: boolean; // Si está seleccionado (brilla más)
  onSelect?: () => void; // Función al hacer clic
}

export default function Sun({ position, size, isFocused = false, onSelect }: SunProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  // Material con shaders para crear el efecto de fuego del sol
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }, // Tiempo para animar
        brightness: { value: 1.0 }, // Brillo (aumenta al seleccionar)
      },

      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewNormal;
        varying vec3 vPos;

        void main() {
          vNormal = normal;
          vViewNormal = normalize(normalMatrix * normal);

          vec4 world = modelMatrix * vec4(position, 1.0);
          vPos = world.xyz;

          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,

      fragmentShader: `
        uniform float time;
        uniform float brightness;

        varying vec3 vNormal;
        varying vec3 vViewNormal;
        varying vec3 vPos;

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

          // Fractal Brownian Motion: ruido en capas para detalle orgánico de superficie
          for(int i=0;i<5;i++){
            v += a * noise(p);
            p *= 2.3;
            a *= 0.45;
          }
          return v;
        }

        void main() {
          float t = time * 0.3;

          float n1 = fbm(vNormal * 2.5 + t);
          float n2 = fbm(vNormal * 6.0 - t * 1.5);

          float mixVal = n1 * 0.6 + n2 * 0.4;

          vec3 deepGold = vec3(1.0, 0.72, 0.18);
          vec3 softGold = vec3(1.0, 0.82, 0.42);
          vec3 whiteCore = vec3(1.0, 0.97, 0.92);

          float center = pow(n1, 2.0) * 1.0;

          vec3 col = mix(deepGold, softGold, mixVal);
          col = mix(col, whiteCore, center * 1.5);
          col += center * 0.08;
          // Oscurecimiento del limbo: el borde del sol se ve más oscuro y cálido,
          // como en el sol real, lo que le da volumen
          float mu = clamp(dot(normalize(vViewNormal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
          float limb = pow(mu, 0.45);
          col = mix(col * vec3(1.0, 0.55, 0.25), col, limb);

          // El centro supera 1.0 para que el efecto de brillo (bloom) lo ilumine
          col *= brightness * (0.85 + 0.55 * limb);

          gl_FragColor = vec4(col, 1.0);
        }
      `,

      transparent: false,
    });
  }, []);

  // Corona: brillo aditivo que se desvanece hacia afuera (reemplaza el halo plano)
  const glowMaterial = useMemo(() => createGlowMaterial('#FFB347', 1.1, 2.2), []);
  const outerCoronaMaterial = useMemo(() => createGlowMaterial('#FF8C1A', 0.45, 1.6), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Actualizar uniform de tiempo del shader para textura de superficie animada
    if (coreRef.current?.material instanceof THREE.ShaderMaterial) {
      coreRef.current.material.uniforms.time.value = t;

      // Transición suave de brillo al enfocar/desenfocar
      const targetBrightness = isFocused ? 1.2 : 1.0;
      coreRef.current.material.uniforms.brightness.value +=
        (targetBrightness - coreRef.current.material.uniforms.brightness.value) * 0.02;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.03);
    }

    const targetGlow = isFocused ? 1.35 : 1.1;
    const glowMat = glowRef.current?.material;
    if (glowMat instanceof THREE.ShaderMaterial) {
      glowMat.uniforms.intensity.value += (targetGlow - glowMat.uniforms.intensity.value) * 0.03;
    }

    const targetIntensity1 = isFocused ? 9 : 8;

    if (light1Ref.current) {
      light1Ref.current.intensity += (targetIntensity1 - light1Ref.current.intensity) * 0.08;
    }

    if (light2Ref.current) {
      light2Ref.current.intensity += (2.5 - light2Ref.current.intensity) * 0.08;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={coreRef}
        onClick={() => onSelect?.()}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[size, 96, 96]} />
        <primitive attach="material" object={shaderMaterial} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.35, 64, 64]} />
        <primitive attach="material" object={glowMaterial} />
      </mesh>

      <mesh>
        <sphereGeometry args={[size * 2.1, 48, 48]} />
        <primitive attach="material" object={outerCoronaMaterial} />
      </mesh>

      <pointLight
        ref={light1Ref}
        position={[0, 0, 0]}
        intensity={5}
        distance={size * 14}
        color="#FFEEC5"
      />

      <pointLight
        ref={light2Ref}
        position={[0, 0, 0]}
        intensity={2}
        distance={size * 24}
        color="#FFA500"
      />
    </group>
  );
}
