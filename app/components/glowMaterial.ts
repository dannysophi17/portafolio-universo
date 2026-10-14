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
