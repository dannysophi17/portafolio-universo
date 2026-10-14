/**
 * Fondo del universo: cielo con Vía Láctea y nebulosas, más estrellas de colores que titilan.
 * El grupo se desplaza levemente con el mouse para dar sensación de profundidad (parallax).
 */
'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParallaxBackgroundProps {
  mousePosition: { x: number; y: number }; // Coordenadas normalizadas del mouse (-0.5 a 0.5)
}

const STAR_COUNT = 6000;

// Colores reales de estrellas según su temperatura (azul caliente → rojo frío)
const STAR_COLORS = ['#9bb0ff', '#aabfff', '#cad7ff', '#f8f7ff', '#fff4ea', '#ffd2a1', '#ffcc6f'];
const STAR_WEIGHTS = [0.05, 0.1, 0.15, 0.3, 0.2, 0.12, 0.08];

function pickStarColor(random: () => number) {
  let r = random();
  for (let i = 0; i < STAR_COLORS.length; i++) {
    r -= STAR_WEIGHTS[i];
    if (r <= 0) return STAR_COLORS[i];
  }
  return STAR_COLORS[3];
}

// Plano de la galaxia (ligeramente inclinado para que la banda cruce el cielo en diagonal)
const GALAXY_NORMAL = new THREE.Vector3(0.35, 0.85, -0.4).normalize();

// Generador pseudoaleatorio con semilla: el cielo es siempre el mismo en cada visita
function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStarGeometry() {
  const random = createRandom(1717);
  const positions = new Float32Array(STAR_COUNT * 3);
  const colors = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  const phases = new Float32Array(STAR_COUNT);
  const color = new THREE.Color();
  const dir = new THREE.Vector3();

  for (let i = 0; i < STAR_COUNT; i++) {
    const u = random() * 2 - 1;
    const theta = random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    dir.set(s * Math.cos(theta), u, s * Math.sin(theta));
    // Más estrellas cerca del plano de la galaxia
    if (i % 3 === 0) {
      const along = dir.dot(GALAXY_NORMAL);
      dir.addScaledVector(GALAXY_NORMAL, -along * 0.85).normalize();
    }
    const radius = 120 + random() * 100;
    positions.set([dir.x * radius, dir.y * radius, dir.z * radius], i * 3);

    color.set(pickStarColor(random));
    colors.set([color.r, color.g, color.b], i * 3);

    // Pocas estrellas grandes y muchas pequeñas
    sizes[i] = 0.6 + Math.pow(random(), 6) * 3.2;
    phases[i] = random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
  return geometry;
}

export default function ParallaxBackground({ mousePosition }: ParallaxBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  const skyMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { galaxyNormal: { value: GALAXY_NORMAL } },
        vertexShader: `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 galaxyNormal;
          varying vec3 vDir;

          float hash(vec3 p) {
            p = fract(p * 0.3183099 + 0.1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }
          float noise(vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                           mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                       mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                           mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
          }
          float fbm(vec3 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p *= 2.03;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec3 d = normalize(vDir);

            // Banda de la Vía Láctea: brillante en el plano galáctico, con un núcleo más denso
            float h = dot(d, galaxyNormal);
            float band = exp(-pow(h / 0.16, 2.0));
            float core = exp(-pow(h / 0.07, 2.0));
            vec3 tangent = normalize(cross(galaxyNormal, vec3(0.0, 0.0, 1.0)));
            float centerBoost = 0.55 + 0.45 * smoothstep(-0.2, 1.0, dot(d, tangent));

            float clouds = fbm(d * 6.0);
            float detail = fbm(d * 18.0 + 3.0);
            // Polvo oscuro que corta la banda (como la Gran Grieta)
            float dust = smoothstep(0.45, 0.75, fbm(d * 9.0 + 11.0)) * core;

            vec3 milky = mix(vec3(0.55, 0.6, 0.85), vec3(1.0, 0.85, 0.7), core);
            float milkyAmount = band * (0.35 + 0.65 * clouds) * (0.6 + 0.4 * detail) * centerBoost;
            milkyAmount *= 1.0 - dust * 0.85;
            vec3 col = milky * milkyAmount * 0.32;

            // Nebulosas tenues de colores fuera de la banda
            float n1 = smoothstep(0.55, 0.85, fbm(d * 3.0 + 5.0));
            float n2 = smoothstep(0.58, 0.88, fbm(d * 3.5 - 7.0));
            col += vec3(0.45, 0.15, 0.55) * n1 * 0.16;
            col += vec3(0.1, 0.35, 0.5) * n2 * 0.14;

            // Base del espacio profundo (casi negro, con un toque azul)
            col += vec3(0.004, 0.006, 0.015);

            gl_FragColor = vec4(col, 1.0);
          }
        `,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  const starGeometry = useMemo(() => createStarGeometry(), []);

  const starMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: 1 },
        },
        vertexShader: `
          attribute float size;
          attribute float phase;
          attribute vec3 color;
          uniform float time;
          uniform float pixelRatio;
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            vColor = color;
            // Titileo: cada estrella con su propio ritmo
            vTwinkle = 0.65 + 0.35 * sin(time * (0.8 + fract(phase) * 2.2) + phase * 7.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            // Núcleo nítido con un halo suave alrededor
            float core = smoothstep(0.5, 0.0, d);
            float alpha = pow(core, 2.5);
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(vColor * vTwinkle, alpha * vTwinkle);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Movimiento parallax suave
      const targetX = mousePosition.x * 5;
      const targetY = mousePosition.y * 5;

      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      // Rotación muy lenta del cielo
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.004;
    }

    const material = starsRef.current?.material;
    if (material instanceof THREE.ShaderMaterial) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.pixelRatio.value = state.gl.getPixelRatio();
    }
  });

  return (
    <group ref={groupRef}>
      <mesh renderOrder={-2}>
        <sphereGeometry args={[400, 64, 32]} />
        <primitive attach="material" object={skyMaterial} />
      </mesh>
      <points ref={starsRef} geometry={starGeometry} renderOrder={-1}>
        <primitive attach="material" object={starMaterial} />
      </points>
    </group>
  );
}
