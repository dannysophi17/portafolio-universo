/**
 * Controla el movimiento de la cámara entre diferentes vistas
 * Maneja transiciones suaves al cambiar de modo o seleccionar planetas
 * Usa interpolación para movimientos fluidos
 */
'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  start: boolean; // Si ya se cerró la pantalla inicial
  overviewMode?: boolean; // Vista general mostrando todos los planetas
  focusMode: boolean; // Vista enfocada con panel de contenido
  zoomMode?: boolean; // Transición de acercamiento al planeta
  focusedPlanetPos?: [number, number, number]; // Posición del planeta enfocado
}

export default function CameraController({
  start,
  overviewMode = false,
  focusMode,
  zoomMode = false,
  focusedPlanetPos,
}: Props) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 8, 50));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const panAngle = useRef(0); // Ángulo para rotación suave en overview

  useFrame(() => {
    if (!start) return;

    if (overviewMode) {
      // Vista amplia del universo con movimiento circular suave alrededor del sistema
      const radius = 45;
      const height = 12;

      // Incrementar ángulo muy lentamente para rotación suave
      panAngle.current += 0.0005; // Velocidad muy lenta, completa rotación en ~200 segundos

      // Calcular posición de cámara en círculo
      const x = Math.sin(panAngle.current) * radius;
      const z = Math.cos(panAngle.current) * radius;

      targetPos.current.set(x, height, z);
      targetLookAt.current.set(0, 0, 0); // Siempre mirando al centro del sistema (sol)

      // Transición muy suave hacia la posición calculada
      camera.position.lerp(targetPos.current, 0.02);

      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(camera.position);
      currentLookAt.lerp(targetLookAt.current, 0.02);
      camera.lookAt(currentLookAt);
    } else if (!focusMode && !zoomMode) {
      // Modo navegación - cámara mira directamente al planeta seleccionado para vista clara
      if (focusedPlanetPos) {
        // Calcular ángulo del planeta desde el centro para colocación óptima de cámara
        const planetX = focusedPlanetPos[0];
        const planetZ = focusedPlanetPos[2];
        const distanceFromCenter = Math.sqrt(planetX * planetX + planetZ * planetZ);

        // Si es el Sol (en el centro), usar posición fija
        if (distanceFromCenter < 1) {
          targetPos.current.set(0, 5, 20);
          targetLookAt.current.set(0, 0, 0);
        } else {
          // Para planetas en órbita: cámara FRENTE al planeta
          const angle = Math.atan2(planetZ, planetX);
          const cameraDistance = 16;

          // Posicionar cámara en el lado opuesto del planeta (mirando hacia el centro)
          targetPos.current.set(
            focusedPlanetPos[0] + Math.cos(angle) * cameraDistance,
            focusedPlanetPos[1] + 3, // Ligeramente elevada
            focusedPlanetPos[2] + Math.sin(angle) * cameraDistance,
          );

          // Mirar directamente al planeta
          targetLookAt.current.set(...focusedPlanetPos);
        }
      } else {
        // Vista del sistema completo por defecto
        targetPos.current.set(0, 8, 50);
        targetLookAt.current.set(0, 0, 0);
      }

      // Smooth lerp - suave seguimiento
      camera.position.lerp(targetPos.current, 0.05);

      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(camera.position);
      currentLookAt.lerp(targetLookAt.current, 0.05);
      camera.lookAt(currentLookAt);
    } else if (zoomMode || focusMode) {
      // Modo ZOOM/FOCUS: planeta a la izquierda, panel a la derecha
      if (focusedPlanetPos) {
        // Calcular posición óptima basada en la posición del planeta
        const planetX = focusedPlanetPos[0];

        // Cámara más alejada para que los planetas se vean más pequeños
        targetPos.current.set(
          planetX - 2.5, // Más centrado a la izquierda
          focusedPlanetPos[1], // Mismo nivel vertical
          focusedPlanetPos[2] + 15, // MÁS alejado hacia el espectador
        );

        targetLookAt.current.set(...focusedPlanetPos);

        // Transición suave y delicada
        camera.position.lerp(targetPos.current, 0.04); // Más lento y suave

        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        currentLookAt.multiplyScalar(10).add(camera.position);
        currentLookAt.lerp(targetLookAt.current, 0.04); // Más lento y suave
        camera.lookAt(currentLookAt);
      }
    }
  });

  return null;
}
