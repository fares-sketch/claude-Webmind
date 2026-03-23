"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/10 animate-pulse rounded-lg text-white/20">
      Loading 3D Scene...
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-black/10 animate-pulse rounded-lg text-white/20">Loading 3D Scene...</div>}>
        <Spline scene={scene} style={{ width: '100%', height: '100%' }} />
      </Suspense>
    </div>
  );
}
