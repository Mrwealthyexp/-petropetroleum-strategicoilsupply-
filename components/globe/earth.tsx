"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_TEXTURES, loadTexture } from "./textureLoader";

export function Earth({ radius = 2, rotationSpeed = 0.05 }) {
  const groupRef = useRef<THREE.Group>(null);
  const dayTexture = useMemo(() => loadTexture(EARTH_TEXTURES.day), []);
  const material = useMemo(() => new THREE.MeshPhongMaterial({ map: dayTexture, specular: new THREE.Color(0x333333), shininess: 5 }), [dayTexture]);
  const geometry = useMemo(() => new THREE.SphereGeometry(radius, 64, 64), [radius]);
  useFrame((_, delta) => { if (groupRef.current) groupRef.current.rotation.y += delta * rotationSpeed; });
  return <group ref={groupRef}><mesh geometry={geometry} material={material} /><mesh><sphereGeometry args={[radius * 1.05, 64, 64]} /><meshBasicMaterial color={0x4a90d9} transparent opacity={0.1} side={THREE.BackSide} blending={THREE.AdditiveBlending} /></mesh></group>;
}
