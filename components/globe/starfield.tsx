"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Starfield({ count = 2000, radius = 50 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, [count, radius]);
  useFrame((state) => { if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005; });
  return <points ref={pointsRef} geometry={geometry}><pointsMaterial size={0.15} color="#dceeff" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} /></points>;
}
