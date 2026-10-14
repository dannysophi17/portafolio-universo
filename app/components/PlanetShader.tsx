'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createGlowMaterial } from './glowMaterial';

/**
 * Planeta con efectos visuales personalizados
 * Cada planeta tiene efectos diferentes según su color (anillos, partículas, etc)
 */

interface PlanetShaderProps {
  color: string; // Color del planeta
  position: [number, number, number]; // Posición en el espacio
  size: number; // Tamaño del planeta
  onSelect?: () => void; // Función al hacer clic
  isDimmed?: boolean; // Si está atenuado
  isFocused?: boolean; // Si está seleccionado
}

export default function PlanetShader({
  color,
  position,
  size,
  onSelect,
  isDimmed = false,
  isFocused = false,
}: PlanetShaderProps) {
  const planetRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const worldPos = useRef(new THREE.Vector3());
  const lightTarget = useRef(new THREE.Vector3());

  /** Determina el tipo de planeta según su color para aplicar efectos visuales */
  const planetType = useMemo(() => {
    if (color === '#FFD700') return 'sun'; // Sol
    if (color === '#6A4FA3') return 'rocky'; // Trayectoria
    if (color === '#A18BCF') return 'tech'; // Habilidades
    if (color === '#5D9A9A') return 'crystalline'; // Proyectos
    if (color === '#D4A5A5') return 'ringed'; // Certificaciones
    if (color === '#E4C88A') return 'communication'; // Contacto
    if (color === '#DCD6F7') return 'ice'; // Otros
    return 'default';
  }, [color]);

  const atmosphereMaterial = useMemo(
    () => createGlowMaterial(color, planetType === 'communication' ? 1.3 : 1, 2.5),
    [color, planetType],
  );
  const focusGlowMaterial = useMemo(() => createGlowMaterial(color, 0.55, 4), [color]);

  // Material con shaders para el aspecto del planeta
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        baseColor: { value: new THREE.Color(color) },
        lightDir: { value: new THREE.Vector3(1, 0.4, 0.6).normalize() },
      },

      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          vUv = uv;
          vPosition = position;

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,

      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 lightDir;

        varying vec3 vNormal;
        varying vec3 vWorldNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;
        varying vec3 vPosition;

        // Noise function
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);

          return mix(
            mix(
              mix(hash(i), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
              f.y),
            mix(
              mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
              f.y),
            f.z);
        }

        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          
          for(int i = 0; i < 4; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          // Movimiento de textura
          vec3 coords = vPosition * 2.0 + time * 0.1;
          
          // Generar patrones de superficie
          float pattern = fbm(coords);
          float pattern2 = fbm(coords * 1.5 + time * 0.05);
          
          // Mezclar patrones
          float mixedPattern = mix(pattern, pattern2, 0.5);
          
          // Colores base
          vec3 darkColor = baseColor * 0.6;
          vec3 lightColor = baseColor * 1.3;
          
          // Aplicar patrón
          vec3 finalColor = mix(darkColor, lightColor, mixedPattern);
          
          // Brillo adicional
          finalColor += vec3(mixedPattern * 0.1);

          // Luz del sol: lado de día iluminado y lado de noche en penumbra,
          // con una transición suave (terminador) como en un planeta real
          float sunAmount = dot(normalize(vWorldNormal), normalize(lightDir));
          float daylight = smoothstep(-0.25, 0.55, sunAmount);
          vec3 dayColor = finalColor * 1.08;
          vec3 nightColor = finalColor * 0.12 + baseColor * 0.03;
          // Luz de relleno suave desde la cámara para que el lado oscuro conserve forma
          float fill = 0.35 * pow(max(dot(normalize(vWorldNormal), normalize(vViewDir)), 0.0), 1.5);
          finalColor = mix(nightColor, dayColor, daylight) + dayColor * fill * (1.0 - daylight);

          // Atmósfera en el borde, más intensa del lado iluminado
          float rim = pow(1.0 - max(dot(normalize(vWorldNormal), normalize(vViewDir)), 0.0), 3.0);
          finalColor += baseColor * rim * (0.15 + 0.65 * smoothstep(-0.3, 0.6, sunAmount));

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,

      transparent: false,
    });
  }, [color]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (planetRef.current) {
      // Actualizar shader material del primer mesh hijo
      const planetMesh = planetRef.current.children[0] as THREE.Mesh;
      if (planetMesh?.material instanceof THREE.ShaderMaterial) {
        planetMesh.material.uniforms.time.value = t;

        // El sol está en el centro del sistema; en vista de detalle (sin sol visible)
        // se usa una luz fija desde la derecha para resaltar el relieve
        if (isFocused) {
          lightTarget.current.set(1, 0.35, 0.8);
        } else {
          planetRef.current.getWorldPosition(worldPos.current);
          lightTarget.current.copy(worldPos.current).negate();
        }
        if (lightTarget.current.lengthSq() > 0.0001) {
          lightTarget.current.normalize();
          planetMesh.material.uniforms.lightDir.value.lerp(lightTarget.current, 0.08).normalize();
        }
      }

      // Rotación con velocidades diferentes según tipo
      const rotationSpeed =
        planetType === 'crystalline'
          ? 0.4
          : planetType === 'communication'
            ? 0.3
            : planetType === 'tech'
              ? 0.35
              : 0.15;
      planetRef.current.rotation.y = t * (isFocused ? rotationSpeed * 2 : rotationSpeed);
      planetRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;

      // Flotación más pronunciada
      if (!isFocused) {
        const floatIntensity =
          planetType === 'communication' ? 0.55 : planetType === 'crystalline' ? 0.45 : 0.35;
        planetRef.current.position.y =
          Math.sin(t * 0.6) * floatIntensity + Math.cos(t * 0.4) * 0.15;
      }
    }

    // Rotate rings when the current planet supports them.
    if (planetType === 'ringed' && ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.1;
    }

    // Glow pulsante
    if (isFocused && glowRef.current) {
      const pulse = Math.sin(t * 1.2) * 0.04 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <group ref={planetRef}>
        {/* Planeta con shader */}
        <mesh
          castShadow
          receiveShadow
          onClick={() => onSelect?.()}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[size, 64, 64]} />
          <primitive attach="material" object={shaderMaterial} />
        </mesh>

        {/* Textura de cuadrícula para planeta crystalline (Proyectos) */}
        {planetType === 'crystalline' && !isDimmed && (
          <mesh>
            <sphereGeometry args={[size * 1.08, 48, 48]} />
            <meshBasicMaterial color="#5D9A9A" transparent opacity={0.25} wireframe={true} />
          </mesh>
        )}

        {/* Partículas orbitales para planeta tecnológico (Habilidades) */}
        {planetType === 'tech' && !isDimmed && (
          <points>
            <sphereGeometry args={[size * 1.5, 32, 32]} />
            <pointsMaterial size={0.05} color={color} transparent opacity={0.6} sizeAttenuation />
          </points>
        )}

        {/* Atmósfera - brillo en el borde que se mueve con el planeta */}
        {!isDimmed && (
          <mesh>
            <sphereGeometry args={[size * 1.18, 48, 48]} />
            <primitive attach="material" object={atmosphereMaterial} />
          </mesh>
        )}

        {/* Anillos para planeta tipo 'ringed' */}
        {planetType === 'ringed' && (
          <mesh ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 1.8, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={isDimmed ? 0.1 : 0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Anillos brillantes para planeta crystalline (Proyectos) */}
        {planetType === 'crystalline' && (
          <>
            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[size * 1.5, size * 1.9, 80]} />
              <meshBasicMaterial
                color="#5D9A9A"
                transparent
                opacity={isDimmed ? 0.15 : 0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2.3, Math.PI / 4, 0]}>
              <ringGeometry args={[size * 1.7, size * 1.85, 80]} />
              <meshBasicMaterial
                color="#7DB5B5"
                transparent
                opacity={isDimmed ? 0.1 : 0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Efectos especiales cuando está enfocado */}
      {isFocused && (
        <>
          {/* Halo suave alrededor del planeta enfocado */}
          <mesh ref={glowRef}>
            <sphereGeometry args={[size * 1.6, 48, 48]} />
            <primitive attach="material" object={focusGlowMaterial} />
          </mesh>

          {/* Partículas brillantes flotantes */}
          {planetType === 'sun' && (
            <points>
              <sphereGeometry args={[size * 2.5, 64, 64]} />
              <pointsMaterial
                size={0.08}
                color="#FFD700"
                transparent
                opacity={0.8}
                sizeAttenuation
              />
            </points>
          )}
        </>
      )}

      {/* Luz del planeta con intensidad variable */}
      <pointLight
        position={[0, 0, 0]}
        intensity={
          planetType === 'sun'
            ? 2.5
            : planetType === 'crystalline'
              ? 2.0
              : planetType === 'communication'
                ? 1.2
                : isFocused
                  ? 1.5
                  : isDimmed
                    ? 0.1
                    : 0.8
        }
        color={color}
        distance={
          planetType === 'sun' ? 25 : planetType === 'communication' ? 15 : isFocused ? 15 : 10
        }
      />
    </group>
  );
}
