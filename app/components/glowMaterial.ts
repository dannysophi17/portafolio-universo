import * as THREE from 'three';

/**
 * Material de brillo atmosférico (fresnel) con mezcla aditiva.
 * Se dibuja en una esfera un poco más grande que el planeta y solo brilla
 * en el borde, como una atmósfera real vista desde el espacio.
 */
export function createGlowMaterial(color: string, intensity = 1, power = 3) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      power: { value: power },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float intensity;
      uniform float power;

      varying vec3 vNormal;
      varying vec3 vViewDir;

      void main() {
        // BackSide: la normal apunta hacia adentro, así que el borde es donde la normal
        // es perpendicular a la vista y el centro se desvanece
        float facing = abs(dot(vNormal, vViewDir));
        float glow = pow(facing, power) * intensity;
        gl_FragColor = vec4(glowColor * glow, glow);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

/**
 * Material para anillos planetarios: bandas concéntricas de polvo y hielo con
 * huecos (como la división de Cassini) y transparencia variable.
 */
export function createRingMaterial(color: string, innerRadius: number, outerRadius: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ringColor: { value: new THREE.Color(color) },
      innerRadius: { value: innerRadius },
      outerRadius: { value: outerRadius },
    },
    vertexShader: `
      varying vec3 vLocal;

      void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 ringColor;
      uniform float innerRadius;
      uniform float outerRadius;

      varying vec3 vLocal;

      float hash(float n) { return fract(sin(n) * 43758.5453); }
      float noise1(float x) {
        float i = floor(x);
        float f = fract(x);
        return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
      }

      void main() {
        float r = (length(vLocal.xy) - innerRadius) / (outerRadius - innerRadius);
        if (r < 0.0 || r > 1.0) discard;

        // Bandas finas y gruesas
        float bands = noise1(r * 60.0) * 0.6 + noise1(r * 180.0) * 0.4;
        // Hueco principal y borde exterior que se desvanece
        float gap = smoothstep(0.58, 0.6, r) * (1.0 - smoothstep(0.64, 0.66, r));
        float edge = smoothstep(0.0, 0.06, r) * (1.0 - smoothstep(0.9, 1.0, r));
        float alpha = (0.25 + bands * 0.55) * edge * (1.0 - gap * 0.9);

        vec3 col = mix(ringColor * 0.7, mix(ringColor, vec3(1.0, 0.95, 0.88), 0.35), bands);
        gl_FragColor = vec4(col, alpha * 0.85);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
}
