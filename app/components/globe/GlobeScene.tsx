"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Earth } from "./Earth";
import { Starfield } from "./Starfield";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Skeleton } from "../shared/Skeleton";

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2.5} maxDistance={10} autoRotate={false} dampingFactor={0.05} rotateSpeed={0.5} zoomSpeed={0.8} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color={0x4a90d9} />
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 50]} />
      <Starfield count={3000} radius={40} />
      <Earth radius={2} rotationSpeed={0.05} />
    </>
  );
}

export function GlobeScene({ className, onLocationSelect: _onLocationSelect }: { className?: string; onLocationSelect?: (lat: number, lon: number, label: string) => void }) {
  return (
    <div className={`relative w-full h-full ${className || ""}`}>
      <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-gray-500"><div className="text-center"><p className="mb-4">3D Globe unavailable</p><p className="text-xs">WebGL may be disabled</p></div></div>}>
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><Skeleton className="w-32 h-32 rounded-full" /></div>}>
          <Canvas gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} dpr={[1, 2]} frameloop="always" style={{ background: "#050505" }}>
            <SceneContent />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
