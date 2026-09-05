"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, type Mesh } from "three";

interface EarthProps {
  radius?: number;
  rotationSpeed?: number;
}

/** Rotating sphere representing Earth, with a soft atmosphere glow shell. */
export default function Earth({ radius = 2, rotationSpeed = 0.05 }: EarthProps) {
  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * rotationSpeed * 1.3;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="#1e5aa8" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Thin cloud/detail shell */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.01, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.08, 64, 64]} />
        <meshBasicMaterial
          color="#4fa8ff"
          transparent
          opacity={0.15}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
