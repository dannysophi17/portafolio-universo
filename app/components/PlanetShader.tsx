'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createGlowMaterial, createRingMaterial } from './glowMaterial';

/**
 * Planeta con efectos visuales personalizados
 * Cada planeta tiene efectos diferentes según su color (anillos, partículas, etc)
 */

/** Tipo de superficie que dibuja el shader para cada planeta */
const SURFACE_TYPES: Record<string, number> = {
  rocky: 0,
  tech: 1,
  crystalline: 2,
  ringed: 3,
  communication: 4,
};

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
    () => createGlowMaterial(color, planetType === 'communication' ? 0.7 : 0.5, 3.5),
    [color, planetType],
  );
  const ringMaterial = useMemo(
    () => createRingMaterial(color, size * 1.35, size * 2.3),
    [color, size],
  );

  // Lunas: el gigante gaseoso tiene dos y el planeta océano una
  const moons = useMemo(
    () =>
      planetType === 'tech'
        ? [
            { size: 0.14, distance: 2.1, speed: 0.5, tilt: 0.25, color: '#b9b3c9' },
            { size: 0.09, distance: 2.8, speed: 0.32, tilt: -0.15, color: '#9d97a8' },
          ]
        : planetType === 'crystalline'
          ? [{ size: 0.18, distance: 2.4, speed: 0.4, tilt: 0.12, color: '#c9c9c4' }]
          : [],
    [planetType],
  );
  const moonRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Material con shaders para el aspecto del planeta
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        baseColor: { value: new THREE.Color(color) },
        lightDir: { value: new THREE.Vector3(1, 0.4, 0.6).normalize() },
        surfaceType: { value: SURFACE_TYPES[planetType] ?? 0 },
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
        uniform int surfaceType;

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

        float ridged(vec3 p) {
          return 1.0 - abs(noise(p) * 2.0 - 1.0);
        }

        void main() {
          // Coordenadas sobre la esfera unitaria: el relieve gira con el planeta
          vec3 p = normalize(vPosition);
          float lat = p.y;
          vec3 N = normalize(vWorldNormal);
          vec3 L = normalize(lightDir);
          vec3 V = normalize(vViewDir);
          vec3 finalColor;
          float oceanMask = 0.0;

          if (surfaceType == 1) {
            // Gigante gaseoso: bandas por latitud con turbulencia y una gran tormenta
            float turb = fbm(p * vec3(2.0, 7.0, 2.0) + vec3(time * 0.02, 0.0, 0.0)) * 0.35;
            float bands = sin((lat + turb) * 22.0) * 0.5 + 0.5;
            float fine = sin((lat + turb * 0.6) * 60.0) * 0.5 + 0.5;
            vec3 cream = mix(baseColor, vec3(0.95, 0.9, 1.0), 0.45);
            finalColor = mix(baseColor * 0.72, cream, bands * 0.75 + fine * 0.15);
            float storm = smoothstep(0.16, 0.0, length(vec2(atan(p.z, p.x) - 1.2, (lat + 0.32) * 2.4)));
            finalColor = mix(finalColor, baseColor * 0.55 + vec3(0.12, 0.04, 0.1), storm * 0.8);
          } else if (surfaceType == 2) {
            // Planeta océano: continentes, casquetes polares y nubes
            float landNoise = fbm(p * 2.6 + 3.1);
            float land = smoothstep(0.5, 0.54, landNoise);
            oceanMask = 1.0 - land;
            vec3 ocean = mix(baseColor * 0.45, baseColor * 0.75, fbm(p * 8.0));
            vec3 ground = mix(vec3(0.22, 0.32, 0.26), vec3(0.42, 0.45, 0.36), fbm(p * 10.0));
            finalColor = mix(ocean, ground, land);
            float ice = smoothstep(0.8, 0.88, abs(lat) + fbm(p * 6.0) * 0.08);
            finalColor = mix(finalColor, vec3(0.9, 0.95, 0.97), ice);
            oceanMask *= 1.0 - ice;
            float clouds = smoothstep(0.55, 0.78, fbm(p * 4.0 + vec3(time * 0.015, 0.0, time * 0.01)));
            finalColor = mix(finalColor, vec3(0.95), clouds * 0.75);
            oceanMask *= 1.0 - clouds;
          } else if (surfaceType == 3) {
            // Tipo Saturno: bandas suaves y cálidas
            float turb = fbm(p * vec3(1.5, 5.0, 1.5) + time * 0.01) * 0.25;
            float bands = sin((lat + turb) * 14.0) * 0.5 + 0.5;
            vec3 light = mix(baseColor, vec3(1.0, 0.92, 0.85), 0.35);
            finalColor = mix(baseColor * 0.78, light, bands);
          } else if (surfaceType == 4) {
            // Tipo Venus: nubes densas en remolino
            vec3 q = p * 2.2 + vec3(time * 0.03, 0.0, 0.0);
            vec3 warp = vec3(fbm(q), fbm(q + 5.2), fbm(q + 1.7));
            float swirl = fbm(q + warp * 1.8 + vec3(0.0, lat * 3.0, 0.0));
            finalColor = mix(baseColor * 0.7, mix(baseColor, vec3(1.0, 0.97, 0.88), 0.4), swirl);
          } else {
            // Rocoso: cordilleras, llanuras y cráteres
            float height = fbm(p * 3.0);
            float ridges = ridged(p * 7.0) * ridged(p * 13.0);
            float craters = smoothstep(0.72, 0.9, noise(p * 9.0)) - smoothstep(0.9, 0.98, noise(p * 9.0)) * 0.6;
            finalColor = mix(baseColor * 0.55, baseColor * 1.15, height);
            finalColor += baseColor * ridges * 0.18;
            finalColor *= 1.0 - craters * 0.35;
          }

          // Reflejo del sol en los océanos
          vec3 H = normalize(L + V);
          float spec = pow(max(dot(N, H), 0.0), 60.0) * oceanMask;
          finalColor += vec3(1.0, 0.95, 0.85) * spec * 0.6;

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
  }, [color, planetType]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    moons.forEach((moon, i) => {
      const mesh = moonRefs.current[i];
      if (!mesh) return;
      const a = t * moon.speed + i * 2.4;
      mesh.position.set(
        Math.cos(a) * size * moon.distance,
        Math.sin(a) * size * moon.distance * moon.tilt,
        Math.sin(a) * size * moon.distance,
      );
    });

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

        {/* Atmósfera - brillo en el borde que se mueve con el planeta */}
        {!isDimmed && (
          <mesh>
            <sphereGeometry args={[size * 1.07, 48, 48]} />
            <primitive attach="material" object={atmosphereMaterial} />
          </mesh>
        )}

        {/* Anillos con bandas de polvo y hielo para el planeta tipo Saturno */}
        {planetType === 'ringed' && (
          <mesh ref={ringsRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
            <ringGeometry args={[size * 1.35, size * 2.3, 128, 1]} />
            <primitive attach="material" object={ringMaterial} />
          </mesh>
        )}
      </group>

      {/* Lunas en órbita */}
      {!isDimmed &&
        moons.map((moon, i) => (
          <mesh key={i} ref={(el) => (moonRefs.current[i] = el)}>
            <sphereGeometry args={[size * moon.size, 24, 24]} />
            <meshStandardMaterial color={moon.color} roughness={1} metalness={0} />
          </mesh>
        ))}

      {/* Efectos especiales cuando está enfocado */}
      {isFocused && (
        <>
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
