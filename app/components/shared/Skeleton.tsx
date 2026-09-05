'use client';

import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded ${className}`}
      style={{
        backgroundSize: '1000px 100%',
        backgroundPosition: '0 0',
        animation: 'shimmer 2s infinite',
        ...style,
      }}
    />
  );
}
