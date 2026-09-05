"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { CanvasSkeleton } from "@/components/ui/Skeleton";
import Earth from "./Earth";
import Starfield from "./Starfield";

interface GlobeSceneProps {
  className?: string;
}

/** 3D canvas hosting the rotating Earth, starfield, and orbit controls. */
export default function GlobeScene({ className }: GlobeSceneProps) {
  return (
    <ErrorBoundary label="3D Globe">
      <div className={className ?? "h-[520px] w-full"}>
        <Suspense fallback={<CanvasSkeleton />}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 3, 5]} intensity={1.2} />
            <Starfield />
            <Earth />
            <OrbitControls
              enablePan={false}
              minDistance={3.5}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.4}
            />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
