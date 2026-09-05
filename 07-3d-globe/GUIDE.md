# 07 — 3D GLOBE
## Three.js + React Three Fiber Integration

---

## INSTALL

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

---

## FILES

```
app/components/globe/
├── textureLoader.ts      # NASA textures + procedural fallback
├── Earth.tsx             # Main sphere with atmosphere
├── SupplyRouteArcs.tsx   # Animated route lines
├── Markers.tsx           # Clickable facility markers
├── Starfield.tsx         # Background particles
└── GlobeScene.tsx        # Main Canvas + controls
```

---

## CRITICAL: NEXT.JS CONFIG

```javascript
// next.config.js
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: false,  // Required for R3F
  images: { unoptimized: true },
}
```

---

## USAGE

```tsx
import { GlobeScene } from '@/app/components/globe/GlobeScene';

// In page:
<GlobeScene onLocationSelect={(lat, lon, label) => console.log(lat, lon, label)} />
```

---

## NEXT STEP
Go to `08-web3-integration/` → Add wallet connect
