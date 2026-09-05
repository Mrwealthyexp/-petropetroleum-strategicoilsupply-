"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Earth } from "./earth";
import { Starfield } from "./starfield";

export function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 3, 5]} intensity={2} />
      <Starfield />
      <Earth />
      <OrbitControls enablePan={false} minDistance={3.5} maxDistance={10} />
    </Canvas>
  );
}
