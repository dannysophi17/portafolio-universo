"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  start: boolean;
  overviewMode?: boolean;
  focusMode: boolean;
  zoomMode?: boolean;
  planetIndex: number;
  focusedPlanetPos?: [number, number, number];
}

export default function CameraController({
  start,
  overviewMode = false,
  focusMode,
  zoomMode = false,
  planetIndex,
  focusedPlanetPos,
}: Props) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 8, 50));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!start) return;

    if (overviewMode) {
      // Vista del universo completo - más cercana
      targetPos.current.set(0, 12, 45); // Más cerca que antes
      targetLookAt.current.set(0, 0, 0); // Mirando al centro del sistema
      
      // Transición muy suave hacia la vista amplia
      camera.position.lerp(targetPos.current, 0.02);
      
      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(camera.position);
      currentLookAt.lerp(targetLookAt.current, 0.02);
      camera.lookAt(currentLookAt);
    } else if (!focusMode && !zoomMode) {
      // Vista general - ENFOQUE DIRECTO AL PLANETA seleccionado
      if (focusedPlanetPos) {
        // Calcular el ángulo del planeta respecto al centro para posicionar cámara de frente
        const planetX = focusedPlanetPos[0];
        const planetZ = focusedPlanetPos[2];
        const distanceFromCenter = Math.sqrt(planetX * planetX + planetZ * planetZ);
        
        // Si es el Sol (en el centro), usar posición fija
        if (distanceFromCenter < 1) {
          targetPos.current.set(0, 5, 20);
          targetLookAt.current.set(0, 0, 0);
        } else {
          // Para planetas orbitando: cámara FRENTE al planeta
          // Calculamos el ángulo del planeta y nos posicionamos en la dirección opuesta
          const angle = Math.atan2(planetZ, planetX);
          const cameraDistance = 16; // Distancia de la cámara al planeta
          
          // Posicionar cámara en el lado opuesto del planeta (mirando hacia el centro)
          targetPos.current.set(
            focusedPlanetPos[0] + Math.cos(angle) * cameraDistance,
            focusedPlanetPos[1] + 3, // Ligeramente elevada
            focusedPlanetPos[2] + Math.sin(angle) * cameraDistance
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
        const planetZ = focusedPlanetPos[2];
        
        // Cámara más alejada para que los planetas se vean más pequeños
        targetPos.current.set(
          planetX - 2.5,            // Más centrado a la izquierda
          focusedPlanetPos[1],      // Mismo nivel vertical
          focusedPlanetPos[2] + 15  // MÁS alejado hacia el espectador
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





