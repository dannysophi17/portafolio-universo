"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  start: boolean;
  cameraPos: [number, number, number];
  planetPos: [number, number, number];
  focusMode: boolean;
}

export default function CameraController({
  start,
  cameraPos,
  planetPos,
  focusMode,
}: Props) {
  const { camera } = useThree();

  useFrame(() => {
    if (!start) return;

    if (!focusMode) {
      // modo normal: vista general del sistema solar
      const target = new THREE.Vector3(...cameraPos);
      camera.position.lerp(target, 0.04);
    } else {
      // modo FOCUS: mostrar planeta completo y dejar espacio al lado
      const sidePos = new THREE.Vector3(
        planetPos[0] - 4, // planeta a la izquierda
        planetPos[1],
        12 // distancia ideal para ver el planeta completo
      );
      camera.position.lerp(sidePos, 0.04);
    }

    // siempre mirar al planeta
    const lookTarget = new THREE.Vector3(...planetPos);
    camera.lookAt(lookTarget);
  });

  return null;
}





